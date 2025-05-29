import { Accordion, Badge, Button, Card } from "react-bootstrap";
import Loading from "./loading/Loading";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNoteThunk,getAllNotesThunk } from "../store/features/notes/notesActions";
import { useNavigate } from "react-router-dom";
import useNotes from "../customHooks/useNotes";


export default function NotesCards ({search}){
    const { loading, error, notes } = useNotes();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

      const deleteHandler = (id) => {
    
    if (window.confirm("Are you Sure")) {
      dispatch(deleteNoteThunk(id)).then(() => {
  dispatch(getAllNotesThunk());
});
    }
  };

const editHandler  = function (id,event){
  event.preventDefault();
  navigate(`/note/${id}`)

}
  const [showNote, setShowNote] = useState(null);
  function handleShowNote(id) {

    setShowNote(showNote===id?null:id);
  }
    return (<>
    {notes.length > 0 ?(
      notes?.filter(searchItem=>searchItem?.title?.toLowerCase().includes(search?.toLowerCase()))?.map((note) => (
        loading ? (<Loading />):(
        <Card style={{ margin: 10 }} key={note._id}>
          <Card.Header style={{ display: "flex" }}
          onClick={()=>handleShowNote(note._id)}  
          >
            <span
              style={{
                color: "black",
                textDecoration: "none",
                flex: 1,
                cursor: "pointer",
                alignSelf: "center",
                fontSize: 18,
              }}
            >
              {note.title}
            </span>
            <Button  
            onClick={(event)=>{editHandler(note._id,event)}}
            
            >Edit</Button>
            <Button
              variant="danger"
              className="mx-2"
              onClick={(e) => deleteHandler(note._id)}
            >
              Delete
            </Button>
          </Card.Header>

          {
            showNote===note._id && (
              <Card.Body key={note._id}>
            <h4>
              <Badge bg="success">Category -{note.category}</Badge>
            </h4>
            <blockquote className="blockquote mb-0">
              <p>{note.content}</p>
              <footer class="blockquote-footer">Created On --- Date</footer>
            </blockquote>
          </Card.Body>
            )
          }
        </Card>)
      )
    ) ):(<ErrorMessage>{error}</ErrorMessage>)

      
    }
    
    </>)
}