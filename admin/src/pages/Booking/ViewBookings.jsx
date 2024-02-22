import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
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
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((booking) => (
            <tr key={booking._id}>
              <td> {booking._id}</td>
              <td>
                {" "}
                {booking.user.firstName} {booking.user.lastName}
              </td>
              <td> {booking.user.phoneNumber}</td>
              <td> {booking.car.model}</td>
              <td> {booking.car.rentalPrice}</td>
              <td>{booking.startDate}</td>
              <td>{booking.endDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ViewBookings;
