import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import logo from "../../../public/assets/images/logo.png";
import css from "./RegisterForm.module.css";
import { useId } from "react";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});

export default function RegisterForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);

  const nameId = useId();
  const emailId = useId();
  const pwdId = useId();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const res = await dispatch(register(values));
    if (res.error) {
      toast.error(res.payload);
    } else {
      toast.success("Registration successful!");
      resetForm();
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
          <Form className="flex flex-col gap-4 max-w-sm mx-auto">
            <div className={css.inputBox}>
              <label htmlFor={nameId} className={css.label}>
                Name:
              </label>
              <Field
                type="text"
                name="name"
                className={css.inputName}
                id={nameId}
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>
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
                {loading ? "Registering..." : "Registration"}
              </button>
              <NavLink to="/login" className={css.loginLink}>
                Already have an account?
              </NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
