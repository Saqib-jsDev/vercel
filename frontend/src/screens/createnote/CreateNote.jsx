import { Button, Card, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/loading/Loading";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNoteThunk } from "../../store/features/notes/notesActions";
import NotesCards from "../../components/NotesCards";
import useNotes from "../../customHooks/useNotes";
import { useNavigate } from "react-router-dom";

export default function CreateNote() {
  const { loading, error, notes } = useNotes();
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    if (!title || !content || !category) return;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    dispatch(createNoteThunk(formData));
    resetHandler();
    navigate("/mynotes")
  }
  function resetHandler() {
    setCategory("");
    setContent("");
    setTitle("");
  }

  return (
    <MainScreen>
      <Card>
        <Card.Header>Create a New Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger"> {error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Enter the Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter Your Content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                placeholder="Enter Your Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Fields
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Creating On {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>

      <NotesCards notes={notes} loading={loading}></NotesCards>
    </MainScreen>
  );
}
