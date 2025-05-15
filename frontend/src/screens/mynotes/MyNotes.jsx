import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
// import notes from "../../src/data/notes";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import {useDispatch,useSelector} from "react-redux"
import { getAllNotesThunk } from "../../store/features/notes/notesActions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";


export default function MyNotes() {
const {loading,error,userInfo} = useSelector(state=>state.userAuth)
console.log("userInfo",userInfo,"loading",loading,"From mynotes.jsx");

const dispatch = useDispatch()
const {notes} = useSelector(state=>state.notes);
   useEffect(()=>{
 dispatch(getAllNotesThunk())
  },[userInfo])
  const deleteHandler = (id) => {
    if (window.confirm("Are you Sure")) {
    }
  };


  const [showNote, setShowNote] = useState(null);
  function handleShowNote(id) {

    setShowNote(showNote===id?null:id);
  }

  return (
    <MainScreen title="WelCome back Saqib Ali  ..... ">
      <Link to={"createnote"}>
        <Button
          style={{
            marginLeft: 10,
            marginBottom: 10,
          }}siz="lg">
          Create New Notes
        </Button>
      </Link>
{notes.length >0 ?(
      notes.map(note => (
        <Card style={{ margin: 10 }} kety={note._id}>
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
            <Button href={`/note/${note._id}`}>Edit</Button>
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
        </Card>
      )) ):
      // <Loading></Loading>
       (loading ? <Loading />:(<ErrorMessage>{error}</ErrorMessage>))
    }
    </MainScreen>
  );
}