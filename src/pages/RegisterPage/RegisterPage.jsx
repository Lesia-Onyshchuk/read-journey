import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
import css from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <div className={css.registerPageBox}>
      <RegisterForm />
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

export default RegisterPage;
