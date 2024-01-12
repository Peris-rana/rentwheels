import Layout from '../Layout/Layout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import axios from 'axios';
const LoginForm = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post(
            `${import.meta.env.VITE_APP_API}/api/user/login-user`,
            {
               email,
               password,
            }
         );
         if (response.data.success) {
            alert('Login successful');
         } else {
            alert('Error in login');
         }
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <Layout>
         <Row className='mt-5'>
            <Col md={{ span: 6 }}>
               <Form onSubmit={handleSubmit}>
                  <p className='font-weight-bold fs-1 extra-bold'>Log In</p>
                  <Form.Group className='mb-4' controlId='formBasicEmail'>
                     <Form.Control
                        className='mb-4'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => {
                           setEmail(e.target.value);
                        }}
                     />
                  </Form.Group>
                  <Form.Group className='mb-4' controlId='formBasicPassword'>
                     <Form.Control
                        className='mb-4'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => {
                           setPassword(e.target.value);
                        }}
                     />
                  </Form.Group>
                  <Button variant='primary' className='btn' type='submit'>
                     Submit
                  </Button>
               </Form>
            </Col>
         </Row>
      </Layout>
   );
};

export default LoginForm;
