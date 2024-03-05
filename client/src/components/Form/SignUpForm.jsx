import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const handleSuccess = (message) => toast.success(message);
  const handleError = (message) => toast.error(message);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length < 10) {
      handleError("Invalid number");
      return;
    }
    if (!/^98\d{8}$/.test(phoneNumber)) {
      handleError("Phone number not valid");
      return;
    }
    if (!/^[a-zA-Z]/.test(email)) {
      handleError("Email must start with a string");
      return;
    }
    if (password.length < 6) {
      handleError("Password must have 6 characters");
      return;
    }
    if (!file) {
      handleError("File must be provided");
      return;
    }
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/user/register-user`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Check the response
      console.log(response.data.newUser);

      if (response.data.success) {
        // Handle successful registration
        handleSuccess(response.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        // Handle unsuccessful registration
        handleError(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
          if (response.status === 400) {
            handleError(response.data.message);
          } else if (response.status === 500) {
            handleError(response.data.message);
          } else {
            handleError(response.error.message);
          }
        } else {
          handleError("Check your details again");
        }
      }
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row className="mt-5">
          <p className="font-weight-bold fs-1 extra-bold ">Sign In</p>
          <Col md={{ span: 6 }}>
            <Form.Group className="mb-3" controlId="">
              <Form.Control
                className="mb-4"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Control
                className="mb-4"
                type="file"
                placeholder="Document"
                accept="image/png,image/jpeg,image/jpg/"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <div className="position-relative">
                <Form.Control
                  className="mb-4"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={{ span: 6 }}>
            <Form.Group className="mb-4" controlId="">
              <Form.Control
                className="mb-4"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Form.Control
                className="mb-4"
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <div className="position-relative">
                <Form.Control
                  className="mb-4"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password && (
                  <i
                    className=" text-secondary position-absolute end-0 top-50 translate-middle-y p-4"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                  </i>
                )}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Col md={6}>
          <Button variant="primary" type="submit" className="btn">
            Sign up
          </Button>
        </Col>
      </form>
      <ToastContainer
        position="top-center"
        pauseOnHover={true}
        hideProgressBar={true}
      />{" "}
    </Layout>
  );
};

export default SignUpForm;
