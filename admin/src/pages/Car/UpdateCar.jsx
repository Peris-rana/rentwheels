import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UpdateCar = () => {
  const [_id, setCarId] = useState("");
  const [model, setModel] = useState("");
  const [details, setDetails] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [file, setFile] = useState("");
  const [seats, setSeats] = useState("");
  const [door, setDoor] = useState("");

  const handleSuccess = (message) => {
    toast.success(message);
    setCarId("");
    setModel("");
    setDetails("");
    setRentalPrice("");
    setFile("");
  };

  const handleError = (message) => toast.error(message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("model", model);
    formData.append("details", details);
    formData.append("rentalPrice", rentalPrice);
    formData.append("file", file);
    formData.append("seats", seats);
    formData.append("door", door);

    //display the data in the console
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API}/api/car/update-car`,
        formData
      );
      if (response.status === 200) {
        handleSuccess(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
          if (response.status === 500) {
            handleError(response.data.message);
          } else {
            handleError(response.data.message);
          }
        } else {
          handleError("Check your details again");
        }
      }
    }
  };
  return (
    <div>
      <p className="mt-5 mb-5 fs-5 text-primary"># Update car</p>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          <Form.Group controlId="_id">
            <Form.Label>Car ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter car id"
              name="_id"
              className="custom-input-style mb-3"
              value={_id}
              onChange={(e) => {
                setCarId(e.target.value);
              }}
            />
          </Form.Group>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="model">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter car model"
                name="model"
                className="custom-input-style"
                value={model}
                onChange={(e) => {
                  setModel(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="model">
              <Form.Label>Seats</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter number of seats"
                name="model"
                className="custom-input-style"
                value={seats}
                onChange={(e) => {
                  setModel(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="car image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                key={file}
                type="file"
                placeholder="Document"
                className="custom-input-style"
                accept="image/png,image/jpeg,image/jpg/"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="details">
              <Form.Label>Details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter car details"
                name="details"
                className="custom-input-style"
                value={details}
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="door">
              <Form.Label>Doors</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter number of doors"
                name="model"
                className="custom-input-style"
                value={door}
                onChange={(e) => {
                  setModel(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="rental price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter car rental price"
                name="rental price"
                className="custom-input-style"
                value={rentalPrice}
                onChange={(e) => {
                  setRentalPrice(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Update Car
        </Button>
      </Form>
      <ToastContainer
        position="top-center"
        pauseOnHover={true}
        hideProgressBar={true}
      />{" "}
    </div>
  );
};

export default UpdateCar;
