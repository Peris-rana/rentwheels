import 'bootstrap-icons/font/bootstrap-icons.css';
const Sidebar = () => {
   return (
      <div className='d-flex justify-content-between flex-column  p-3  vh-100 sidebar'>
         <div>
            <a href='' className='p-3'>
               <i className='bi bi-car-front-fill fs-4 me-4'></i>
               <span className='fs-4'>car-rentals</span>
            </a>
            <hr className='text-secondary' />
            <ul className='nav nav-pills flex-column mt-2'>
               <li className='nav-item p-3'>
                  <a href='' className='p-3'>
                     <i className='bi bi-speedometer2 me-3 fs-4'></i>
                     <span className='fs-4'></span>
                     <strong>Dashboard</strong>
                  </a>
               </li>
               <li className='nav-item p-3'>
                  <a href='' className='p-3'>
                     <i className='bi bi-people me-3 fs-4 '></i>
                     <span className='fs-4'></span>
                     <strong>Users</strong>
                  </a>
               </li>
               <li className='nav-item p-3'>
                  <a href='' className='p-3'>
                     <i className='bi bi-car-front-fill me-3 fs-4'></i>
                     <span className='fs-4'></span>
                     <strong>Cars</strong>
                  </a>
               </li>
               <li className='nav-item p-3'>
                  <a href='' className='p-3'>
                     <i className='bi bi-grid me-3 fs-4'></i>
                     <span className='fs-4'></span>
                     <strong>Bookings</strong>
                  </a>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default Sidebar;
