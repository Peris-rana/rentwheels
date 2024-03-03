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

      handleSuccess("Booking approved");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };
  const deleteBooking = async (bookingId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API}/api/bookings/delete-booking`,
        {
          data: {
            bookingId,
          },
        }
      );
      handleSuccess(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (error) {
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
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Number</th>
            <th>Location</th>
            <th>Start</th>
            <th>Pickup</th>
            <th>Price</th>
            <th>Days </th>
            <th>Total</th>
            <th>Booked</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((booking) => {
            return (
              <tr key={booking._id}>
                {/* <td className="text-success"> {booking._id}</td> */}
                <td>
                  {" "}
                  {booking.user.firstName} {booking.user.lastName}
                </td>
                <td> {booking.user.phoneNumber}</td>
                <td>
                  {booking.fromLocation}- {booking.toLocation}
                </td>
                <td className="text-danger">{formatDate(booking.startDate)}</td>
                <td>{booking.pickUpTime}</td>
                <td> Rs {booking.car.rentalPrice}</td>
                <td>
                  {" "}
                  {getNumberOfDays(booking.startDate, booking.endDate) + 1}
                </td>

                <td>
                  Rs{" "}
                  {(getNumberOfDays(booking.startDate, booking.endDate) + 1) *
                    booking.car.rentalPrice}
                </td>
                <td>{booking.booked.toString()}</td>
                <td>
                  <img
                    height={80}
                    src={`${import.meta.env.VITE_APP_API}/${booking.car.image}`}
                  />
                </td>
                <td>
                  {!booking.booked && (
                    <Button
                      className="btn btn-success p-2 bi bi-check2-circle"
                      onClick={() => {
                        acceptBooking(booking.user._id, booking._id);
                      }}
                    ></Button>
                  )}
                </td>
                <td>
                  <Button
                    className="btn m-0 p-2 btn-danger bi bi-trash-fill"
                    onClick={() => {
                      deleteBooking(booking._id);
                    }}
                  ></Button>
                </td>
              </tr>
            );
          })}
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

function getNumberOfDays(startDate, endDate) {
  // Convert start and end dates to Unix timestamps
  console.log(typeof startDate);
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

export default ViewBookings;
