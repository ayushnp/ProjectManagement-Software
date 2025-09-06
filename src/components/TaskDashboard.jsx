import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Plus, Menu, MoreHorizontal, Users, Calendar, X, Home, FolderOpen, User 
} from 'lucide-react';

export default function TaskDashboard() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    status: 'Planning',
    priority: 'Medium',
    due_date: '',
    progress: 0
  });
  const [editTask, setEditTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [currentUser] = useState({
    id: 1,
    name: 'John Doe',
    role: 'admin'
  });

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/tasks');
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
        alert('Error fetching tasks: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Handle input changes for new task
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Create new task via API
  const handleCreateTask = async () => {
    if (!newTask.name.trim()) {
      alert('Task name is required');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTask, created_by: currentUser.id })
      });
      if (!res.ok) throw new Error('Failed to create task');
      const createdTask = await res.json();
      setTasks([...tasks, createdTask]);
      setShowModal(false);
      setNewTask({ name: '', description: '', status: 'Planning', priority: 'Medium', due_date: '', progress: 0 });
    } catch (err) {
      console.error(err);
      alert('Error creating task: ' + err.message);
    }
  };

  // Open edit modal
  const openEditModal = (task) => {
    setEditTask({ ...task });
    setShowEditModal(true);
  };

  // Handle input changes for edit task
  const handleEditInputChange = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  // Save edited task via API
  const handleSaveEdit = async () => {
    if (!editTask.name.trim()) {
      alert("Task name is required");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${editTask.id}`, {
        method: "PUT", // or PATCH depending on backend
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTask),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updatedTask = await res.json();
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
      setShowEditModal(false);
      setEditTask(null);
    } catch (err) {
      console.error(err);
      alert("Error updating task: " + err.message);
    }
  };

  // Helpers
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'Planning': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'Review': return 'bg-purple-100 text-purple-700 border border-purple-200';
      case 'Completed': return 'bg-green-100 text-green-700 border border-green-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 font-semibold';
      case 'Medium': return 'text-yellow-600 font-semibold';
      case 'Low': return 'text-green-600 font-semibold';
      default: return 'text-gray-600 font-semibold';
    }
  };

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return '-';
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-600">Loading tasks...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-72'} bg-white/90 backdrop-blur-xl border-r border-gray-200/60 shadow-2xl`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b border-gray-200/60">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <FolderOpen size={16} className="text-white" />
              </div>
              {!sidebarCollapsed && (
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  SynergySphere
                </span>
              )}
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            <button onClick={() => navigate("/dashboard")} className="flex items-center space-x-3 px-4 py-3 text-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
              <Home size={20} />
              {!sidebarCollapsed && <span className="font-medium">Dashboard</span>}
            </button>

            <button onClick={() => navigate("/tasks")} className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200">
              <FolderOpen size={20} />
              {!sidebarCollapsed && <span className="font-medium">Tasks</span>}
            </button>

            
          </nav>

          <div className="border-t border-gray-200/60 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarCollapsed ? 'ml-20' : 'ml-72'} transition-all duration-300`}>
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-8 py-6 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-3 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 rounded-xl transition-all duration-200">
                <Menu size={20} className="text-gray-700" />
              </button>
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-3.5 w-96 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-300 transition-all text-sm text-gray-900 placeholder-gray-500 shadow-sm"
                />
              </div>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Plus size={18} />
              <span>New Task</span>
            </button>
          </div>
        </header>

        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map(task => {
              const daysUntilDue = getDaysUntilDue(task.due_date);
              return (
                <div key={task.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{task.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                      <div className="flex items-center space-x-4 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                        <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => openEditModal(task)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal size={16} className="text-gray-400" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-600">Progress</span>
                      <span className="text-xs font-semibold text-gray-800">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Users size={14} />
                      <span>1 member</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} />
                      <span className={daysUntilDue < 0 ? 'text-red-600' : daysUntilDue < 7 ? 'text-yellow-600' : 'text-gray-500'}>
                        {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` : 
                         daysUntilDue === 0 ? 'Due today' :
                         `${daysUntilDue} days left`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* New Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-96 max-w-md mx-4 relative shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <X size={20} className="text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter task name" 
                  value={newTask.name} 
                  onChange={handleInputChange} 
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  name="description" 
                  placeholder="Task description" 
                  value={newTask.description} 
                  onChange={handleInputChange} 
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select name="status" value={newTask.status} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select name="priority" value={newTask.priority} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input type="date" name="due_date" value={newTask.due_date} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"/>
              </div>

              <button onClick={handleCreateTask} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {showEditModal && editTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-96 max-w-md mx-4 relative shadow-2xl">
            <button onClick={() => setShowEditModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <X size={20} className="text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={editTask.name} 
                  onChange={handleEditInputChange} 
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  name="description" 
                  value={editTask.description} 
                  onChange={handleEditInputChange} 
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select name="status" value={editTask.status} onChange={handleEditInputChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select name="priority" value={editTask.priority} onChange={handleEditInputChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input type="date" name="due_date" value={editTask.due_date} onChange={handleEditInputChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
                <input type="number" min="0" max="100" name="progress" value={editTask.progress} onChange={handleEditInputChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"/>
              </div>

              <button onClick={handleSaveEdit} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
