//@ts-check

import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { addNewsPost, agreePost, handleSearchValue, hideSearch, searchNews, showSearch } from "../../redux/news-reducer";
import News from "./News";

class NewsContainer extends React.Component {
    constructor(props){
        super(props);
    }



    render(){
        if(!this.props.isAuth) return <Navigate to={"/"}/> // если не зарег-н, направь на главную стр-цу
    
        return(
            <News

            newsPosts={this.props.newsPosts} 

            // posts
            addNewsPost={this.props.addNewsPost}
            agreePost={this.props.agreePost}
            //search
            searchValue={this.props.searchValue} 
            handleSearchValue={this.props.handleSearchValue}
            searchNews={this.props.searchNews}
            showSearch={this.props.showSearch}
            hideSearch={this.props.hideSearch}
            showSearchAlert={this.props.showSearchAlert}
            showSuccessAdd={this.props.showSuccessAdd}
            
            isAdminProfile={this.props.isAdminProfile}

            
            
            />
        )
    }
}

const mapStateToProps = (state) => {
    return{ 
        newsPosts: state.newsPage.newsPosts,
        searchValue: state.newsPage.searchValue,
        showSearchAlert: state.newsPage.showSearchAlert,
        showSuccessAdd: state.newsPage.showSuccessAdd
    }
}

export default connect(mapStateToProps, {addNewsPost, handleSearchValue, 
    searchNews, showSearch, hideSearch, agreePost})(NewsContainer);