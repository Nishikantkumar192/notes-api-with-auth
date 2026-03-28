
import { useContext } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import NoteContext from "../context/NoteContext";

const ShowNote = ({ note }) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-xl p-4 m-3 hover:shadow-lg transition duration-200">
      
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {note.title}
        </h3>
        &nbsp; &nbsp;
        <div className="flex gap-3">
          <FaRegEdit className="text-blue-500 cursor-pointer hover:scale-110 transition" />
          <MdDeleteForever
            onClick={() => deleteNote(note._id)}
            className="text-red-500 text-xl cursor-pointer hover:scale-110 transition"
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm">
        {note.description}
      </p>
    </div>
  );
};

export default ShowNote;