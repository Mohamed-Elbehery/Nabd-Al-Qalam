import Hero from "../../Components/Hero/Hero";
import SliderWardan from "../../Components/SliderWardan/SliderWardan";
import AgeGroups from "../../Components/AgeGroups/AgeGroups";
import Design from "../../Components/Design/Design";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { useLocation, useRevalidator } from "react-router-dom";
import { login, logout } from "../../features/slices/authSlice";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import jwtDecode from "jwt-decode";

const Home = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const revalidator = useRevalidator();

  useEffect(() => {
    const getLoggedUser = async (decodedToken) => {
      const res = await axios.get(
        `${import.meta.env.VITE_USERS_ENDPOINT}${decodedToken?.id}`
      );

      dispatch(login(res.data));
    };

    const cookies = new Cookies(null, { path: "/" });

    revalidator.revalidate();
    const token = cookies.get("jwt");

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken) {
        const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

        // Assuming decodedToken.exp contains the expiration timestamp in seconds
        const expirationTimestamp = decodedToken.exp;

        // If expiration date is valid log in the user to the website
        if (expirationTimestamp > currentTimestamp) {
          getLoggedUser(decodedToken);
        } else {
          logout();
        }
      }
    }
  }, [pathname, revalidator, dispatch]);

  return (
    <>
      <div className="images-container">
        <Hero />
        <AgeGroups />
        <SliderWardan />
        <Design />
      </div>
    </>
  );
};
export default Home;
