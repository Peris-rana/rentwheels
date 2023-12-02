import LoginForm from './components/Form/LoginForm';
import SignUpForm from './components/Form/SignUpForm';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
const App = () => {
   return (
      <>
         <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignUpForm />} />
         </Routes>
      </>
   );
};

export default App;
