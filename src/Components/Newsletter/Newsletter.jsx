import { useSelector } from "react-redux";
import "./newsletter.css";

const Newsletter = () => {
  const { lang } = useSelector((state) => state.lang);
  const nabdAr = `دار نبض القلم هي مؤسسة ثقافية تعنى بشؤون
  تحقيق ونشر الكتب العربية في أعلى المستويات
  المستويات العلمية والمعرفية.`;

  const nabdEn = `Dar Nabd Al-Qalam is a cultural institution concerned with the
  investigation and publication of Arabic books at the highest
  scientific and knowledge levels.`;

  return (
    <div
      className="newsletter"
      style={
        lang === "en"
          ? { flexDirection: "row" }
          : { flexDirection: "row-reverse" }
      }
    >
      <h1 dir={lang === "en" ? "ltr" : "rtl"}>
        {lang === "en" ? "Subscribe to Our Newsletter" : "اشترك ليصلك كل جديد"}
      </h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          required
          type="email"
          placeholder={
            lang === "en"
              ? "Enter Email Address..."
              : "ادخل البريد الألكتروني..."
          }
        />
        <button>{lang === "en" ? "Subscribe" : "اشترك"}</button>
        <p
          style={
            lang === "en"
              ? { left: "10px", right: "auto" }
              : { right: "10px", left: "auto" }
          }
        >
          {lang === "en" ? nabdEn : nabdAr}
        </p>
      </form>
    </div>
  );
};

export default Newsletter;
