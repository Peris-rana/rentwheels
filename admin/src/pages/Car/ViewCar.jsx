import { Card, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCar = () => {
   const [carData, setCarData] = useState([]);

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
            console.error('Error fetching car data:', error);
         }
      };
      fetchUserData();
   }, []);
   return (
      <>
         <p className='mt-5 mb-4 fs-5 text-primary'># Cars</p>
         <div>
            <Row xs={1} md={2} lg={3} className='g-2'>
               {carData.map((car, index) => (
                  <Col key={index}>
                     <Card key={index} className='card m-2'>
                        <Card.Img
                           variant='top'
                           src={`${import.meta.env.VITE_APP_API}/${car.image}`}
                           alt={`Car ${index + 1}`}
                           className='card-image'
                        />
                        <Card.Body>
                           <h2>{car.model}</h2>
                           <Card.Text className='text-secondary fs-5'>
                              Rs {car.rentalPrice}
                           </Card.Text>
                           <Card.Text className='custom-td'>
                              car-Id {car._id}
                           </Card.Text>
                           <Card.Text className='car-details'>
                              {car.details}
                           </Card.Text>
                        </Card.Body>
                     </Card>
                  </Col>
               ))}
            </Row>
         </div>
      </>
   );
};

export default ViewCar;
