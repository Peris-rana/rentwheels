import { useState } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function BookingForm() {
   const [lgShow, setLgShow] = useState(false);
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());
   const [fromLocation, setFromLocation] = useState('');
   const [toLocation, setToLocation] = useState('');

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

   const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
      console.log('From Location:', fromLocation);
      console.log('To Location:', toLocation);
      setLgShow(false); // Close the modal after submission
   };

   return (
      <>
         <Button onClick={() => setLgShow(true)}>Book Now</Button>

         <Modal
            size='lg'
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby='modal-sizes-title'
         >
            <Modal.Header closeButton>
               <Modal.Title id='modal-sizes-title-lg'>Booking Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form onSubmit={handleSubmit}>
                  <Row>
                     <Col>
                        <Form.Group controlId='formFromLocation'>
                           <Form.Label>From</Form.Label>
                           <Form.Control
                              type='text'
                              placeholder='Enter location'
                              value={fromLocation}
                              onChange={handleFromLocationChange}
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId='formToLocation'>
                           <Form.Label>To</Form.Label>
                           <Form.Control
                              type='text'
                              placeholder='Enter location'
                              value={toLocation}
                              onChange={handleToLocationChange}
                           />
                        </Form.Group>
                     </Col>
                  </Row>

                  <Row>
                     <Col>
                        <Form.Group controlId='formStartDate'>
                           <Form.Label>Start Date</Form.Label>
                           <DatePicker
                              selected={startDate}
                              onChange={handleStartDateChange}
                              className='form-control'
                              dateFormat='MM/dd/yyyy'
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId='formEndDate'>
                           <Form.Label>End Date</Form.Label>
                           <DatePicker
                              selected={endDate}
                              onChange={handleEndDateChange}
                              className='form-control'
                              dateFormat='MM/dd/yyyy'
                           />
                        </Form.Group>
                     </Col>
                  </Row>

                  <Button variant='primary mt-4' type='submit'>
                     Submit
                  </Button>
               </Form>
            </Modal.Body>
         </Modal>
      </>
   );
}

export default BookingForm;
