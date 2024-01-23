import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./payButton.css";

export default function PayButton({ cartItems }) {
  const [isLoading, setIsLoading] = useState(false);
  const { lang } = useSelector((state) => state.lang);
  const { user } = useSelector((state) => state.auth);

  const handleCheckout = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      cartItems,
      userId: user._id,
    };

    axios
      .post(
        `${"https://nabd-server.onrender.com/create-checkout-session"}`,
        data
      )
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
      });
  };

  return (
    <button className="pay-button" onClick={handleCheckout}>
      {isLoading ? (
        <span className="loader"></span>
      ) : lang == "en" ? (
        " Go to Checkout"
      ) : (
        "اذهب للدفع الأن"
      )}
    </button>
  );
}
