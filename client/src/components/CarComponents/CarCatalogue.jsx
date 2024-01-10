import MyCarousel from './MyCarousel';

const CarCatalogue = () => {
   return (
      <>
         <h1
            style={{
               marginTop: '190px',
               fontSize: '2.25em',
               fontWeight: '800',
            }}
         >
            Car Catalogue
         </h1>
         <div className='mt-5'>
            <MyCarousel />
         </div>
      </>
   );
};

export default CarCatalogue;
