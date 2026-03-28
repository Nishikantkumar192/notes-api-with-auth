import { useState } from 'react'
import "../styles/component.css"

const ShowMyNotes = () => {
    const initialState={
        title:"",
        description:"",
    }
    const handleChange=(e)=>{
        setDetails({
            ...title,
            [e.target.name]:e.target.value
        })
    }
    const [details,setDetails]=useState(initialState);
  return (
    <div className='bg-yellow-400 h-screen flex flex-col items-center pt-[100px]'>
      <form onSubmit={handleSubmit}>
        <div className='form-inputs bg-pink-400 p-4 '>
            <label className='font-bold' htmlFor="title">Title</label>
            <div>
                <input  type="text" name="title" placeholder='Enter the Title' id='title' value={details.title} onChange={handleChange} required/>
            </div>
            <label className='font-bold' htmlFor="description">Description</label>
            <div>
                <textarea className="outline-none" name="description" id="description" type="text" placeholder='Enter the description' value={details.description} onChange={handleChange}></textarea>
            </div>
        </div>
      </form>
      <div className='mt-[80px]'>
        <h3 className='font-bold text-3xl'>Your Notes</h3>

      </div>
    </div>
  )
}

export default ShowMyNotes
