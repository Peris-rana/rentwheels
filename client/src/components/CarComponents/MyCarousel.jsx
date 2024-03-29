/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

const MyCarousel = () => {
  const [carData, setCarData] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useAuth();

  //success
  const handleSuccess = (message) => {
    toast.success(message);
    setStartDate(new Date());
    setEndDate(new Date());
    setFromLocation("");
    setToLocation("");
  };
  //error
  const handleError = (message) => {
    toast.error(message);
  };
  //form submission
  //send  form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    if (
      !toLocation ||
      !fromLocation ||
      !isNaN(fromLocation) ||
      !isNaN(toLocation)
    ) {
      handleError("Location cannot be empty and must not be a number");
      isValid = false;
      return;
    }
    if (toLocation == fromLocation) {
      handleError("Locations must be  different");
      return;
    }

    if (!startDate || !endDate || startDate > endDate) {
      handleError("Please select valid date");
      isValid = false;
      return;
    }
    if (!isValid) {
      return;
    }
    // Get the pick-up time and drop-off time from the DatePickers
    // const pickUpTime = startDate.getHours() + ":" + startDate.getMinutes();
    // const dropOffTime = endDate.getHours() + ":" + endDate.getMinutes();

    const pickUpTime = `${startDate.getHours()}:${
      startDate.getMinutes() < 10 ? "0" : ""
    }${startDate.getMinutes()}`;
    const dropOffTime = `${endDate.getHours()}:${
      endDate.getMinutes() < 10 ? "0" : ""
    }${endDate.getMinutes()}`;

    const data = {
      car: selectedCar._id,
      user: auth.user._id,
      startDate: startDate,
      endDate: endDate,
      fromLocation: fromLocation,
      toLocation: toLocation,
      pickUpTime: pickUpTime,
      dropOffTime: dropOffTime,
    };
    console.log(data);
    try {
      const bookingData = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/bookings/add-booking`,
        data
      );
      if (bookingData.status === 200) {
        handleSuccess(bookingData.data.message);
      }
    } catch (error) {
      console.log(error);
    }

    handleClose();
    window.location.reload();
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleFromLocationChange = (e) => {
    setFromLocation(e.target.value);
  };

  const handleToLocationChange = (e) => {
    setToLocation(e.target.value);
  };
  const handleShow = (car) => {
    setSelectedCar(car);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setSelectedCar(null);
  };

  useEffect(() => {
    // Fetch car data from your API
    const fetchCarData = async () => {
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

    fetchCarData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={1800}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        infinite={true}
      >
        {carData.map((car, index) => (
          <div key={index} className="m-3">
            <img
              src={`${import.meta.env.VITE_APP_API}/${car.image}`}
              alt={car.model}
              className="carousel-image"
            />
            {/* You can customize the card content based on your car data */}
            <h3 className="fw-bold text-capitalize">{car.model}</h3>
            <h6>Specification</h6>
            <i className="bi bi-person p-1"></i>
            {car.seats}
            <i
              className=" bi bi-fuel-pump"
              style={{ marginLeft: "40px", paddingRight: "2px" }}
            ></i>
            {car.mileage}
            km/l
            <h6 className="mt-3">Features</h6>
            <p className=" mt-3 car-details">{car.details}</p>
            <p className="fs-5 mt-3">Rs.{car.rentalPrice}</p>
            <div>
              {car.available ? (
                <button
                  className=" btn btn-primary "
                  onClick={() => {
                    if (auth.user) {
                      handleShow(car);
                    } else {
                      toast.error("Login or signup to rent");
                    }
                  }}
                >
                  Rent now
                </button>
              ) : (
                <p className="text-danger fs-4  rotate">Not Available </p>
              )}
            </div>
          </div>
        ))}
      </Carousel>
      <Modal size="lg" show={selectedCar != null}>
        <Modal.Header>
          <Modal.Title>Booking Form</Modal.Title>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => {
              handleClose();
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <p className="fs-5 extra-bold">{selectedCar && selectedCar.model}</p>
          {selectedCar && (
            <div className="d-flex justify-content-center align-items-center spec">
              <img
                src={`${import.meta.env.VITE_APP_API}/${selectedCar.image}`}
                alt={selectedCar.model}
                className="selected-carousel-image"
              />
              <div className="m-2">
                <i className="bi bi-person m-1 p-1"></i>
                {selectedCar.seats}
                <i
                  className=" bi bi-fuel-pump p-1"
                  style={{
                    marginLeft: "40px",
                    paddingRight: "2px",
                  }}
                ></i>
                {selectedCar.mileage}
                km/l
                <div className="m-2">
                  <p>{selectedCar.details}</p>
                </div>
              </div>
            </div>
          )}
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Row>
              <Col>
                <Form.Group controlId="formFromLocation">
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={fromLocation}
                    onChange={handleFromLocationChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formToLocation">
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={toLocation}
                    onChange={handleToLocationChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="mt-3">
                <Form.Group controlId="formPickUpDate">
                  <Form.Label>Start Date (pickup time )</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    className="form-control"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeSelect
                    timeFormat="h:mm aa"
                    timeIntervals={15}
                    timeCaption="Time"
                    placeholderText="Select pick-up date and time"
                    timeInputLabel="Time:"
                  />
                </Form.Group>
              </Col>
              <Col className="mt-3">
                <Form.Group controlId="formDropOffDate">
                  <Form.Label>End Date (dropoff time )</Form.Label>
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    className="form-control"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeSelect
                    timeFormat="h:mm aa"
                    timeIntervals={15}
                    timeCaption="Time"
                    placeholderText="Select pick-up date and time"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* <Col className="mt-3">
                <Form.Group controlId="formStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    className="form-control"
                    dateFormat="MM/dd/yyyy"
                  />
                </Form.Group>
              </Col>
              <Col className="mt-3">
                <Form.Group controlId="formEndDate">
                  <Form.Label>End Date</Form.Label>
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    className="form-control"
                    dateFormat="MM/dd/yyyy"
                  />
                </Form.Group>
              </Col>
            </Row> */}

            <Button variant="primary mt-4" type="submit">
              Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>{" "}
    </>
  );
};

export default MyCarousel;
