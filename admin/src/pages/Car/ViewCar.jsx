import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const handleSuccess = (message) => {
  toast.success(message);
};
const handleError = (message) => {
  toast.error(message);
};
const ViewCar = () => {
  const [carData, setCarData] = useState([]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [carIdToDelete, setCarIdToDelete] = useState(null);
  const handleDeleteClick = (carId) => {
    setCarIdToDelete(carId);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    // Call the deleteCar function here
    deleteUser(carIdToDelete);
    // Close the confirmation modal
    setShowConfirmation(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/api/car/get-car`
        ); // Replace 'your-api-endpoint' with your actual API endpoint
        if (Array.isArray(response.data.car)) {
          setCarData(response.data.car);
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchUserData();
  }, []);
  const deleteUser = async (carId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/api/car/delete-car`,
        {
          data: {
            carId,
          },
        }
      );
      handleSuccess(response.data.message);

      setTimeout(() => {
        window.location.reload();
      }, 900);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      <p className="mt-5 mb-4 fs-5 text-primary"># Cars</p>
      <div>
        <Row xs={1} md={2} lg={3} className="g-2">
          {carData.map((car, index) => (
            <Col key={index}>
              <Card key={index} className="card">
                <Card.Img
                  variant="top"
                  src={`${import.meta.env.VITE_APP_API}/${car.image}`}
                  alt={`Car ${index + 1}`}
                  className="card-image"
                />
                <Card.Body>
                  <h2>{car.model}</h2>
                  <i className="bi bi-person p-1"></i>
                  {car.seats}
                  <i
                    className=" bi bi-fuel-pump"
                    style={{ marginLeft: "40px", paddingRight: "2px" }}
                  ></i>
                  {car.mileage}
                  km/l
                  <Card.Text className="text-secondary fs-5">
                    Rs {car.rentalPrice}
                  </Card.Text>
                  <Card.Text className="custom-td">car-Id {car._id}</Card.Text>
                  <Card.Text className="car-details">{car.details}</Card.Text>
                </Card.Body>
              </Card>
              <div className="m-4">
                <Button
                  className="btn p-2 btn-danger bi bi-trash-fill "
                  onClick={() => {
                    handleDeleteClick(car._id);
                  }}
                ></Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this car?</Modal.Body>
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

export default ViewCar;
