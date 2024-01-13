import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const MyCarousel = () => {
   const [carData, setCarData] = useState([]);
   const [selectedCar, setSelectedCar] = useState(null);

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
            console.error('Error fetching car data:', error);
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
   const [show, setShow] = useState(false);
   const handleShow = (car) => {
      setSelectedCar(car);
      setShow(true);
   };
   const handleClose = () => {
      setShow(false);
      setSelectedCar(null);
   };
   return (
      <>
         <Carousel
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={1800}
            removeArrowOnDeviceType={['tablet', 'mobile']}
            containerClass='carousel-container'
            dotListClass='custom-dot-list-style'
            itemClass='carousel-item-padding-40-px'
            infinite={true}
         >
            {carData.map((car, index) => (
               <div key={index}>
                  <img
                     src={`${import.meta.env.VITE_APP_API}/${car.image}`}
                     alt={car.model}
                  />
                  {/* You can customize the card content based on your car data */}
                  <h3 className='fw-bold'>{car.model}</h3>
                  <p>{car.details}</p>
                  <p className='fs-5 '>Rs.{car.rentalPrice}</p>
                  <p>
                     <button
                        className=' btn btn-primary mt-3'
                        onClick={() => {
                           handleShow(car);
                        }}
                     >
                        Rent now
                     </button>
                  </p>
               </div>
            ))}
         </Carousel>
         <Modal show={selectedCar != null}>
            <Modal.Header>
               <Modal.Title>Booking Form</Modal.Title>
               <button
                  type='button'
                  className='btn-close'
                  aria-label='Close'
                  onClick={() => {
                     handleClose();
                  }}
               ></button>
            </Modal.Header>
            <Modal.Body>
               <p>{selectedCar && selectedCar.model}</p>
            </Modal.Body>
         </Modal>{' '}
      </>
   );
};

export default MyCarousel;
