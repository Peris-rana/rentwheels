import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../../context/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useEffect, useState } from "react";
import axios from "axios";
import Notify from "./Notify";
function NavBar() {
  const [auth, setAuth] = useAuth();
  const [notifications, setNotifications] = useState([]);

  const handleLogout = () => {
    toast.success("Logout successful");
    localStorage.removeItem("auth");
    setTimeout(() => {
      setAuth({ ...auth, user: null, token: "" });
    }, 0);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/bookings/get-notification`,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("auth")).token,
          },
        }
      );
      setNotifications(response.data.notifications);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="">
        <Container className="bg-white d-flex">
          <Navbar.Brand href="/" className="extra-bold fs-4">
            RentWheels
          </Navbar.Brand>
          <div className="d-flex bell">
            {auth?.user && notifications.length > 0 && (
              <>
                <Notify notifications={notifications} />
                <p className=" rounded notify">{notifications.length}</p>
              </>
            )}
          </div>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="custom-toggle"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto ">
              {/* <Nav.Link href="home">Home</Nav.Link> */}
            </Nav>
            <Nav>
              {!auth.user ? (
                <>
                  <Nav.Link href="login">Login</Nav.Link>
                  <Nav.Link
                    eventKey={2}
                    style={{ color: "#ff7377" }}
                    href="signup"
                  >
                    Signup
                  </Nav.Link>
                </>
              ) : (
                <>
                  <span className="p-2 rounded-circle text-danger">
                    {auth.user.firstName}
                  </span>
                  <Nav.Link href="/" onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ToastContainer
        position="top-center"
        pauseOnHover={true}
        hideProgressBar={true}
      />
    </>
  );
}

export default NavBar;
