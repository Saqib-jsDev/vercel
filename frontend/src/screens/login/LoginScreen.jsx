import { Button, Col, Form, Row } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import "./loginscreen.css";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useDispatch ,useSelector} from "react-redux"
import {userLoginthunk} from "../../store/features/user/userActions";
import { getAllNotesThunk } from "../../store/features/notes/notesActions";



export default function LoginScreen() {


const {loading,error,userInfo} = useSelector(state=>state.userAuth)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const dispatch =   useDispatch()

const navigate = useNavigate();

useEffect(() => {
  if (userInfo) {
    navigate("/mynotes");
  }
}, [userInfo,navigate ]);

 function submitHandler(e) {
    e.preventDefault();

    dispatch(userLoginthunk({email,password}));
    // dispatch(getAllNotesThunk())

  }
  


  return (
    <MainScreen title={"LOGIN"}>
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer? <Link to={"/signup"}>SignUp Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}
