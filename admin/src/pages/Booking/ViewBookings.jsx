import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const handleSuccess = (message) => {
  toast.success(message);
};
const handleError = (message) => {
  toast.error(message);
};
const ViewBookings = () => {
  const [bookingData, setBookingData] = useState([]);
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/api/bookings/get-booking`
        );

        if (Array.isArray(response.data.booking)) {
          setBookingData(response.data.booking);
          console.log(response.data.booking);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookingData();
  }, []);
  const acceptBooking = async (userId, bookingId) => {
    console.log(localStorage.getItem("auth"));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/bookings/accept-booking`,

        {
          bookingId,
          userId,
        }
      );
      console.log("Booked");
      console.log(response.data);
      handleSuccess("Booking aproved");
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format the date string
  };

  return (
    <>
      <p className="mt-5 mb-5 fs-5 text-primary"># Bookings</p>
      <Table hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Number</th>
            <th>Model</th>
            <th>Price</th>
            <th>Location</th>
            <th>Start</th>
            <th>End</th>
            <th>booked</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((booking) => (
            <tr key={booking._id}>
              <td className="text-success"> {booking._id}</td>
              <td>
                {" "}
                {booking.user.firstName} {booking.user.lastName}
              </td>
              <td> {booking.user.phoneNumber}</td>
              <td> {booking.car.model}</td>
              <td> Rs {booking.car.rentalPrice}</td>
              <td>
                {booking.fromLocation}- {booking.toLocation}
              </td>
              <td className="text-danger">{formatDate(booking.startDate)}</td>
              <td className="text-danger">{formatDate(booking.endDate)}</td>
              <td>{booking.booked.toString()}</td>
              <Button
                className="btn btn-secondary"
                onClick={() => {
                  acceptBooking(booking.user._id, booking._id);
                }}
              >
                accept
              </Button>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer
        position="top-center"
        pauseOnHover={true}
        hideProgressBar={true}
      />{" "}
    </>
  );
};

export default ViewBookings;
