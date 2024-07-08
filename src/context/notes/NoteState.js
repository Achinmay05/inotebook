// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "668bec836e196d2de17accf8",
          "user": "668a696209577dbd9d7e7814",
          "title": "My Title",
          "description": "this is my first Note!",
          "tag": "personal",
          "date": "2024-07-08T13:41:23.785Z",
          "__v": 0
        },
        {
          "_id": "668bec856e196d2de17accfa",
          "user": "668a696209577dbd9d7e7814",
          "title": "My Title",
          "description": "this is my first Note!",
          "tag": "personal",
          "date": "2024-07-08T13:41:25.717Z",
          "__v": 0
        },
        {
          "_id": "668bec866e196d2de17accfc",
          "user": "668a696209577dbd9d7e7814",
          "title": "My Title",
          "description": "this is my first Note!",
          "tag": "personal",
          "date": "2024-07-08T13:41:26.563Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;