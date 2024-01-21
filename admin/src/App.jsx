import Dashboard from './components/Dashboard';
import { Routes, Route } from 'react-router-dom';
import AddCar from './pages/Car/AddCar';
import UpdateCar from './pages/Car/UpdateCar';
import AddUser from './pages/User/AddUser';
import ViewUser from './pages/User/ViewUser';
import DeleteUser from './pages/User/DeleteUser';
import DeleteCar from './pages/Car/DeleteCar';
import ViewCar from './pages/Car/ViewCar';
const App = () => {
   return (
      <div className='d-flex'>
         <div className='w-auto'>
            <Dashboard />
         </div>
         <div className='col m-2 p-2 imp-layout'>
            <Routes>
               <Route
                  path='/'
                  element={
                     <>
                        {' '}
                        <div className='m-4 title'>WELCOME TO THE ADMIN</div>
                        <img src='' alt='' />
                     </>
                  }
               />
               <Route path='/add-user' element={<AddUser />} />
               <Route path='/view-user' element={<ViewUser />} />
               <Route path='/delete-user' element={<DeleteUser />} />
               <Route path='/add-car' element={<AddCar />} />
               <Route path='/view-cars' element={<ViewCar />} />
               <Route path='/update-car' element={<UpdateCar />} />
               <Route path='/delete-car' element={<DeleteCar />} />
            </Routes>
         </div>
      </div>
   );
};

export default App;
