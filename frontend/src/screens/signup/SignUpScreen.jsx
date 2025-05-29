import { Button, Col, Form, Row } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { userSignupThunk } from "../../store/features/user/userActions";


export default function SignUpScreen() {
const {loading,error,userInfo} = useSelector(state=>state.userAuth)
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // File ke liye state
  const navigate = useNavigate();

  // File select karne ka handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setPicMessage("Please Select an Image");
      setSelectedFile(null);
      return;
    }
    if (file.type === "image/jpeg" || file.type === "image/png") {
      setSelectedFile(file);
      setPicMessage(null);
      console.log("Selected File:", file);
    } else {
      setPicMessage("Please select a JPEG or PNG image");
      setSelectedFile(null);
    }
  };
  
  
  
  
  async function submitHandler(e) {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Password Do Not Match");
      return;
      }
      // FormData banayein taake file aur data dono bheje ja sakein
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (selectedFile) {
        formData.append("file", selectedFile); // 'file' field name match karta hai backend ke multer se
      } else {
        setMessage('Please Select an Image')
      }
    dispatch(userSignupThunk(formData))
  }
  
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     navigate("/mynotes");
  //   }
  // }, [userInfo,navigate ]);

  return (
    <MainScreen title={"Sign Up"}>
      <div className="loginContainer">
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
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
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
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

/*  Saqib ali code remove with grok 3  . 18-4-25 3am
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState({});

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Password Do Not Match");
    } else {
      setMessage("");
      setLoading(true);
      try {
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await api.post(
          "/api/users/signup",
          { name, email, password, confirmpassword, pic },
          config
        );
        setLoading(false);
        localStorage.setItem("userinfo", JSON.stringify(data));
        navigate("/mynotes");
      } catch (error) {
        console.log(error.message);

        setError(error.message);
        setLoading(false);
      }
    }
  }
  const postDetails = function (pics) {
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      setPic(pics)
      data.append("file",pics);
    }
  };
 */

// second part
/* 
  
    <MainScreen title={"Sign Up"}>
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error.message}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
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
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={(e) => postDetails(e.target.files[0])}
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
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  */
