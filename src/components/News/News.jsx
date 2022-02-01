//@ts-check

import css from './News.module.scss';
import * as yup from 'yup';
import { Formik } from 'formik';
import React from 'react';
import NewsPostItem from './NewsPostItem/NewsPostItem';
import { Link } from 'react-router-dom';

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
        this.props.hideSearch(); // при закрытии страницы News скрывать поиск
    }
    render() {
        let newsPostsElement = this.props.newsPosts.map( (item, pos) => {
            // разбил дату на переменные для удобства
            
            let month;
            switch (item.postDate[1]) { // перебор месяцев
                case 0:
                    month = "Янв"
                    break;
                case 1:
                    month = "Фев"
                    break;
                case 2:
                    month = "Марта"
                    break;
                case 3:
                    month = "Апр"
                    break;
                case 4:
                    month = "Мая"
                    break;
                case 5:
                    month = "Июня"
                    break;
                case 6:
                    month = "Июля"
                    break;
                case 7:
                    month = "Авг"
                    break;
                case 8:
                    month = "Сен"
                    break;
                case 9:
                    month = "Окт"
                    break;
                case 10:
                    month = "Нояб"
                    break;
                case 11:
                    month = "Дек"
                    break;
            
                default:
                    break;
            }
            let minutes = item.postDate[2];
            let seconds = item.postDate[3];
            let day = item.postDate[0];

            if(seconds  < 10){
                seconds = '0' + seconds // чтобы добавлялся 0 перед цифрой
            } 
            if(minutes  < 10){
                minutes = '0' + minutes // чтобы добавлялся 0 перед цифрой
            } 
            
            if(this.props.isAdminProfile){
                item.isShowNow = true; // Показывай посты если админ. Админу видно всё. 
            } else { 
                item.isShowNow = false // Скрывай посты, если не админ.
            }
            // console.log('test isAgree =>', item.isAgree);
            // console.log('test isShowNow =>', item.isShowNow);
            if( !item.isAgree && !item.isShowNow ) {return null} // Показывай только одобренные

            

            

            return <NewsPostItem 
                key={item.id}
                postDate={item.postDate}
                month={month}
                minutes={minutes}
                seconds={seconds}
                title={item.title}
                text={item.text}
                day={day}
                isAgree={item.isAgree}
                isShowNow={item.isShowNow}
                agreePost={this.props.agreePost}
                pos={pos}
                id={item.id}
            />
        });
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
                                    // this.agreePost(this.props.newsPosts.length - 1) // убрал тк теперь добавляется в начало массива
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

                    
                {newsPostsElement}
                    
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