import { useState } from "react";
import api from "../api/axios";
import NoteContext from "./NoteContext";
import { toast } from "react-toastify";

const NoteState = (props) => {
  const [notes,setNotes]=useState([]);
  const newUser = async (url, input) => {
    try {
      const { data } = await api.post(url, input);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const logoutUser=async()=>{
    try{
      const {data}=await api.get("/api/auth/logout");
      toast.success(data.message);
    }catch(err){
      toast.error(err.response?.data?.message || err.message);
    }
  }
  const newNotes=async(details)=>{
    try{
      const {data}=await api.post("/api/notes/newNotes",details);
      setNotes(notes.concat(data.newOne));
      toast.success(data.message);
    }catch(err){
      toast.error(err.response?.data?.message || err.message);
    }
  }
  const getNotes=async()=>{
    try{
      const {data}=await api.get("/api/notes/getNotes");
      setNotes(data.allNotes);
    }catch(err){
      toast.error(err.response?.data?.message || err.message);
    }
  }
  const deleteNote=async(id)=>{
    try{
      const {data}=await api.get(`/api/notes/deleteNote/${id}`);
      toast.success(data.message);
      const extractNode=notes.filter((note)=>note._id!==id);
      setNotes(extractNode);
    }catch(err){
      toast.error(err.response?.data?.message || err.message);
    }
  }
  const values = {
    newUser,logoutUser,newNotes,notes,getNotes,deleteNote
  };
  return (
    <div>
      <NoteContext.Provider value={values}>
        {props.children}
      </NoteContext.Provider>
    </div>
  );
};

export default NoteState;
