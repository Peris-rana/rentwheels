import Layout from "../components/Layout/Layout";
import herobg from "../assets/hero-bg.png";
import CarImage from "../assets/car-png-16835.png";
import CarCatalogue from "../components/CarComponents/CarCatalogue";
import { Button } from "react-bootstrap";
const HomePage = () => {
  const handlleClick = () => {
    const CarCatalogueElement = document.getElementById("CarCatalogue");

    if (CarCatalogueElement) {
      CarCatalogueElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <Layout>
      <div className="hero-parent d-flex justify-content-evenly">
        <div>
          <p className="hero-title mt-3">Rent a car-quick and super easy</p>
          <p className="fs-3 custom-opacity mt-1">
            Make your car rental easy with our simple booking process.
          </p>
          <Button onClick={handlleClick}>Book Now</Button>
        </div>
        <div className="herobg position-relative w-100">
          <img src={herobg} className="h-100 w-100 mt-4 " alt="hero-bg" />
          <img
            src={CarImage}
            className="position-absolute car-image "
            style={{ right: "10%", top: "25%", height: "400px" }}
          />
        </div>
      </div>
      <div id="CarCatalogue">
        <CarCatalogue />
      </div>
    </Layout>
  );
};

export default HomePage;
