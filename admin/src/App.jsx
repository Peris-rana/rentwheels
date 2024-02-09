import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import AddCar from "./pages/Car/AddCar";
import UpdateCar from "./pages/Car/UpdateCar";
import AddUser from "./pages/User/AddUser";
import ViewUser from "./pages/User/ViewUser";
import DeleteUser from "./pages/User/DeleteUser";
import DeleteCar from "./pages/Car/DeleteCar";
import ViewCar from "./pages/Car/ViewCar";
const App = () => {
  return (
    <div className="d-flex">
      <div className="w-auto">
        <Dashboard />
        <a
          href="http://localhost:5173"
          className="p-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="custom-app-button">
            <i className="bi bi-app-indicator me-1 fs-5" />
            App
          </button>
        </a>
      </div>
      <div className="col m-2 p-2 imp-layout">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <div className="title">
                  Welcome to the admin &nbsp;
                  <img
                    src="../src/assets/car-svgrepo-com.svg"
                    height="300px"
                    width="300px"
                    alt=""
                  />
                </div>
              </>
            }
          />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/view-user" element={<ViewUser />} />
          <Route path="/delete-user" element={<DeleteUser />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/view-cars" element={<ViewCar />} />
          <Route path="/update-car" element={<UpdateCar />} />
          <Route path="/delete-car" element={<DeleteCar />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
