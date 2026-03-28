import api from "../api/axios";
import NoteContext from "./NoteContext";
import { toast } from "react-toastify";

const NoteState = (props) => {
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
  const values = {
    newUser,logoutUser
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
