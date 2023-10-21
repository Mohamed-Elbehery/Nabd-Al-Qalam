import "./middnav.css";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { switchLang } from "../../../features/slices/langSlice";
import { useEffect, useState } from "react";
import { logout } from "../../../features/slices/authSlice";
import MobileMenu from "../MobileMenu/MobileMenu";
import axios from "axios";
const MiddNav = ({ headerRef }) => {
  const [headerScroll, setHeaderScroll] = useState("");
  const [isMenuHidden, setIsMenuHidden] = useState(true);
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
      if (window.pageYOffset >= headerRef?.current.clientHeight) {
        setHeaderScroll("middnav-scroll");
      } else {
        setHeaderScroll("");
      }
    });
  }, []);

  // //currency convert
  // const getRates = async () => {
  //   const data = await axios.get(
  //     `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=88ca8ee0d52b4a0d9c7d2351f3eb7b8e`
  //   );
  //   console.log(data);
  // };

  // useEffect(() => {
  //   getRates();
  // }, []);

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
            <img
              width={80}
              height={80}
              src={
                "https://res.cloudinary.com/dxfphp6to/image/upload/v1697903938/nabdu_al_qalam/logo_chdt9x.jpg"
              }
              alt="logo"
            />
          </Link>
        </div>
        <div className="leftlinks-search">
          <ul
            className="links-search"
            style={
              lang == "en"
                ? { flexDirection: "row" }
                : { flexDirection: "row-reverse" }
            }
          >
            <li>
              <Link to="/"> {lang == "en" ? "Home" : "الصفحة الرئيسية"} </Link>
            </li>
            <li>
              <Link to="/about">{lang == "en" ? "About" : "من نحن"}</Link>
            </li>
            <li>
              <Link to="/contact">
                {lang == "en" ? "Contact" : "تواصل معنا"}
              </Link>
            </li>
            <li>
              <Link to="/activities">
                {lang == "en" ? "Activities" : "أنشطة الدار"}
              </Link>
            </li>
            {user.isAdmin && (
              <li>
                <Link to="/add-books">
                  {lang == "en" ? "Add Books" : "اضف بعض الكتب"}
                </Link>
              </li>
            )}
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
              className="count"
              style={lang === "en" ? { left: "15px" } : { right: "-10px" }}
            >
              {cartItems?.length || 0}
            </span>
          </Link>
          {!user?._id ? (
            <Link to={"/login"}>
              <PersonIcon />
            </Link>
          ) : (
            <button className="auth-btn" onClick={handleLogout}>
              {lang == "en" ? "LOGOUT" : "تسجيل خروج"}
            </button>
          )}
          {/* <select className="countryPrice">
            <option value="AED">AED</option>
            <option value="SAR">SAR</option>
            <option value="OMR">OMR</option>
            <option value="QAR">QAR</option>
          </select> */}
          <button className="lang-btn" onClick={handleLangSwitch}>
            {lang === "en" ? (
              <img
                src={
                  "https://res.cloudinary.com/dxfphp6to/image/upload/v1697903939/nabdu_al_qalam/uae_lfhvbc.jpg"
                }
                width={30}
                height={30}
                alt="UAE-flag"
              />
            ) : (
              <img
                src={
                  "https://res.cloudinary.com/dxfphp6to/image/upload/v1697903939/nabdu_al_qalam/uk_twgwxa.png"
                }
                width={30}
                height={30}
                alt="UK-flag"
              />
            )}
          </button>
        </div>
        <div className="menu">
          <MenuOutlinedIcon
            onClick={() => setIsMenuHidden(false)}
            className="menu-icon"
          />
        </div>
      </div>
      <MobileMenu
        setIsMenuHidden={setIsMenuHidden}
        isMenuHidden={isMenuHidden}
      />
    </div>
  );
};

export default MiddNav;
