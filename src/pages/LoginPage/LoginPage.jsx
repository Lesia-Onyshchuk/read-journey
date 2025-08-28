import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={css.registerPageBox}>
      <LoginForm />
      <div className={css.phoneBox}>
        <img
          src="../../../public/assets/images/iphone.png"
          alt="iPhone 15"
          className={css.img}
        />
      </div>
    </div>
  );
};

export default LoginPage;
