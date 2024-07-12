// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)


 // Get All notes 
 const getNotes = async () => {
  //API Call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YTY5NjIwOTU3N2RiZDlkN2U3ODE0In0sImlhdCI6MTcyMDM3MzgyOH0.ih5qlxZzp_hrSw-8ZGv9H7IcMTJ2mMAnr_33XVE7b-k "
    }
  });
  const json = await response.json()
  console.log(json)
  setNotes(json)
}


  // Add a note 
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YTY5NjIwOTU3N2RiZDlkN2U3ODE0In0sImlhdCI6MTcyMDM3MzgyOH0.ih5qlxZzp_hrSw-8ZGv9H7IcMTJ2mMAnr_33XVE7b-k "
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    const note = {
      "_id": "668bec866e196d2de17accfc55",
      "user": "668a696209577dbd9d7e7814",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-07-08T13:41:26.563Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  // delete a note 
  const deleteNote = async (id) => {

//API Call
const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YTY5NjIwOTU3N2RiZDlkN2U3ODE0In0sImlhdCI6MTcyMDM3MzgyOH0.ih5qlxZzp_hrSw-8ZGv9H7IcMTJ2mMAnr_33XVE7b-k "
  }
});
const json = response.json();
console.log(json);

    const newNotes = notes.filter((note) => { return note._id !== id })

    setNotes(newNotes)
  }

  // edit a note 
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4YTY5NjIwOTU3N2RiZDlkN2U3ODE0In0sImlhdCI6MTcyMDM3MzgyOH0.ih5qlxZzp_hrSw-8ZGv9H7IcMTJ2mMAnr_33XVE7b-k "
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))

    //Logic to edit in client 
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;