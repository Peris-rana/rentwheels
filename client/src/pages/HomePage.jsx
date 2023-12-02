import Layout from '../components/Layout/Layout';
import herobg from '../assets/hero-bg.png';
import CarImage from '../assets/car-png-16835.png';
import BookingForm from '../components/Form/BookingForm';
import CarCatalogue from '../components/CarComponents/CarCatalogue';

const HomePage = () => {
   return (
      <Layout>
         <div className='hero-parent d-flex justify-content-evenly'>
            <div>
               <p className='hero-title mt-5'>
                  Rent a car-quick and super easy
               </p>
               <BookingForm />
            </div>
            <div className='herobg position-relative w-100'>
               <img src={herobg} className='h-100 w-100 mt-5 ' alt='hero-bg' />
               <img
                  src={CarImage}
                  className='position-absolute car-image '
                  style={{ right: '10%', top: '25%', height: '400px' }}
               />
            </div>
         </div>
         <CarCatalogue />
      </Layout>
   );
};

export default HomePage;
