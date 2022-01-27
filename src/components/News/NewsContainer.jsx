//@ts-check

import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { addNewsPost } from "../../redux/news-reducer";
import News from "./News";
import NewsPosts from "./NewsPosts/NewsPosts";

class NewsContainer extends React.Component {
    render(){
        if(!this.props.isAuth) return <Navigate to={"/"}/>
        let newsPostsElement = this.props.newsPosts.reverse().map( (item) => {

            let month;
            switch (item.postDate[1]) {
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
            return <NewsPosts 
                key={item.id}
                postDate={item.postDate}
                month={month}
                title={item.title}
                text={item.text}
            />
        });
        return(
            <News
            newsPostsElement={newsPostsElement}
            addNewsPost={this.props.addNewsPost}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return{ 
        newsPosts: state.newsPage.newsPosts
    }
}

export default connect(mapStateToProps, {addNewsPost})(NewsContainer);