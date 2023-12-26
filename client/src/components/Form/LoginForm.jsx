import Layout from '../Layout/Layout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LoginForm = () => {
   return (
      <Layout>
         <Row className='mt-5'>
            <Col md={{ span: 6 }}>
               <Form>
                  <p className='font-weight-bold fs-1'>Log In</p>
                  <Form.Group className='mb-4' controlId='formBasicEmail'>
                     <Form.Control
                        className='mb-4'
                        type='email'
                        placeholder='Email'
                     />
                  </Form.Group>
                  <Form.Group className='mb-4' controlId='formBasicPassword'>
                     <Form.Control
                        className='mb-4'
                        type='password'
                        placeholder='Password'
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
