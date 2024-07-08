import noteContext from "../context/notes/noteContext"
import React, { useContext } from 'react'

import Noteitem from "./Noteitem";

const Notes = () => {
    const context = useContext(noteContext);
  const { notes, setNotes } = context;

  return (
    <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note)=> {
          return <Noteitem key= {note._id} note={note}/>
        })}
      </div>
  )
}

export default Notes
