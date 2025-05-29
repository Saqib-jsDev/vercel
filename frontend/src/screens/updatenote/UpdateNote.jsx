import { Button, Card, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/loading/Loading";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotesThunk, updateNoteThunk } from "../../store/features/notes/notesActions";
import useNotes from "../../customHooks/useNotes";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateNote() {
  const { loading, error, notes } = useNotes();

const navigate = useNavigate()
      if (notes.length === 0) {
        navigate("/mynotes")
      }

  const dispatch = useDispatch();
  const { id } = useParams();
  const currentNote = notes?.filter((note) => note._id === id);

  

  const {title:currentTitle,content:CurrentContent,category:currentCategory} = currentNote.at(0)
  
  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(CurrentContent);
  const [category, setCategory] = useState(currentCategory);

  async function submitHandler(e) {
    e.preventDefault();
    if (!title || !content|| !category) return;
    // if ( title === currentTitle || content === CurrentContent || category === currentCategory) return;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    dispatch(updateNoteThunk({formData,id}));
  navigate('/mynotes')
  }

  return (
    <MainScreen>
      <Card>
        <Card.Header>Edit Your Note</Card.Header>
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
              Update Note
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Updated On {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}
