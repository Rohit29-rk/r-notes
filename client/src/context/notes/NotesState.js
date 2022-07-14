import React, { useState } from "react";

import NoteContext from "./noteContext";

const Notestate = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  // eslint-disable-next-line
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
        
      },
    });
    
    const json = await response.json();
    console.log(json);
    
    setNotes(json);
  };

  //Add note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const note = {
      
      
      title: title,
      description: description,
      tag: tag,
      
    };
    console.log(notes);
    setNotes(notes.concat(note));
  };

  //Delete note
  const deleteNote = async (id) => {
    
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },

      
    });
    const json =response.json();
    console.log(json)
    

    console.log("deletE" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //apicall
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
      
    }
    setNotes(newNotes)
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default Notestate;
