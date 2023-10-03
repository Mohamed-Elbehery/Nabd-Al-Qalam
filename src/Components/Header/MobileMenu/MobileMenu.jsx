import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { switchLang } from "../../../features/slices/langSlice";
import { logout } from "../../../features/slices/authSlice";
import { uae, uk } from "../../../assets/images";

const MobileMenu = ({ setIsMenuHidden, isMenuHidden }) => {
  const { lang } = useSelector((state) => state.lang);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    setIsMenuHidden(true);
  };

  return (
    <ul className={`mobile-menu ${isMenuHidden ? "hide-menu" : "show-menu"}`}>
      <li>
        <CloseIcon onClick={handleClick} className="close-btn" />
      </li>
      <li>
        <Link onClick={handleClick} to={"/"}>
          {lang === "en" ? "Home" : "الصفحة الرئيسية"}
        </Link>
      </li>
      <li>
        <Link onClick={handleClick} to={"/about"}>
          {lang === "en" ? "About" : "من نحن"}
        </Link>
      </li>
      <li>
        <Link onClick={handleClick} to="/contact">
          {lang === "en" ? "Contact" : "تواصل معنا"}
        </Link>
      </li>
      <li>
        <Link
          onClick={handleClick}
          to="/shopping-cart"
          className="mobile-nav-link"
          dir={lang === "en" ? "ltr" : "rtl"}
        >
          {lang === "en" ? "Shoppign Cart" : "العربة"}
          <ShoppingBagOutlinedIcon />
        </Link>
      </li>
      {user?._id ? (
        <li>
          <button
            onClick={() => {
              dispatch(logout());
              handleClick();
              navigate("/login");
            }}
            style={{ all: "unset", cursor: "pointer" }}
          >
            {lang === "en" ? "Logout" : "تسجيل خروج"}
          </button>
        </li>
      ) : (
        <li>
          <Link
            dir={lang === "en" ? "ltr" : "rtl"}
            onClick={handleClick}
            to="/login"
            className="mobile-nav-link"
          >
            {lang === "en" ? "Login" : "تسجيل الدخول"}
            <PersonIcon />
          </Link>
        </li>
      )}
      <button
        dir={lang === "en" ? "ltr" : "rtl"}
        onClick={() => {
          dispatch(switchLang());
          handleClick();
        }}
        style={{ cursor: "pointer" }}
        className="mobile-nav-lang mobile-nav-link"
      >
        <span>{lang === "en" ? "Switch Language" : "تغيير اللغة"}</span>
        {lang === "en" ? (
          <img
            src={uae}
            width={30}
            style={{ objectFit: "cover" }}
            alt="uae-flag"
          />
        ) : (
          <img
            src={uk}
            width={30}
            style={{ objectFit: "cover" }}
            alt="uk-flag"
          />
        )}
      </button>
    </ul>
  );
};

export default MobileMenu;
