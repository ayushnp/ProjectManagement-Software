import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/SignUp'
import Login from './components/Login'  // Changed to capital L and proper import
import { BrowserRouter, Routes, Route } from "react-router-dom";  // Added Route import
import ProjectDashboard from './components/ProjectDashboard'
import TaskDashboard from './components/TaskDashboard'
import HomePage from './components/Homepage'
function App() {
  return (
    <BrowserRouter>  {/* Wrap Routes with BrowserRouter */}
      <Routes>
        <Route path="/login" element={<Login />} />  {/* Use JSX element syntax */}
        <Route path="/signup" element={<Signup />} />  {/* Added signup route */}
        <Route path="/" element={< HomePage/>} />  {/* Default route */}
        <Route path='/dashboard' element={<ProjectDashboard/>}/>
        <Route path="/tasks" element={<TaskDashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App