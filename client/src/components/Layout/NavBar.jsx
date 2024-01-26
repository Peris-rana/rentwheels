import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../../context/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NavBar() {
   const [auth, setAuth] = useAuth();

   const handleLogout = () => {
      toast.success('Logout successful');
      localStorage.removeItem('auth');
      setTimeout(() => {
         setAuth({ ...auth, user: null, token: '' });
      }, 0);
   };

   return (
      <>
         <Navbar collapseOnSelect expand='lg' className=''>
            <Container className='bg-white p-0  m-0'>
               <Navbar.Brand href='home' className='extra-bold'>
                  CarRentals
               </Navbar.Brand>
               <Navbar.Toggle
                  aria-controls='responsive-navbar-nav'
                  className='custom-toggle p-0'
               />
               <Navbar.Collapse id='responsive-navbar-nav'>
                  <Nav className='me-auto '>
                     <Nav.Link href='home'>Home</Nav.Link>
                     <Nav.Link href='bookings'>Bookings</Nav.Link>
                  </Nav>
                  <Nav>
                     {!auth.user ? (
                        <>
                           <Nav.Link href='login'>Login</Nav.Link>
                           <Nav.Link
                              eventKey={2}
                              style={{ color: '#ff7377' }}
                              href='signup'
                           >
                              Signup
                           </Nav.Link>
                        </>
                     ) : (
                        <>
                           <span className='p-2 rounded-circle text-danger'>
                              {auth.user.firstName}
                           </span>
                           <Nav.Link href='/' onClick={handleLogout}>
                              Logout
                           </Nav.Link>
                        </>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
         <ToastContainer
            position='top-center'
            pauseOnHover={true}
            hideProgressBar={true}
         />
      </>
   );
}

export default NavBar;
