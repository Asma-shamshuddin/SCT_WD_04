import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img from './assets/image.png'

const Profile = () => {
  const [name ,setName] = useState('');
  const [photo , setPhoto] = useState(null)
  const navigate = useNavigate()

  const handleImage = (e) =>{
    const file = e.target.files[0]
    if(file){
      setPhoto(URL.createObjectURL(file))
    }
    
  }

  const handleContinue = () =>{
    if(!name) {
      alert("please enter your name")
      return
    }
     navigate('/todo' , {state: {userName: name, userPhoto: photo} })
  }

  return (
    <div className='min-h-screen  flex items-center justify-center w-full bg-cover bg-center flex-col'
    style={{backgroundImage : `url(${img})`}}> 
    <h1 className='flex items-center text-white text-2xl lg:text-3xl font-bold'>Welcome to your To-DO App</h1> 
    <h2 className='flex items-center text-white text-xl lg:text-2xl ml-4 lg:ml-0'>Organize your day, track your progress and stay productive</h2> 

      <div className='bg-white/40 backdrop-blur-md h-auto w-[90%] lg:w-96  mt-5 rounded-4xl border-2 border-white shadow-2xl flex flex-col items-center'>
      <h1 className='text-white font-bold text-center mt-5 text-3xl lg:text-4xl'>create Profile</h1>

      <div className='mb-4 flex flex-col items-center'>
        <img 
          src={photo ||  "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt = " profile"
          className='w-24 h-24 rounded-full border-4 border-white object-cover bg-gray-400'>

          </img>
           <input
            type='file'
            accept='image/*'
            onChange={handleImage}
            className='text-white mt-2'
          />
      </div>

      <input 
      type='text'
      placeholder='Enter your name'
      value={name}
      onChange={(e) => setName(e.target.value)}
      className=' bg-blue-800 text-white px-6 py-2 rounded-lg w-[80%] mb-4 border '
      />

      <button 
      onClick={handleContinue}
      className=' bg-blue-800 hover:bg-blue-600 text-white px-6 py-2 rounded-lg w-[80%] mb-5 border'> Continue ➡️
      </button>
      

      </div>
    </div>
  )
}

export default Profile
