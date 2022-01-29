import css from './News.module.scss';
import * as yup from 'yup';
import { Formik } from 'formik';
import React from 'react';
import searchIcon from '../../assets/icons/search-icon.png'

class News extends React.Component {
    state = {
        showSuccessAdd: false 
    }
    handleSearchInput = (e) => {
        let inputValue = e.target.value;
        this.props.handleSearchValue(inputValue);
        this.props.searchNews(inputValue);
    }
    agreePost = (postPos) => {
        this.props.agreePost(postPos);
    }
    componentDidMount() {
        this.props.showSearch();
    }
    componentWillUnmount() {
        this.props.hideSearch();
    }
    render() {
        const validationSchema = yup.object().shape({
            postTitle: yup.string().min(4, "Слишком короткий заголовок").typeError('Слишком короткий заголовок').required('Введите заголовок'),
            postText: yup.string().typeError('Должно быть строкой').required('Введите текст')
        });
        return (
            <div className={css.news}>


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
                                this.props.addNewsPost(values.postTitle, values.postText);
                                
                                if(this.props.isAdminProfile){
                                    // this.agreePost(this.props.newsPost.length - 1) // убрал тк теперь добавляется в начало массива
                                    this.agreePost(0)
                                }

                                this.setState((state)=>{
                                    return{
                                        showSuccessAdd: true
                                    }
                                })
                                setTimeout(() => this.setState({ showSuccessAdd: false}), 3000)

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
                                        maxLength="50"
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
                                    >Добавить</button>
                                </div>
                                {
                                    !this.props.isAdminProfile
                                        &&
                                             this.state.showSuccessAdd
                                                ? <div className={css.newsAlert}><p>Пост отправлен на модерацию</p></div>
                                                : null
                                }
                                {
                                    touched.postTitle && errors.postTitle 
                                    && errors.postTitle
                                }
                                

                            </form>
                        )}
                    </Formik>
                </div>
                
                <div className={css.newsPosts}>


                    {this.props.newsPostsElement}
                    {
                        this.props.showSearchAlert
                        && <h2>Ничего не найдено</h2>
                    }
                </div>
            </div>
        )
    }
}
export default News;