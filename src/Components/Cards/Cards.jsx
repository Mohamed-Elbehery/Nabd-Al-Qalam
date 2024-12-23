import Popup from "../Popup/Popup";
import ClipLoader from "react-spinners/ClipLoader";
import useDisplayBooks from "../../hooks/useDisplayBooks";
import SearchIcon from "@mui/icons-material/Search";

export default function Cards() {
  const {
    handleChange,
    displayBooks,
    displayWardanSeries,
    displaySpaceSeries,
    setWardanSeries,
    setSpaceSeries,
    setPopup,
    searchValue,
    setSearchValue,
    category,
    popup,
    lang,
    wardanSeries,
    spaceSeries,
    chosenBook,
    query,
    isLoading,
  } = useDisplayBooks();

  return (
    <>
      <div className="search-bar">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          dir={lang == "ar" ? "rtl" : "ltr"}
          type="text"
          placeholder={
            lang == "ar" ? "ابحث عن الكتب..." : "Search for books..."
          }
        />

        <SearchIcon
          style={lang == "ar" ? { left: "0.5rem" } : { right: "0.5rem" }}
        />
      </div>

      <div className="books-filter">
        <select value={query?.ageGroup} onChange={handleChange} name="ageGroup">
          {lang === "en" ? (
            <>
              <option value={""}>All Age Groups</option>
              <option value={"0-3"}>0 - 3 Years</option>
              <option value={"3-5"}>3 - 5 Years</option>
              <option value={"6-9"}>6 - 9 Years</option>
              <option value={"9-12"}>9 - 12 Years</option>
              <option value={"12-17"}>12 - 17 Years</option>
            </>
          ) : (
            <>
              <option value={""} dir="rtl">
                كل الفئات العمرية
              </option>
              <option value={"0-3"} dir="rtl">
                0 - 3 سنوات
              </option>
              <option value={"3-5"} dir="rtl">
                3 - 5 سنوات
              </option>
              <option value={"6-9"} dir="rtl">
                6 - 9 سنوات
              </option>
              <option value={"9-12"} dir="rtl">
                9 - 12 سنوات
              </option>
              <option value={"12-17"} dir="rtl">
                12 - 17 سنوات
              </option>
            </>
          )}
        </select>
        <select
          value={category || query?.category}
          onChange={handleChange}
          name="category"
        >
          {lang === "en" ? (
            <>
              <option value={""}>All Categories</option>
              <option value="مغامرات">Adventures</option>
              <option value="فضاء">Space</option>
              <option value="التراث الاماراتي">Emirati Heritage</option>
              <option value="الحفاظ علي البيئة">
                Protecting the environment
              </option>
              <option value="روايات">Novels</option>
              <option value="تنمية ذاتية">Self Development</option>
              <option value="كتب متنوعة">Various books</option>
              <option value="كتب اسلامية">Islamic books</option>
              <option value="وسائل تعليمية">Teaching Aids</option>
            </>
          ) : (
            <>
              <option value={""} dir="rtl">
                كل الفئات
              </option>
              <option dir="rtl" value="مغامرات">
                مغامرات
              </option>
              <option dir="rtl" value="فضاء">
                فضاء
              </option>
              <option dir="rtl" value="التراث الاماراتي">
                التراث الاماراتي
              </option>
              <option dir="rtl" value="الحفاظ علي البيئة">
                الحفاظ علي البيئة
              </option>
              <option dir="rtl" value="روايات">
                روايات
              </option>
              <option dir="rtl" value="تنمية ذاتية">
                تنمية ذاتية
              </option>
              <option dir="rtl" value="كتب متنوعة">
                كتب متنوعة
              </option>
              <option dir="rtl" value="كتب اسلامية">
                كتب اسلامية
              </option>
              <option dir="rtl" value="وسائل تعليمية">
                وسائل تعليمية
              </option>
            </>
          )}
        </select>
      </div>
      {query?.ageGroup == "" && query?.category == "" ? (
        ""
      ) : (
        <h4 className="products-number">
          {lang === "en"
            ? `Results : ${displayBooks()?.length ?? "0"} ${
                displayBooks()?.length > 1
                  ? "Books"
                  : displayBooks()?.length === undefined
                  ? ""
                  : "Book"
              }`
            : `النتائج : ${displayBooks()?.length || "لا توجد نتائج"} ${
                displayBooks()?.length > 10
                  ? "كتاب"
                  : displayBooks()?.length === undefined
                  ? ""
                  : "كتب"
              }`}
        </h4>
      )}
      {(wardanSeries || spaceSeries) && (
        <h4
          onClick={() => {
            setWardanSeries(() => false);
            setSpaceSeries(() => false);
          }}
          className="show-btn"
          style={{ cursor: "pointer" }}
        >
          {lang === "en" ? "Show All" : "اظهار الكل"}
        </h4>
      )}
      <div className="cards">
        {!isLoading ? (
          !wardanSeries && !spaceSeries ? (
            displayBooks()
          ) : wardanSeries ? (
            displayWardanSeries()
          ) : spaceSeries ? (
            displaySpaceSeries()
          ) : null
        ) : (
          <div className="cards">
            <ClipLoader size={100} color="#36d7b7" />
          </div>
        )}

        <Popup chosenBook={chosenBook} popup={popup} setPopup={setPopup} />
      </div>
    </>
  );
}
