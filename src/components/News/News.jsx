import css from './News.module.scss';
import * as yup from 'yup';
import { Formik } from 'formik';
import React from 'react';

class News extends React.Component {
    
    handleSearchInput = (e) => {
        let inputValue = e.target.value;
        this.props.handleSearchValue(inputValue);
        this.props.searchNews(inputValue);
    }
    render() {
        const validationSchema = yup.object().shape({
            postTitle: yup.string().min(5).typeError('Должно быть строкой').required('Обязательно'),
            postText: yup.string().min(5).typeError('Должно быть строкой').required('Обязательно')
        });
        return (
            <div className={css.news}>
                <div className={css.newsActions + ' flex'}>
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
                                    this.props.addNewsPost(values.postTitle, values.postText)
                                }
                            }
                            validationSchema={validationSchema}
                        >

                            {({ values, errors,
                                touched, handleChange,
                                handleBlur, isValid,
                                handleSubmit, dirty }) => (
                                <form className={css.newsAddPostForm}>

                                    <h2>Добавить пост</h2>

                                    <div className={css.newsAddPostFormWrapper}>
                                        <input onChange={handleChange}
                                            required
                                            onBlur={handleBlur}
                                            value={values.postTitle}
                                            name='postTitle' type="text"
                                            maxLength="20"
                                            className={
                                                touched.postTitle && errors.postTitle
                                                    ? 'mainInput inputError' : 'mainInput'
                                            }
                                            placeholder="Заголовок поста" />

                                        <textarea
                                            required
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.postText}

                                            name='postText'
                                            type="text" className={
                                                touched.postText && errors.postText
                                                    ? 'mainTextarea textareaError' : 'mainTextarea'}
                                            placeholder="Текст" />
                                        <button disabled={!isValid && !dirty}
                                            className={css.newsAddPostFormButton + ' mainButton'} type='submit'
                                            onClick={handleSubmit}
                                        >Войти</button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                    <div className={css.search}>
                        <h2>Поиск постов</h2>
                        <div className={css.searchLine}>
                            <input type="text"
                                value={this.props.searchValue}
                                className={css.searchInput + ' mainInput'}
                                onChange={this.handleSearchInput}
                            />
                        </div>
                    </div>
                </div>
                <div className={css.newsPosts}>
                    {this.props.newsPostsElement}
                </div>
            </div>
        )
    }
}
export default News;