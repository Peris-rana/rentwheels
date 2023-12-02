import NavBar from './NavBar';
import PropTypes from 'prop-types';
const Layout = ({ children }) => {
   return (
      <>
            <main>
               <NavBar />
               {children}
            </main>
      </>
   );
};
Layout.propTypes = {
   children: PropTypes.node,
};

export default Layout;
