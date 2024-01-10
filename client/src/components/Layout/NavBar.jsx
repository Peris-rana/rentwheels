import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
   return (
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
                  <NavDropdown title='Dropdown' id='collapsible-nav-dropdown'>
                     <NavDropdown.Item href='#action/3.1'>
                        Action
                     </NavDropdown.Item>
                     <NavDropdown.Item href='#action/3.2'>
                        Another action
                     </NavDropdown.Item>
                     <NavDropdown.Item href='#action/3.3'>
                        Something
                     </NavDropdown.Item>
                     <NavDropdown.Divider />
                     <NavDropdown.Item href='#action/3.4'>
                        Separated link
                     </NavDropdown.Item>
                  </NavDropdown>
               </Nav>
               <Nav>
                  <Nav.Link href='login'>Login</Nav.Link>
                  <Nav.Link
                     eventKey={2}
                     style={{ color: '#ff7377' }}
                     href='signup'
                  >
                     Signup
                  </Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default NavBar;
