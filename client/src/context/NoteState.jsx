import { useEffect, useState } from "react";
import api from "../api/axios";
import NoteContext from "./NoteContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    isValid();
  }, []);
  const isValid = async () => {
    try {
      const { data } = await api.get("/api/auth/isLoggedIn");
      if (data.success) {
        setIsLoggedIn(data.user);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      setIsLoggedIn(false);
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const newUser = async (url, input) => {
    try {
      const { data } = await api.post(url, input);
      if (data.success) {
        setIsLoggedIn(data.user);
        toast.success(data.message);
        navigate("/fetchNotes");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const logoutUser = async () => {
    setIsLoggedIn(false);
    setNotes([]);
    navigate("/");
    try {
      const { data } = await api.get("/api/auth/logout");
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const newNotes = async (details) => {
    try {
      const { data } = await api.post("/api/notes/newNotes", details);
      setNotes(notes.concat(data.newOne));
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const getNotes = async () => {
    try {
      const { data } = await api.get("/api/notes/getNotes");
      setNotes(data.allNotes);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const deleteNote = async (id) => {
    try {
      const { data } = await api.get(`/api/notes/deleteNote/${id}`);
      toast.success(data.message);
      if (data.success === true) {
        const extractNode = notes.filter((note) => note._id !== id);
        setNotes(extractNode);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const updateNoteDetails = async (details, id) => {
    try {
      const { data } = await api.post(
        `/api/notes/updateNoteDetails/${id}`,
        details,
      );
      toast.success(data.message);
      navigate("/fetchNotes");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  const values = {
    newUser,
    logoutUser,
    newNotes,
    notes,
    getNotes,
    deleteNote,
    updateNoteDetails,
    isLoggedIn,
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
