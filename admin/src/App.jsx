import Dashboard from './components/Dashboard';
import { Routes, Route } from 'react-router-dom';
import AddCar from './pages/Car/AddCar';

const App = () => {
   return (
      <div className='d-flex'>
         <div className='w-auto'>
            <Dashboard />
         </div>
         <div className='col m-2 p-2 imp-layout'>
            <Routes>
               <Route path='/add-car' element={<AddCar />} />
            </Routes>
         </div>
      </div>
   );
};

export default App;
