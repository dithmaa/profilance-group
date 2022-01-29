import React from "react";
import { Route, Routes } from "react-router-dom";
import HeaderContainer from "../Header/HeaderContainer";
import Home from "../Home/Home";
import LoginPopup from "../LoginPopup/LoginPopup";
import NewsContainer from "../News/NewsContainer";
import css from "./General.module.scss";

class General extends React.Component {

    
    
    render() {

        

        let userLogin = this.props.userLogin;
        let isAdminProfile = this.props.isAdminProfile;

        return (
            <div className={css.general}>


                <HeaderContainer
                    showLoginPopup={this.props.showLoginPopup}
                    accountLogout={this.props.accountLogout}

                    isAuth={this.props.isAuth}
                    userLogin={userLogin}
                    isAdminProfile={isAdminProfile}
                />


                <Routes>
                    <Route path="/" element={
                        <Home isAuth={this.props.isAuth} 
                        showLoginPopup={this.props.showLoginPopup} 
                        userLogin={userLogin}
                    />}/>
                    <Route path="news/" element={

                        <NewsContainer 
                        isAdminProfile={this.props.isAdminProfile}
                        
                        isAuth={this.props.isAuth}/>
                    
                    } />
                    
                </Routes>
                {
                    this.props.isShowLoginPopup
                        ? <LoginPopup
                            hideLoginPopup={this.props.hideLoginPopup}
                            accountLogin={this.props.accountLogin}

                            authError={this.props.authError}

                            isShowLoginPopup={this.props.isShowLoginPopup}

                        />
                        : null
                }


            </div>
        )
    }
}
export default General;