import { TbHeartPlus } from "react-icons/tb";
import { BsEye } from "react-icons/Bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Cards = () => {
  const [value, setValue] = useState(1);
  const [popup, setPopup] = useState(false);
  const [books, setBooks] = useState([]);
  const [chosenBook, setChosenBook] = useState({});
  const endpoint = "http://localhost:3001/";

  const increase = () => setValue(() => value + 1);

  const decrease = () => {
    if (value == 1) return;
    setValue(() => value - 1);
  };

  const getAllBooks = async () => {
    const res = await axios.get(endpoint);
    setBooks(res.data);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="cards">
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book._id} className="card">
            <div className="card-img">
              <img src={book?.img} alt="" />
            </div>
            <div className="card-caption">
              <p className="caption">{book.enTitle}</p>
              <span className="price">{book.price} AED</span>
            </div>
            <div className="shopping">
              <div className="icons">
                <TbHeartPlus />
                <BsEye
                  onClick={() => {
                    setPopup(!popup);
                    setChosenBook(book);
                  }}
                />
              </div>
              <button className="btn">Add to cart</button>
            </div>
          </div>
        ))
      ) : (
        <h1>Loading ...</h1>
      )}
      {/* Popup */}
      <div className={`popup ${popup ? "show" : "hidden"}`}>
        <div className="left-popup">
          <p className="title">{chosenBook.enTitle}</p>
          <p className="where">in the store</p>
          <h4 className="price">{chosenBook.price} AED</h4>
          <p className="overview">{chosenBook.enDescription}</p>
          <div className="btnpopup">
            <button className="btnclick" onClick={() => increase()}>
              +
            </button>
            <span className="counter">{value}</span>
            <button className="btnclick" onClick={() => decrease()}>
              -
            </button>
          </div>
          <div className="addcart">
            <button>Add To Cart</button>
          </div>
        </div>
        <div className="right-popup">
          <img src={chosenBook.img} alt={chosenBook.enTitle} />
        </div>
        <div className="close">
          <AiFillCloseCircle
            className="close"
            onClick={() => setPopup(false)}
          />
        </div>
      </div>

      {/* Banners */}
      <div className="twobanner">
        <div className="bnr">
          <Link to="/">
            <img src="/src/assets/banner-space.jpg" alt="" />
          </Link>
        </div>
        <div className="bnr">
          <Link to="/">
            <img src="/src/assets/banner-wardan.jpg" alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;