import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import css from './LoginPopup.module.scss';
class LoginPopup extends React.Component {
    login = (values) => {
        this.props.accountLogin(values.login, values.password);
        // console.log(values.login, ' ', values.password);
    }
    hideLoginPopupOnEsc = (e) => {
        if(e.key === 'Escape'){
            this.props.hideLoginPopup();
            console.log('Escape');
        }
    }
    componentDidMount(){
        window.addEventListener('keyup', this.hideLoginPopupOnEsc);
    }
    componentWillUnmount(){
        window.removeEventListener('keyup', this.hideLoginPopupOnEsc);
    }
    render() {
        const validationSchema = yup.object().shape({
            login: yup.string().min(4).typeError('Должно быть строкой').required('Обязательно'),
            password: yup.string().min(5).typeError('Должно быть строкой').required('Обязательно')
        });
        return (
            <>
                <div className={css.popup}>
                    
                    <button className={css.popupClose} onClick={this.props.hideLoginPopup}>
                        ✕
                    </button>
                    <Formik
                        initialValues={{
                            login: '',
                            password: ''
                        }}
                        validateOnBlur
                        onSubmit={
                            (values) => { 
                                this.login(values);
                            }
                        }
                        validationSchema={validationSchema}
                    >
                        
                        {({ values, errors,
                            touched, handleChange,
                            handleBlur, isValid,
                            handleSubmit, dirty }) => (
                            <form className={css.popupForm} >

                                <h2>Вход</h2>

                                <div className={css.formInput}>

                                    <input onChange={handleChange}
                                        required
                                        onBlur={handleBlur}
                                        value={values.login}
                                        name='login' type="text"
                                        autoFocus
                                        className={
                                            this.props.authError || touched.login && errors.login  
                                            ? 'mainInput inputError' : 'mainInput'
                                        }
                                        placeholder="Логин" />
                                </div>

                                <input
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}

                                    name='password'
                                    type="password" className={
                                        this.props.authError || touched.password && errors.password 
                                        ? 'mainInput inputError' : 'mainInput'}
                                    placeholder="Пароль" />
                                <button disabled={!isValid && !dirty}
                                    className={css.popupButton + ' mainButton'} type='submit'
                                    onClick={handleSubmit}
                                >Войти</button>
                            </form>
                        )}
                    </Formik>

                </div>
                <div className={css.overflow}></div>
            </>
        )
    }
}
export default LoginPopup;