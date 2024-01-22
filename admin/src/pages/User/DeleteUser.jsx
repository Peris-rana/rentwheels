import axios from 'axios';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteUser = () => {
   const [userId, setUserId] = useState('');
   const handleSuccess = (message) => {
      toast.success(message);
      setUserId('');
   };
   const handleError = (message) => toast.error(message);
   const handleDeleteUser = async () => {
      try {
         const response = await axios.delete(
            `${import.meta.env.VITE_APP_API}/api/user/delete-user/${userId}`
         );

         if (response.status === 200) {
            handleSuccess(response.data.message);
         }
      } catch (error) {
         handleError('Add an id ');
      }
   };
   return (
      <>
         <p className='mt-5 mb-5 fs-5 text-primary'># Delete user</p>
         <Col md={8}>
            <Form.Control
               className='custom-input-style'
               value={userId}
               onChange={(e) => {
                  setUserId(e.target.value);
               }}
            />
         </Col>
         <Button onClick={handleDeleteUser} className='mt-2'>
            Delete
         </Button>
         <ToastContainer
            position='top-center'
            pauseOnHover={true}
            hideProgressBar={true}
         />
      </>
   );
};

export default DeleteUser;
