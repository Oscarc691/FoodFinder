import "./pages.css";
import Logo from "../assets/logo.jpeg";
import HomeImage from "../assets/homeImage.jpg"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <section id="home">
      <div className="home__container">
        <div className="home__left">
          <img
            className="home__img"
            src={HomeImage}
            alt=""
          />
        </div>
        <div className="home__right">
          <img src={Logo} className="home__img--logo" alt="" />
          <div className="home__right--bottom">
            <h1 className="home__right--slogan">
             Find the best recipes here!!
            </h1>
            <button
              onClick={() => navigate("/categories")}
              className="btn home__btn"
            >
              Find Recipes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
