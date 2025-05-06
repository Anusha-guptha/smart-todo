import {  useState } from "react";
import { addNoteToTodo } from "../services/todoService.js";

const Notemodal = ({todo, onClose}) =>{

    const [note, setNote] = useState("");

    const handleSaveNote = async () =>{
        await addNoteToTodo(todo._id, note); 
        onClose();
    }

    return(
        <div className="modal-overlay">
  <div className="modal-container">
    <div className="modal-header">
      <h5 className="modal-title">Note</h5>
      <button className="close-button" onClick={onClose}>×</button>
    </div>
    <div className="modal-body">
                <h3>Add Note to {todo.title}</h3>
                <textarea name="notes" id="notes" value={note} placeholder="Notes" onChange={(e) => setNote(e.target.value)} required></textarea>
                </div>
                <div className="modal-footer">
                <button type="submit" onClick={handleSaveNote}>Save</button>
                <button onClick={onClose}>Cancel</button>
                </div>
  </div>
</div>
    )

}

export default Notemodal