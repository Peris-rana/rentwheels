import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
const Layout = ({ children }) => {
   return (
      <>
         <main>
            <Sidebar />
            {children}
         </main>
      </>
   );
};
Layout.propTypes = {
   children: PropTypes.node,
};

export default Layout;
