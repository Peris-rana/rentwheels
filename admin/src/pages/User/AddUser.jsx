import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [file, setFile] = useState('');

   const handleSuccess = (message) => {
      toast.success(message);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      setFile('');
   };
   const handleError = (message) => toast.error(message);

   const handleSubmit = async (e) => {
      e.preventDefault();
      // Handle form submission logic here
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phoneNumber', phoneNumber);
      formData.append('file', file);

      try {
         const response = await axios.post(
            `${import.meta.env.VITE_APP_API}/api/user/register-user`,
            formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            }
         );

         // Check the response
         console.log(response.data.newUser);

         if (response.data.success) {
            // Handle successful registration
            handleSuccess(response.data.message);
         }
      } catch (error) {
         if (axios.isAxiosError(error)) {
            const { response } = error;
            if (response) {
               if (response.status === 400) {
                  handleError(response.data.message);
               } else if (response.status === 500) {
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
         <p className='mt-5 mb-5 fs-5 text-primary'># Add user</p>
         <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <Row>
               <Col md={6}>
                  {/* First Name */}
                  <Form.Group className='mb-4 ' controlId='firstName'>
                     <Form.Label>First Name</Form.Label>
                     <Form.Control
                        className='custom-input-style'
                        type='text'
                        placeholder='Enter first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                     />
                  </Form.Group>

                  {/* Last Name */}
                  <Form.Group className='mb-4' controlId='lastName'>
                     <Form.Label>Last Name</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter last name'
                        className='custom-input-style'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                     />
                  </Form.Group>

                  {/* License */}
                  <Form.Group className='mb-4' controlId='license'>
                     <Form.Label>License</Form.Label>
                     <Form.Control
                        type='file'
                        className='custom-input-style'
                        accept='image/png,image/jpeg,image/jpg/,application/pdf'
                        onChange={(e) => setFile(e.target.files[0])}
                     />
                  </Form.Group>
               </Col>

               <Col md={6}>
                  {/* Email */}
                  <Form.Group className='mb-4' controlId='email'>
                     <Form.Label>Email</Form.Label>
                     <Form.Control
                        type='email'
                        placeholder='Enter email'
                        className='custom-input-style'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className='mb-4' controlId='password'>
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        type='password'
                        placeholder='Enter password'
                        className='custom-input-style'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </Form.Group>

                  {/* Phone Number */}
                  <Form.Group className='mb-4' controlId='phoneNumber'>
                     <Form.Label>Phone Number</Form.Label>
                     <Form.Control
                        type='text'
                        placeholder='Enter phone number'
                        className='custom-input-style'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                     />
                  </Form.Group>
               </Col>
            </Row>

            <Button variant='primary' type='submit' className='btn'>
               Add User
            </Button>
         </form>
         <ToastContainer
            position='top-center'
            pauseOnHover={true}
            hideProgressBar={true}
         />
      </div>
   );
};

export default AddUser;
