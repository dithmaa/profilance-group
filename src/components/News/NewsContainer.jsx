//@ts-check

import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { addNewsPost, agreePost, handleSearchValue, hideSearch, searchNews, showSearch } from "../../redux/news-reducer";
import News from "./News";
import NewsPosts from "./NewsPosts/NewsPosts";

class NewsContainer extends React.Component {
    constructor(props){
        super(props);
    }



    render(){
        if(!this.props.isAuth) return <Navigate to={"/"}/> // если не зарег-н, направь на главную стр-цу
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

            

            

            return <NewsPosts 
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
            />
        });
        return(
            <News
            newsPostsElement={newsPostsElement}
            addNewsPost={this.props.addNewsPost}
            searchValue={this.props.searchValue}
            
            handleSearchValue={this.props.handleSearchValue}
            searchNews={this.props.searchNews}
            showSearch={this.props.showSearch}
            hideSearch={this.props.hideSearch}
            showSearchAlert={this.props.showSearchAlert}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return{ 
        newsPosts: state.newsPage.newsPosts,
        searchValue: state.newsPage.searchValue,
        showSearchAlert: state.newsPage.showSearchAlert
    }
}

export default connect(mapStateToProps, {addNewsPost, handleSearchValue, 
    searchNews, showSearch, hideSearch, agreePost})(NewsContainer);