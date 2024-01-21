import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
const ViewUser = () => {
   const [userData, setUserData] = useState([]);

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const response = await axios.get(
               `${import.meta.env.VITE_APP_API}/api/user/get-user`
            ); // Replace 'your-api-endpoint' with your actual API endpoint
            if (Array.isArray(response.data.user)) {
               setUserData(response.data.user);
            }
         } catch (error) {
            console.error('Error fetching car data:', error);
         }
      };
      fetchUserData();
   }, []);

   return (
      <>
         <p className='mt-5 mb-5 fs-5 text-primary'># Users</p>
         <Table hover>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Phone Number</th>
               </tr>
            </thead>
            <tbody>
               {userData.map((user) => (
                  <tr key={user.email}>
                     <td>{user._id}</td>
                     <td>{`${user.firstName} ${user.lastName}`}</td>
                     <td>{user.email}</td>
                     <td>{user.plainPassword}</td>
                     <td>{user.phoneNumber}</td>
                  </tr>
               ))}
            </tbody>
         </Table>
      </>
   );
};

export default ViewUser;
