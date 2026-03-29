import { useState } from "react";
import api from "../api/axios";
import NoteContext from "./NoteContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const navigate=useNavigate();
  const [notes,setNotes]=useState([]);
  const [isLoggedIn,setIsLoggedIn]=useState({});
  const newUser = async (url, input) => {
    try {
      const { data } = await api.post(url, input);
      if(url==="/api/auth/login" && data.success===true){
        setIsLoggedIn({username:data.username});
        navigate("/fetchNotes");
      }
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const logoutUser=async()=>{
    try{
      const {data}=await api.get("/api/auth/logout");
      setIsLoggedIn({});
      navigate("/");
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
    newUser,logoutUser,newNotes,notes,getNotes,deleteNote,isLoggedIn
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
