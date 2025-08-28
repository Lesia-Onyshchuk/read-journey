import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import css from "./LoginForm.module.css";
import logo from "../../../public/assets/images/logo.png";
import { useId } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { setUser } from "../../redux/auth/slice";

const schema = Yup.object().shape({
  email: Yup.string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  // useSelector((state) => state.auth.user?.name);

  const navigate = useNavigate();

  const emailId = useId();
  const pwdId = useId();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const res = await dispatch(login(values));
    if (res.error) {
      toast.error(res.payload);
    } else {
      toast.success("Welcome back!");
      resetForm();
      // await dispatch(getCurrentUser());
      navigate("/recommended");
    }
    setSubmitting(false);
  };

  return (
    <div className={css.registerBox}>
      <img src={logo} alt="READ JOURNEY" className={css.logo} />
      <h1 className={css.title}>
        Expand your mind, reading <span className={css.span}>a book</span>
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={css.inputBox}>
              <label htmlFor={emailId} className={css.label}>
                Mail:
              </label>
              <Field
                type="email"
                name="email"
                className={css.inputEmail}
                id={emailId}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.inputBox}>
              <label htmlFor={pwdId} className={css.label}>
                Password:
              </label>
              <Field
                type="password"
                name="password"
                className={css.inputPwd}
                id={pwdId}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.btnBox}>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={css.registerBtn}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
              <NavLink to="/register" className={css.loginLink}>
                Don't have an account?
              </NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
