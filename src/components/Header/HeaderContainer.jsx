import React from 'react';
import { connect } from 'react-redux';
import { handleSearchValue, searchNews } from '../../redux/news-reducer';
import Header from './Header';


class HeaderContainer extends React.Component {

    render() {
        return (
            <Header
                searchValue={this.props.searchValue}
                searchNews={this.props.searchNews}
                handleSearchValue={this.props.handleSearchValue}

                showLoginPopup={this.props.showLoginPopup}
                accountLogout={this.props.accountLogout}

                isAuth={this.props.isAuth}
                userLogin={this.props.userLogin}
                isShowSearch={this.props.isShowSearch}

                isAdminProfile={this.props.isAdminProfile}
            />
        )
    }



}
const mapStateToProps = (state) => {
    return{
        searchValue: state.newsPage.searchValue,
        isShowSearch: state.newsPage.isShowSearch
    }
}

export default connect(mapStateToProps, {searchNews, handleSearchValue})(HeaderContainer);