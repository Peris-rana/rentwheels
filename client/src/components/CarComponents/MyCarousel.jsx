/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";

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
    if (!toLocation || !fromLocation) {
      handleError("Location cannot be empty");
      isValid = false;
      return;
    }

    if (!startDate || !endDate || startDate >= endDate) {
      handleError("Please select valid date");
      isValid = false;
      return;
    }
    if (!isValid) {
      return;
    }
    const data = {
      fullName: `${auth.user.firstName} ${auth.user.lastName}`,
      email: auth.user.email,
      car: selectedCar._id,
      user: auth.user._id,
      startDate: startDate,
      endDate: endDate,
      fromLocation: fromLocation,
      toLocation: toLocation,
      rentalPrice: selectedCar.rentalPrice,
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
          <div key={index}>
            <img
              src={`${import.meta.env.VITE_APP_API}/${car.image}`}
              alt={car.model}
              className="carousel-image"
            />
            {/* You can customize the card content based on your car data */}
            <h3 className="fw-bold">{car.model}</h3>
            <p className=" mt-3 car-details">{car.details}</p>
            <p className="fs-5 ">Rs.{car.rentalPrice}</p>
            <p>
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
            </p>
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
            <>
              <img
                src={`${import.meta.env.VITE_APP_API}/${selectedCar.image}`}
                alt={selectedCar.model}
                className="selected-carousel-image"
              />
            </>
          )}
          <Form onSubmit={handleSubmit}>
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
            </Row>

            <Button variant="primary mt-4" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>{" "}
    </>
  );
};

export default MyCarousel;
