import { useState } from "react";
import Layout from "../Layout/Layout";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleSuccess = (message) => toast.success(message);
  const handleError = (message) => toast.error(message);
  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!/^[a-zA-Z]/.test(email)) {
       handleError("Email must start with a string");
       return;
     }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/user/login-user`,
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        handleSuccess(response.data.message);
        setTimeout(() => {
          setAuth({
            ...auth,
            user: response.data.user,
            token: response.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(response.data));

          navigate("/");
        }, 1000);
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
          if (response.status === 401) {
            handleError(response.data.message);
          } else if (response.status === 404) {
            handleError(response.data.message);
          } else {
            handleError("error");
          }
        }
      } else {
        handleError("error");
      }
    }
  };
  return (
    <Layout>
      <Row className="mt-5">
        <Col md={{ span: 6 }}>
          <Form onSubmit={handleSubmit}>
            <p className="font-weight-bold fs-1 extra-bold">Log In</p>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control
                className="mb-4"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Control
                className="mb-4"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <div className="d-flex align-items-center log-in">
              <Button variant="primary" className="btn ml-3" type="submit">
                Log in
              </Button>
              <div className="p-4">
                <Link to="/signup">
                  {" "}
                  create new account
                </Link>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
      <ToastContainer
        position="top-center"
        pauseOnHover={true}
        hideProgressBar={true}
      />
    </Layout>
  );
};

export default LoginForm;
