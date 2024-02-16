import "bootstrap-icons/font/bootstrap-icons.css";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="d-flex justify-content-between flex-column  p-3 sidebar">
      <div>
        <Link to="/" className="p-3">
          <i className="bi bi-car-front-fill fs-4 me-4"></i>
          <span className="fs-4">car-rentals</span>
        </Link>
        <hr className="text-secondary" />
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
                className="p-3 text-black text-decoration-none"
              >
                <i className="bi bi-people me-3 fs-4"></i>
                <span className="fs-4"></span>
                <strong>Users</strong>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/add-user">
                  Add user
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/view-user">
                  View user{" "}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/delete-user">
                  Delete user
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item p-2">
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                className="p-3 text-black text-decoration-none"
              >
                <i className="bi bi-car-front me-3 fs-4"></i>
                <span className="fs-4"></span>
                <strong>Cars</strong>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/add-car">
                  Add car
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/view-cars">
                  View cars
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/update-car">
                  Update car
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/delete-car">
                  Delete car
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item p-3">
            <Link to="/bookings" className="p-2">
              <i className="bi bi-grid me-3 fs-4"></i>
              <span className="fs-4"></span>
              <strong>Bookings</strong>
            </Link>
          </li>
          <li className="nav-item p-3">
            <a
              href="http://localhost:5173"
              className="p-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-app-indicator me-3 fs-4"></i>
              <span className="fs-4"></span>
              <strong>App</strong>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
