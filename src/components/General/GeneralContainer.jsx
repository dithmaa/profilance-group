//@ts-check
import React from "react";
import { connect } from "react-redux";
import { accountLogin, accountLogout } from "../../redux/auth-reducer";
import { hideLoginPopup, showLoginPopup } from "../../redux/general-reducer";
import General from "./General";

class GeneralContainer extends React.Component {
    componentDidUpdate(){
        //закрытие попапа, если авторизация прошла успешно
        this.props.isAuth
            ? this.props.hideLoginPopup()
            : console.log()
    }
    render(){
        // получаем имя пользователя (показывается, если польз-ть авторизирован)
        let userLogin;
            JSON.parse(localStorage.getItem('authData'))
            ? userLogin = JSON.parse(localStorage.getItem('authData')).login 
            : userLogin = ""

        return(
            <General 
                // Функции
                showLoginPopup={this.props.showLoginPopup} 
                hideLoginPopup={this.props.hideLoginPopup}
                accountLogout={this.props.accountLogout}
                accountLogin={this.props.accountLogin}
                
                // Данные
                isShowLoginPopup={this.props.isShowLoginPopup}
                isAuth={this.props.isAuth}
                authError={this.props.authError}
                
                // Логин пользователя
                userLogin={userLogin}

            />
        )
    }
}
const mapStateToProps = (state) => {
    return{
        isShowLoginPopup: state.generalPage.isShowLoginPopup,
        isAuth: state.auth.isAuth,
        authError: state.auth.authError
    }
}
export default connect(mapStateToProps,{showLoginPopup, hideLoginPopup, accountLogout, accountLogin})(GeneralContainer);


