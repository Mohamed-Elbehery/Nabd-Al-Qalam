import { Link } from "react-router-dom";
import "./signup.css";
import useFormHandling from "../../hooks/useFormHandling";

const Signup = () => {
  const { isLoading, user, lang, handleSignup, handleChange } =
    useFormHandling();

  return (
    <form method="POST" className="signup-form" onSubmit={handleSignup}>
      <img
        src="https://res.cloudinary.com/dxfphp6to/image/upload/v1705701165/nabdu_al_qalam/reading_ukaqz5.svg"
        alt="login_form_image"
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={user.email}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={user.password}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
        value={user.confirmPassword}
      />
      <Link to="/login">Already Registered ? Go to Login Page</Link>
      <button>
        {isLoading ? (
          <span className="loader"></span>
        ) : lang === "en" ? (
          "Sign Up"
        ) : (
          "انشاء حساب"
        )}
      </button>
    </form>
  );
};

export default Signup;
