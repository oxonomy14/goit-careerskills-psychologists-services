import css from './AuthModal.module.css';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from "../LoginForm/LoginForm";


const AuthModal =( { isOpen, onClose,  authType }) => {


  if (!isOpen) return null;

    return (
        <>
        <div className={css.overlay} onClick={onClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
       {authType === "login" ? (
        <LoginForm onClose={onClose}/>
        ) : (
          <>
             <RegistrationForm onClose={onClose}/>
           
          </>
        )}
          <button type='button' className={css.btnClose} onClick={onClose}>
             <svg width={32} height={32} className={css.closeIcon}>
                                   <use href={`/icons/sprite.svg?v=${Date.now()}#icon-x`}></use>
                                </svg>
            </button>
          </div>
        </div>
        </>
    );
    
}

export default AuthModal;