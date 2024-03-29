import { useContext } from 'react'
import noteContext from "../Context/notes/noteContext"

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note, updateNote } = props
    return (
        <div className='col-md-4'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <i onClick={() => { updateNote(note) }} className="fa-regular fa-pen-to-square mx-2"></i>
                            <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success") }}></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}.</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem