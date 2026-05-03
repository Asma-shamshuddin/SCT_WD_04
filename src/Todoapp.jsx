// import React, { useState } from 'react'
// import img from './assets/image.png'
// import { useLocation } from 'react-router-dom';

// const Todoapp = () => {
//   const location = useLocation()
//   const userName = location.state?.userName

//   const [task, setTask] = useState([""]);
//   const [newTask , setNewTask] = useState(" ");

//   const handleChange = () =>{
//      setNewTask(event.target.value);
//   }

//   const addTask = () =>{
//      if(newTask.trim() !== ""){
//       setTask(t => [...t,newTask]);
//       setNewTask("");
//      }
//   }
//   return (
//     <div className='min-h-screen  flex items-center justify-center w-full bg-cover bg-center flex-col'
//         style={{backgroundImage : `url(${img})`}} >
//       <div className='bg-white/40 backdrop-blur-md h-auto w-[90%] lg:w-96  mt-5 rounded-4xl border-2 border-white shadow-2xl flex flex-col items-center'>
//       <h1 className='text-3xl font-bold text-white'>Wecome {userName}</h1>
//          <input  type='text'
//           placeholder='Enter your task'
//           value = {newTask}
//           onChange={handleChange}
//           className='border mt-6 ml-2'></input>
//          <button 
//          onClick={addTask}
//          className='border ml-4'>ADD</button>
//       </div>
//        <div>
//         {task.map((task, index) =>
//           <div key={index}>
//             <p className='bg-amber-300 ml-2 mt-3'>{task}</p>

//           </div> 
//          )}
//        </div>
//     </div>
//   )
// }

// export default Todoapp

import React, { useState, useEffect } from 'react'
import img from './assets/image.png'
import { useLocation } from 'react-router-dom'
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

// Load from localStorage
const getInitialTasks = () => {
  const saved = localStorage.getItem("tasks")
  return saved ? JSON.parse(saved) : []
}

const Todoapp = () => {

  const location = useLocation()
  const userName = location.state?.userName || "User"
  const userPhoto = location.state?.userPhoto || "https://cdn-icons-png.flaticon.com/512/149/149071.png"

  const [tasks, setTasks] = useState(getInitialTasks())
  const [newTask, setNewTask] = useState("")
  const [priority, setPriority] = useState("")
  const [filter, setFilter] = useState("all")
  const [date, setDate] = useState("")

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // ADD TASK
  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Please enter a task")
      return
    }

    if (!priority) {
      alert("Please select priority")
      return
    }

    if (!date) {
      alert("Please select a date")
      return
    }

    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
    alert("Invalid date! Please select today or future date 🚫")
    return
    }

    const taskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority,
      date
    }

    setTasks([...tasks, taskObj])
    setNewTask("")
    setPriority("")
    setDate("")
  }

  // DELETE
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  // TOGGLE COMPLETE
  const toggleComplete = (id) => {
    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    )
  }

  // EDIT
  const editTask = (id) => {
    const updated = prompt("Edit task:")
    if (!updated) return

    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, text: updated } : t
      )
    )
  }

  // FILTER
  const filteredTasks = tasks.filter(t => {
    if (filter === "completed") return t.completed
    if (filter === "pending") return !t.completed
    return true
  })

  // PROGRESS
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100

  
 
  return (
    <div
      className='min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-5'
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className='bg-white/40 backdrop-blur-md w-[90%] lg:w-96 rounded-3xl border-2 border-white shadow-2xl flex flex-col items-center p-4'>

        
        
      <div className="flex items-center gap-3 mb-2">

       <img
           src={userPhoto}
           alt="user"
           className="w-15 h-15 rounded-full border-2 border-white object-cover"
      />

        <h2 className="text-white text-xl font-bold">
         Hello, {userName}
        </h2>

      </div>

        {/* PROGRESS */}
        <div className='w-[90%] bg-gray-300 h-3 rounded mt-3'>
          <div
            className='bg-green-500 h-3 rounded'
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className='text-white mt-1'>
          {completedTasks} / {totalTasks} Tasks ({Math.round(progress)}%)
        </p>

        {/* FILTER */}
        <div className='flex gap-2 mt-3'>
          {["all", "completed", "pending"].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className='bg-blue-700 text-white px-3 py-1 rounded-2xl'
            >
              {type}
            </button>
          ))}
               

        </div>

        {/* INPUTS */}
        <div className='flex flex-col gap-2 mt-4 w-full items-center'>

          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder='Enter task'
            className='p-2 w-[90%] rounded-xl border-2 border-blue-400 bg-white'
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className='p-2 w-[90%] rounded-xl border-2 border-blue-400 bg-white'
          >
            <option value="">Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='p-2 w-[90%] rounded-xl border-2 border-blue-400 bg-white'
          />

          <button
            onClick={addTask}
            className='bg-green-600 text-white px-4 py-2 rounded-xl w-[90%] hover:bg-green-400 '
          >
            Add Task
          </button>

        </div>

        {/* task */}
        <div className='w-[90%] mt-5 max-h-64 overflow-y-auto'>

          {filteredTasks.map(task => {

            const isOverdue =
              task.date && new Date(task.date) < new Date()

            return (
              <div
                key={task.id}
                className='p-3 rounded-3xl mt-2 flex justify-between bg-blue-800 text-white border-2'
              >
               
                <div>
                  <h3 className= 
                  {task.completed ? "line-through" : ""}>
                    {task.text}
                  </h3>

                  <p className={`text-sm ${isOverdue ? "text-red-600 font-bold" : "text-gray-900"}`}>
                    <i class="fa-regular fa-calendar"></i> {task.date}
                  </p>

                  <p className={
                    task.priority === "high"
                      ? "text-red-600"
                      : task.priority === "medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }>
                    {task.priority}
                  </p>
                </div>

                <div className='flex gap-2'>
                  <button onClick={() => toggleComplete(task.id)}> <i
                  className={`fa-solid fa-circle-check text-xl transition-colors duration-300 ${
                 task.completed ? "text-green-500" : "text-white"
                  }`}
  ></i></button>
                  <button onClick={() => editTask(task.id)}>
                   <FaEdit className="text-white" />
                   </button>
                  <button onClick={() => deleteTask(task.id)}>
                  <FaTrash className="text-red-600" />
                  </button>
                </div>
                

              </div>
            )
          })}

        </div>

      </div>
    </div>
  )
}

export default Todoapp