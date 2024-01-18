import { Form, Button } from 'react-bootstrap';

const AddCar = () => {
   const handleSubmit = (e) => {
      e.preventDefault();
   };
   return (
      <div>
         <p className='mt-5 mb-5 fs-5 text-primary'># Add car</p>

         <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='model'>
               <Form.Label>Model</Form.Label>
               <Form.Control
                  type='text'
                  placeholder='Enter car model'
                  name='model'
               />
            </Form.Group>
            <Form.Group className='mb-3' controlId='car image'>
               <Form.Label>Image</Form.Label>
               <Form.Control type='file' placeholder='Document' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='details'>
               <Form.Label>Details</Form.Label>
               <Form.Control
                  type='text'
                  placeholder='Enter car details'
                  name='details'
               />
            </Form.Group>

            <Form.Group className='mb-3' controlId='rental price'>
               <Form.Label>Price</Form.Label>
               <Form.Control
                  type='number'
                  placeholder='Enter car rental price'
                  name='rental price'
               />
            </Form.Group>

            <Button variant='primary' type='submit'>
               Add Car
            </Button>
         </Form>
      </div>
   );
};

export default AddCar;
