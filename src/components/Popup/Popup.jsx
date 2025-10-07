import 'react-datepicker/dist/react-datepicker.css';
import css from './Popup.module.css'; //
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';



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
  phone: Yup.string()
    .trim()
    .matches(/^\+380\d{9}$/, 'Phone number must be in format +380XXXXXXXXX')
    .required('Phone is required'),
  bookingTime: Yup.date()
    .nullable()
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      'Date cannot be in the past'
    )
    .required('Booking time is required'),
  comment: Yup.string().max(500, 'Max. 500 characters'),
});

const Popup = ({ isOpen, onClose, card }) => {
  if (!isOpen) return null;

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Thank you for your request!');
      resetForm();
      onClose();
    } catch (e) {
      console.error(e);

      
      const errorMessage =
        e?.response?.data?.message || 
        e?.message || 
        'Failed to send. Please try again.'; 

      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={css.overlay} onClick={onClose}>
        <div className={css.modal} onClick={e => e.stopPropagation()}>
          <h2 className={css.title}>
            Make an appointment with a psychologists
          </h2>
          <p className={css.descr}>
            You are on the verge of changing your life for the better. Fill out
            the short form below to book your personal appointment with a
            professional psychologist. We guarantee confidentiality and respect
            for your privacy.
          </p>
          <div className={css.infoBox}>
            <div className={css.infoImg}>
              <img
                className={css.avatar}
                src={card.avatar_url}
                alt={card.name}
              />
            </div>
            <div className={css.infoName}>
              <p className={css.infoDesc}>Your psychologists</p>
              <p className={css.name}>{card.name}</p>
            </div>
          </div>
          <Formik
            initialValues={{
              name: '',
              email: '',
              bookingTime: null,
              comment: '',
            }}
            validationSchema={schema}
            validateOnBlur={true}
            validateOnChange={false}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className={css.form}>
                <div className={css.fieldWrapper}>
                  <div className={css.field}>
                    <Field
                      name="name"
                      placeholder="Name"
                      className={css.input}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={css.error}
                    />
                  </div>
                  <div className={css.fieldRow}>
                    <div className={css.fieldPhone}>
                      <Field
                        name="phone"
                        placeholder="+380"
                        className={css.inputPhone}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className={css.error}
                      />
                    </div>
                    <div className={css.fieldTime}>
                      <DatePicker
                        selected={values.bookingTime}
                        onChange={d => setFieldValue('bookingTime', d)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Meeting time"
                        dateFormat="HH:mm"
                        placeholderText="00:00"
                        className={css.inputTime}
                        popperClassName={css.timeDropdown} 
                      />
                      <svg width={20} height={20} className={css.timeIcon}>
                        <use
                          href={`/icons/sprite.svg?v=${Date.now()}#icon-clock`}
                        ></use>
                      </svg>

                      <ErrorMessage
                        name="bookingTime"
                        component="div"
                        className={css.error}
                      />
                    </div>
                  </div>
                  <div className={css.field}>
                    <Field
                      name="email"
                      placeholder="Email"
                      className={css.input}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={css.error}
                    />
                  </div>
                  <div className={css.field}>
                    <Field
                      as="textarea"
                      name="comment"
                      placeholder="Comment"
                      className={css.textarea}
                    />
                    <ErrorMessage
                      name="comment"
                      component="div"
                      className={css.error}
                    />
                  </div>
                </div>
                <button type="submit" className={css.btn}>
                  Send
                </button>
              </Form>
            )}
          </Formik>
          <button type="button" className={css.btnClose} onClick={onClose}>
            <svg width={32} height={32} className={css.closeIcon}>
              <use href={`/icons/sprite.svg?v=${Date.now()}#icon-x`}></use>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Popup;
