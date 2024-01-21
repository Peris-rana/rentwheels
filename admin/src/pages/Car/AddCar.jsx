import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCar = () => {
   const [model, setModel] = useState('');
   const [details, setDetails] = useState('');
   const [rentalPrice, setRentalPrice] = useState('');
   const [file, setFile] = useState('');

   const handleSuccess = (message) => {
      toast.success(message);
      setModel('');
      setDetails('');
      setRentalPrice('');
      setFile('');
   };
   const handleError = (message) => toast.error(message);
   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('model', model);
      formData.append('details', details);
      formData.append('rentalPrice', rentalPrice);
      formData.append('file', file);

      try {
         const response = await axios.post(
            `${import.meta.env.VITE_APP_API}/api/car/add-car`,
            formData
         );
         console.log(response.data.car);
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
                  handleError(response.error.message);
               }
            } else {
               handleError('Check your details again');
            }
         }
      }
   };
   return (
      <div>
         <p className='mt-5 mb-5 fs-5 text-primary'># Add car</p>
         <Form onSubmit={handleSubmit}>
            <Row>
               <Col md={6}>
                  <Form.Group className='mb-3' controlId='model'>
                     <Form.Label>Model</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter car model'
                        name='model'
                        className='custom-input-style'
                        value={model}
                        onChange={(e) => {
                           setModel(e.target.value);
                        }}
                     />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='car image'>
                     <Form.Label>Image</Form.Label>
                     <Form.Control
                        type='file'
                        placeholder='Document'
                        className='custom-input-style'
                        accept='image/png,image/jpeg,image/jpg/'
                        onChange={(e) => {
                           setFile(e.target.files[0]);
                        }}
                     />
                  </Form.Group>
               </Col>
               <Col md={6}>
                  <Form.Group className='mb-3' controlId='details'>
                     <Form.Label>Details</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter car details'
                        name='details'
                        className='custom-input-style'
                        value={details}
                        onChange={(e) => {
                           setDetails(e.target.value);
                        }}
                     />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='rental price'>
                     <Form.Label>Price</Form.Label>
                     <Form.Control
                        type='number'
                        placeholder='Enter car rental price'
                        name='rental price'
                        className='custom-input-style'
                        value={rentalPrice}
                        onChange={(e) => {
                           setRentalPrice(e.target.value);
                        }}
                     />
                  </Form.Group>
               </Col>
            </Row>
            <Button variant='primary' type='submit'>
               Add Car
            </Button>
         </Form>
         <ToastContainer
            position='top-center'
            pauseOnHover={true}
            hideProgressBar={true}
         />{' '}
      </div>
   );
};

export default AddCar;
