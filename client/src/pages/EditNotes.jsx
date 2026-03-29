import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import NoteContext from "../context/NoteContext";


const EditNotes = () => {
    const context=useContext(NoteContext);
    const {updateNoteDetails}=context;
    const {id}=useParams();
    const initialState={
        title:"",
        description:"",
    }
    const [details,setDetails]=useState(initialState);
    const handleSubmit=(e)=>{
        e.preventDefault();
        updateNoteDetails(details,id);
    }

    const handleChange=(e)=>{
        setDetails({
            ...details,
            [e.target.name]:e.target.value
        })
    }
    useEffect(()=>{
        getParticularNotes();
    },[id])
    const getParticularNotes=async()=>{
        try{
            const {data}=await api.get(`/api/notes/getParticularNotes/${id}`);
            setDetails(data);
        }catch(err){
            toast.error(err.response?.data?.message || err.message);
        }
    }
  return (
    <div className="scroll-container bg-yellow-400 h-screen flex flex-col items-center pt-[70px] overflow-y-auto">
      <h1 className="font-bold text-3xl">Updata your Notes</h1><br />
      <form onSubmit={handleSubmit}>
        <div className="form-inputs bg-gray-400 p-4 rounded-lg">
          <label className="font-bold" htmlFor="title">
            Title
          </label>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Enter the Title"
              id="title"
              value={details.title}
              onChange={handleChange}
              required
            />
          </div>
          <label className="font-bold" htmlFor="description">
            Description
          </label>
          <div>
            <textarea
              className="outline-none w-full"
              rows={3}
              name="description"
              id="description"
              type="text"
              placeholder="Enter the description"
              value={details.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="text-center bg-green-800 rounded-lg mt-[10px]">
            <button className="w-full cursor-pointer">Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNotes;
