import { Link } from "react-router-dom";
import MainScreen from "../components/MainScreen";
import Accordion from 'react-bootstrap/Accordion';
import {  Badge, Button, Card, CardHeader, CardTitle } from "react-bootstrap";
import notes from "../../src/data/notes";
export default function MyNotes() {
  const deleteHandler = (id) => {
    if (window.confirm("Are you Sure")) {
    }
  };
  
  return (
    <MainScreen title="WelCome back Saqib Ali  ..... ">
      <Link to={"createnote"}>
        <Button
          style={{
            marginLeft: 10,
            marginBottom: 10,
          }}
          siz="lg"
        >
          Create New Notes
        </Button>
      </Link>

      {notes.map((note) => (
        <Accordion defaultActiveKey="0" >

        <Card style={{ margin: 10 }}>
          <Card.Header style={{ display: "flex" }}>
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
                <Accordion.Header as={Card.text} variant='link' eventkey="0">

              {note.title}
            
            </Accordion.Header>
            </span>
            <Button href={`/note/${note._id}`}>Edit</Button>
            <Button
              variant="danger"
              className="mx-2"
              onClick={() => deleteHandler(note._id)}
            >
              Delete
            </Button>
          </Card.Header>

          <Accordion.Body>
          <Card.Body>
            <h4>
              <Badge bg='success'>Category -{note.category}</Badge>
            </h4>
            <blockquote class="blockquote mb-0">
              <p>{note.content}</p>
              <footer class="blockquote-footer">Created On --- Date</footer>
            </blockquote>
          </Card.Body>
          </Accordion.Body>

        </Card>
        </Accordion>

      ))}
    </MainScreen>
  );
}
