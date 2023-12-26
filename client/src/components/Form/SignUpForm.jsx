import Layout from '../Layout/Layout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SignUpForm = () => {
   return (
      <Layout>
         <Row className='mt-5'>
            <p className='font-weight-bold fs-1 '>Sign In</p>
            <Col md={{ span: 6 }}>
               <Form>
                  <Form.Group className='mb-3' controlId=''>
                     <Form.Control
                        className='mb-4'
                        type='text'
                        placeholder='First Name'
                     />
                     <Form.Control
                        className='mb-4'
                        type='date'
                        placeholder=' DOB'
                     />
                     <Form.Control
                        className='mb-4'
                        type='email'
                        placeholder='Email'
                     />
                  </Form.Group>
               </Form>
            </Col>
            <Col md={{ span: 6 }}>
               <Form>
                  <Form.Group className='mb-4' controlId=''>
                     <Form.Control
                        className='mb-4'
                        type='text'
                        placeholder='Last Name'
                     />
                     <Form.Control
                        className='mb-4'
                        type='text'
                        placeholder='Phone Number'
                     />
                     <Form.Control
                        className='mb-4'
                        type='password'
                        placeholder='Password'
                     />
                  </Form.Group>
               </Form>
            </Col>
         </Row>
         <Col md={6}>
            <Button variant='primary' type='submit' className='btn'>
               Submit
            </Button>
         </Col>
      </Layout>
   );
};

export default SignUpForm;
