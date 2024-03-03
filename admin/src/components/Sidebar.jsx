import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="d-flex justify-content-between flex-column  p-5 sidebar">
      <div>
        <Link to="/">
          <i className="bi bi-car-front-fill fs-4 me-4"></i>
          <span className="fs-4">RentWheels</span>
        </Link>
        <hr className="text-dark" />
        <ul className="nav nav-pills flex-column mt-2">
          {/* <li className='nav-item p-3'>
                  <a href='' className='p-2'>
                     <i className='bi bi-people me-3 fs-4 '></i>
                     <span className='fs-4'></span>
                     <strong>Users</strong>
                  </a>
               </li> */}
          <li className="nav-item p-2">
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                className="p-3 text-dark text-decoration-none"
              >
                <i className="bi bi-people me-3 fs-4"></i>
                <span className="fs-4"></span>
                <strong>Users</strong>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/add-user">
                  Add User
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/view-user">
                  View Users{" "}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item p-2">
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                className="p-3 text-dark text-decoration-none"
              >
                <i className="bi bi-car-front me-3 fs-4"></i>
                <span className="fs-4"></span>
                <strong>Cars</strong>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/add-car">
                  Add Car
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/view-cars">
                  View Cars
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/update-car">
                  Update Car
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item p-2">
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                className="p-3 text-dark text-decoration-none "
              >
                <i className="bi bi-grid me-3 fs-4"></i>
                <span className="fs-4"></span>
                <strong>Bookings</strong>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/view-bookings">
                  View Bookings
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <div className="nav-item p-3 app-link">
            <a
              href="http://localhost:5173"
              className="p-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-app-indicator me-3 fs-4"></i>
              <strong>App</strong>
            </a>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
