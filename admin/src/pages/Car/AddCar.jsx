import { Form, Button, Row, Col } from 'react-bootstrap';

const AddCar = () => {
   const handleSubmit = (e) => {
      e.preventDefault();
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
                     />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='car image'>
                     <Form.Label>Image</Form.Label>
                     <Form.Control
                        type='file'
                        placeholder='Document'
                        className='custom-input-style'
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
                     />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='rental price'>
                     <Form.Label>Price</Form.Label>
                     <Form.Control
                        type='number'
                        placeholder='Enter car rental price'
                        name='rental price'
                        className='custom-input-style'
                     />
                  </Form.Group>
               </Col>
            </Row>
         </Form>

         <Button variant='primary' type='submit'>
            Add Car
         </Button>
      </div>
   );
};

export default AddCar;
