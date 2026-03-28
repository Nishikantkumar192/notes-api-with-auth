import { useState,useContext,useEffect } from 'react'
import "../styles/component.css"
import NoteContext from '../context/NoteContext'
import ShowNote from './ShowNote';
const ShowMyNotes = () => {
  const context=useContext(NoteContext);
  const {newNotes,getNotes,notes}=context;
    const initialState={
        title:"",
        description:"",
    }
    const [details,setDetails]=useState(initialState);
    useEffect(()=>{
      getNotes();
    },[])
    const handleChange=(e)=>{
        setDetails({
            ...details,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      newNotes(details);
      setDetails(initialState);
    }
  return (
    <div className='bg-yellow-400 h-screen flex flex-col items-center pt-[100px]'>
      <form onSubmit={handleSubmit}>
        <div className='form-inputs bg-pink-400 p-4 rounded-lg'>
            <label className='font-bold' htmlFor="title">Title</label>
            <div>
                <input  type="text" name="title" placeholder='Enter the Title' id='title' value={details.title} onChange={handleChange} required/>
            </div>
            <label className='font-bold' htmlFor="description">Description</label>
            <div>
                <textarea className="outline-none w-full" rows={3} name="description" id="description" type="text" placeholder='Enter the description' value={details.description} onChange={handleChange}></textarea>
            </div>
          <div className='text-center bg-green-800 rounded-lg mt-[10px]'>
            <button className='w-full cursor-pointer'>Upload</button>
          </div>
        </div>
      </form>
        <h3 className='font-bold text-3xl'>Your Notes</h3>
      <div className='mt-[25px]'>
        {notes.length===0? "You haven't uploaded Notes":
        notes.map((note)=>{
          return <ShowNote note={note} key={note._id}/>
        })}
      </div>
    </div>
  )
}

export default ShowMyNotes
