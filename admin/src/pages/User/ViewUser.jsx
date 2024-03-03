import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const handleSuccess = (message) => {
  toast.success(message);
};
const handleError = (message) => {
  toast.error(message);
};
const ViewUser = () => {
  const [userData, setUserData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const handleDeleteClick = (userId) => {
    setUserIdToDelete(userId);
    setShowConfirmation(true);
  };
  const confirmDelete = () => {
    deleteUser(userIdToDelete);
    setShowConfirmation(false);
    deleteUser;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/api/user/get-user`
        );
        if (Array.isArray(response.data.user)) {
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchUserData();
  }, []);

  //delete the user
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/api/user/delete-user`,
        { data: { userId } }
      );
      window.location.reload();
      handleSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <p className="mt-5 mb-5 fs-5 text-primary"># Users</p>
      <Table hover>
        <thead>
          <tr key={1}>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone Number</th>
            <th>Document Image</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user._id}>
              <td className="text-capitalize">{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>{user.plainPassword}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <div className="img-container">
                  <img
                    src={`${import.meta.env.VITE_APP_API}/${user.licenseFile}`}
                    alt={user.licenseFile}
                  />
                </div>
              </td>
              <td>
                <Button
                  className="btn m-0 p-2 btn-danger bi bi-trash-fill"
                  onClick={() => {
                    handleDeleteClick(user._id);
                  }}
                ></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-center"
        pauseOnHover={true}
        hideProgressBar={true}
      />{" "}
    </>
  );
};

export default ViewUser;
