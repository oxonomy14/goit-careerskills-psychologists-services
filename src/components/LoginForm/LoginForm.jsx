import css from './LoginForm.module.css';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/authSlice';
import { selectAuthLoading, selectAuthError } from '../../redux/authSelector';

const schema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Please enter a valid email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(30, 'Password too long')
    .required('Password is required'),
});

const LoginForm = ({ onClose}) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
    const [showPassword, setShowPassword] = useState(false);
  

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [error]);

const handleSubmit = async (values, { resetForm }) => {
  console.log("Login attempt", values); // додай це для перевірки
  try {
    await dispatch(
      loginUser({ email: values.email.trim(), password: values.password })
    ).unwrap();

    toast.success('Successfully logged in!');
    resetForm();
     onClose();
  } catch (err) {
    toast.error(err || 'Failed to log in');
  }
};

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={schema}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <h3 className={css.formTitle}>Log In</h3>
        <p className={css.formDesc}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a psychologist.
        </p>
        <div className={css.fieldWrapper}>
          <div className={css.field}>
            <Field name="email" placeholder="Email" className={css.input} />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>

          <div className={css.field}>
            <Field
              name="password"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              className={css.input}
            />
             <button
                          type="button"
                          onClick={() => setShowPassword(prev => !prev)}
                          className={css.eyeBtn}
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? (
                            <>
                              <svg width={20} height={20} className={css.eyeIcon}>
                                <use
                                  href={`/icons/sprite.svg?v=${Date.now()}#icon-eye-off`}
                                ></use>
                              </svg>
            
                         
                            </>
                          ) : (
                           <>
                              <svg width={20} height={20} className={css.eyeIcon}>
                                <use
                                  href={`/icons/sprite.svg?v=${Date.now()}#icon-eye`}
                                ></use>
                              </svg>
            
                         
                            </>
                          )}
                        </button>
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </div>
        </div>
        <button type="submit" className={css.btn} disabled={loading}>
          {loading ? 'Loading...' : 'Log In'}
          {/* {loading ? <Loader /> : 'Log In'} */}
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
