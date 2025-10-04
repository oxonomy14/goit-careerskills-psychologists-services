import css from './RegistrationForm.module.css';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/authSlice';
import { selectAuthLoading, selectAuthError } from '../../redux/authSelector';

const schema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Name is too short')
    .max(80, 'Max. 80 characters')
    .required('Name is required'),
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

const RegistrationForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(
        registerUser({
          email: values.email,
          password: values.password,
          name: values.name,
        })
      ).unwrap();

      toast.success('Successfully registered!');
      resetForm();
      onClose();
    } catch (err) {
      toast.error(err || 'Failed to register');
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={schema}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <h3 className={css.formTitle}>Registration</h3>
        <p className={css.formDesc}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
        <div className={css.fieldWrapper}>
          <div className={css.field}>
            <Field name="name" placeholder="Name" className={css.input} />
            <ErrorMessage name="name" component="div" className={css.error} />
          </div>

          <div className={css.field}>
            <Field name="email" placeholder="Email" className={css.input} />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>
          <div className={css.field}>
            <Field
              name="password"
              placeholder="Password"
              className={css.input}
              type={showPassword ? 'text' : 'password'}
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
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        {error && <p className={css.error}>{error}</p>}
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
