import MainScreen from "../../components/MainScreen";
import { Row, Col, Button, Form } from "react-bootstrap";
import useNotes from "../../customHooks/useNotes";
import { useState, useEffect } from "react";
import "./profilescreen.css"
import Loading from "../../components/loading/Loading";
import { baseURL } from "../../store/api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { userUpdateProfileThunk } from "../../store/features/user/userActions";
import { useDispatch } from "react-redux";

export default function ProfileScreen() {
  const { userInfo, userLoading: loading, error } = useNotes();
  const dispatch = useDispatch();
  const { name: CurrName, email: currEmail } = userInfo;
  const [name, setName] = useState(CurrName);
  const [email, setEmail] = useState(currEmail);
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMSG, setPicMSG] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setPicMSG("Please Select an Image");
      setPic(null);
      return;
    }
    if (file.type === "image/jpeg" || file.type === "image/png") {
      setPic(file);
    }
  };

  async function submitHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password Do Not Match");
      return;
    }

    const formData = new FormData();
    
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (pic) {
      formData.append("file", pic);
    }
    

    dispatch(userUpdateProfileThunk(formData));
    setMessage("");
    setName(CurrName);
    setEmail(currEmail);
    setPassword();
    setComfirmPassword()
    setPic("")
  }

  useEffect(() => {}, [userInfo]);
  return (
    <MainScreen title={"EDIT PROFILE"}>
      <div className="">
        <Row className="ProfileeContainer">
          <Col md={6}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setComfirmPassword(e.target.value)}
                />
              </Form.Group>

              {picMSG && <ErrorMessage variant="danger">{picMSG}</ErrorMessage>}
              <Form.Group controlId="pic">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  onChange={handleFileChange}
                  id="custom-file"
                  type="file"
                  label="Upload Profile Picture"
                  custom
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              alt=""
              src={`${baseURL}${userInfo?.pic}`}
              height="500"
              style={{ marginRight: 10 }}
            />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}
