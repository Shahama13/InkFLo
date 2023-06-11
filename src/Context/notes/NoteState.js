import noteContext from './noteContext';
import { useState } from 'react';
const NoteState = (props) => {
  const host = "http://localhost:5500";
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial)
  // GET ALL NOTEs
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    });
    const json = await response.json()
    console.log(json)
    setnotes(json)

  }
  // ADD A NOTE
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    // const note = {
    //   "_id": "64653a5a0a7a89e0f751d6dc",
    //   "user": "646501c4024abb3c0f77ac60",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2023-05-17T20:34:34.504Z",
    //   "__v": 0
    // };
    const note = json;
    setnotes(notes.concat(note))
  }
  // DELETE A NOTEz
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json)
    // console.log("json")
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)
  }

  // EDIT A NOTE
  const editNote = async (id, title, description, tag) => {
    // API 

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    let newNotes= JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes)
  }


  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
