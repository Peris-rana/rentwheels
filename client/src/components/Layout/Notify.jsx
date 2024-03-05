import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handleSuccess = (message) => {
  toast.success(message);
};

function getNumberOfDays(startDate, endDate) {
  // Convert start and end dates to Unix timestamps
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  const startTimestamp = startDate.getTime(); // getTime() returns the timestamp in milliseconds
  const endTimestamp = endDate.getTime();
  // Calculate the difference in milliseconds
  const difference = endTimestamp - startTimestamp;

  // Convert milliseconds to days
  const millisecondsPerDay = 1000 * 60 * 60 * 24; // 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const numberOfDays = Math.floor(difference / millisecondsPerDay);
  return numberOfDays;
}
function Notify() {
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  const cancelBooking = () => {
    handleSuccess("Cancel request processing");
  };
  return (
    <>
      <i
        onClick={handleShow}
        className="bi bi-bell cursor-pointer p-2 bell"
      ></i>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>Notifications</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {notifications.map((data) => {
            return (
              <div key={data._id}>
                <strong key={data._id}>{data.message}</strong>
                <img
                  style={{
                    objectFit: "contain",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                  src={`${import.meta.env.VITE_APP_API}/${
                    data.booking.car.image
                  }`}
                  alt={data.booking.car.model}
                />
                <p>
                  You have successfully booked a car for{" "}
                  <strong>
                    {getNumberOfDays(
                      data.booking.startDate,
                      data.booking.endDate
                    ) + 1}{" "}
                  </strong>
                  days whose model is
                  <strong> {data.booking.car.model} </strong>
                  {""}
                  for your trip. The total cost for the booking is{" "}
                  <strong>
                    Rs{" "}
                    {(getNumberOfDays(
                      data.booking.startDate,
                      data.booking.endDate
                    ) +
                      1) *
                      data.booking.car.rentalPrice}
                  </strong>
                  . You are traveling from{" "}
                  <strong> {data.booking.fromLocation} </strong>
                  to
                  <strong> {data.booking.toLocation} </strong>. The pickup time
                  for your journey is
                  <strong> {data.booking.pickUpTime} </strong>
                  at the location
                  <strong> {data.booking.fromLocation}</strong>
                </p>
              </div>
            );
          })}
          <p className="text-secondary">
            if you wish to cancel the booking click on cancel.
            <span className="d-block fw-bold text-danger">
              {" "}
              NOTE !!!This action cannot be undone
            </span>
          </p>
          <Button className="btn btn-danger w-100" onClick={cancelBooking}>
            CANCEL
          </Button>
        </Modal.Body>
      </Modal>
      <ToastContainer
        position="top-center"
        pauseOnHover={true}
        hideProgressBar={true}
      />
    </>
  );
}

export default Notify;
//sum of two numbers
