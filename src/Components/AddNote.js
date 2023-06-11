import { useContext, useEffect, useState } from 'react'
import noteContext from "../Context/notes/noteContext"
import { useNavigate } from 'react-router-dom';



function AddNote(props) {

    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
        }
        else {
            navigate("/login")
        }
        //   eslint-disable-next-line
    }, [])

    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        e.preventDefault(); //page doesnt reload
        addNote(note.title, note.description, note.tag);
        props.showAlert("Added Successfully", "success")
        setnote({ title: "", description: "", tag: "" })
    }
    return (
        <div>
            <h2 className='my-4'>Add your notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label"> Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>

        </div>
    )
}

export default AddNote