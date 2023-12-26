import Sidebar from './components/Sidebar';
const App = () => {
   return (
      <div className='d-flex'>
         <div className='w-auto'>
            <Sidebar />
         </div>
         <div className='col'></div>
      </div>
   );
};

export default App;
