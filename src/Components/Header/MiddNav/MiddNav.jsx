import "./middnav.css";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { switchLang } from "../../../features/slices/langSlice";
import { useEffect, useState } from "react";
import { logout } from "../../../features/slices/authSlice";
<<<<<<< HEAD
import { logo, uae, uk } from "../../../assets/Iamges";
=======
import MobileMenu from "../MobileMenu/MobileMenu";
>>>>>>> 7eec79ebd3519277647ba895214215ef4ae843df

const MiddNav = () => {
  const [headerScroll, setHeaderScroll] = useState("");
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { lang } = useSelector((state) => state.lang);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLangSwitch = () => {
    dispatch(switchLang());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset >= 178) {
        setHeaderScroll("middnav-scroll");
      } else {
        setHeaderScroll("");
      }
    });
  }, []);

  return (
    <div className={`middnav ${headerScroll}`}>
      <div
        style={
          lang === "en"
            ? { flexDirection: "row" }
            : { flexDirection: "row-reverse" }
        }
        className="container-midd"
      >
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="leftlinks-search">
          <ul className="links-search"
            style={lang == "en" ?
            { flexDirection: "row" } :
            { flexDirection: "row-reverse" }}>
            <li>
              <Link to="/"> {lang == "en" ? "Home" : "الرئيسيه"} </Link>
            </li>
            <li>
              <Link to="/about">{lang == "en" ? "About" : "من نحن"}</Link>
            </li>
            <li>
              <Link to="/contact">{lang == "en" ? "Contact" : "تواصل معنا"}</Link>
            </li>
          </ul>
        </div>
        <div
          style={
            lang === "en"
              ? { flexDirection: "row" }
              : { flexDirection: "row-reverse" }
          }
          className="cart"
        >
          <Link to="/shopping-cart">
            <ShoppingBagOutlinedIcon />
            <span
              style={lang == "en" ? { left: "16px" } : { right: "-6px" }}
              className="count"
            >
              {cartItems?.length || 0}
            </span>
          </Link>
          {!user?._id ? (
            <Link to={"/login"}>
              <PersonIcon />
            </Link>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
          <button className="lang-btn" onClick={handleLangSwitch}>
            {lang === "en" ? (
              <img src={uae} alt="uae-flag" />
            ) : (
<<<<<<< HEAD
              <img src={uk} alt="uae-flag" />
=======
              <img src="/src/assets/uk.png" alt="uk-flag" />
>>>>>>> 7eec79ebd3519277647ba895214215ef4ae843df
            )}
          </button>
        </div>
        <div className="menu">
          <MenuOutlinedIcon className="menu-icon" />
        </div>
      </div>
      <MobileMenu className={`${isMenuHidden ? "show-menu" : "hide-menu"}`} />
    </div>
  );
};

export default MiddNav;
