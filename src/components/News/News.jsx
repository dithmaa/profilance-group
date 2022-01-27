import css from './News.module.scss';
import * as yup from 'yup';
import { Formik } from 'formik';

const News = (props) => {
    const validationSchema = yup.object().shape({
        postTitle: yup.string().min(5).typeError('Должно быть строкой').required('Обязательно'),
        postText: yup.string().min(5).typeError('Должно быть строкой').required('Обязательно')
    });
    
    return(
        <div className={css.news}>
            <h2>Страница новостей</h2>
                <div className="newsAddPostForm">
                    
                <Formik
                        initialValues={{
                            postTitle: '',
                            postText: ''

                        }}
                        validateOnBlur
                        onSubmit={
                            (values) => { 
                                // console.log(values);
                                props.addNewsPost(values.postTitle, values.postText)
                            }
                        }
                        validationSchema={validationSchema}
                    >
                        
                        {({ values, errors,
                            touched, handleChange,
                            handleBlur, isValid,
                            handleSubmit, dirty }) => (
                            <form className='flex'>

                                <h2>Вход</h2>

                                <div className={css.formInput}>

                                    <input onChange={handleChange}
                                        required
                                        onBlur={handleBlur}
                                        value={values.postTitle}
                                        name='postTitle' type="text"
                                        autoFocus
                                        className={
                                            touched.login && errors.login  
                                            ? 'mainInput inputError' : 'mainInput'
                                        }
                                        placeholder="Заголовок поста" />
                                </div>

                                <textarea
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.postText}

                                    name='postText'
                                    type="text" className={
                                        touched.password && errors.password 
                                        ? 'mainInput inputError' : 'mainInput'}
                                    placeholder="Текст" />
                                <button disabled={!isValid && !dirty}
                                    className={'mainButton'} type='submit'
                                    onClick={handleSubmit}
                                >Войти</button>
                            </form>
                        )}
                    </Formik>
                </div>
                <div className={css.newsPosts}>
                    {props.newsPostsElement}
                </div>
        </div>
    )
}
export default News;