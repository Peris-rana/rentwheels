import axios from "axios";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteBooking = () => {
  const [BookingId, setBookingId] = useState("");
  const handleSuccess = (message) => {
    toast.success(message);
    setBookingId("");
  };
  console.log(BookingId);
  const handleError = (message) => toast.error(message);
  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_APP_API
        }/api/bookings/delete-booking/${BookingId}`
      );
      console.log(response.data);
      if (response.status === 200) {
        handleSuccess(response.data.message);
      }
    } catch (error) {
      handleError("Add an id ");
    }
  };
  return (
    <>
      <p className="mt-5 mb-5 fs-5 text-primary"># Delete booking</p>
      <Col md={8}>
        <Form.Control
          value={BookingId}
          className="custom-input-style"
          onChange={(e) => {
            setBookingId(e.target.value);
          }}
        />
      </Col>
      <Button onClick={handleDeleteUser} className="mt-2">
        Delete
      </Button>
      <ToastContainer
        position="top-center"
        pauseOnHover={true}
        hideProgressBar={true}
      />
    </>
  );
};

export default DeleteBooking;
