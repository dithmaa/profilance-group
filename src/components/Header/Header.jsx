import React from 'react';
import css from './Header.module.scss';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

import searchIcon from '../../assets/icons/search-icon.png';

class Header extends React.Component {
    constructor(props){
        super(props)
    }
    handleSearchInput = (e) => {
        let inputValue = e.target.value;
        this.props.handleSearchValue(inputValue);
        this.props.searchNews(inputValue);
    }
    render() {
        return (
            <>
                <header className="header">
                    <nav className={css.topNav + ' flex jcsb aic'}>
                        <div className={css.topNavLeft + ' flex aic'}>
                            <div className={css.logo}>
                                <Link to={"/"}>
                                    <img src={logo} alt="" />
                                </Link>
                            </div>
                            {
                                this.props.isAuth
                                && <ul className={css.topNavLinks + ' flex'}>
                                    <li><Link className={css.topNavLink} to="news/">Новости</Link></li>
                                </ul>

                            }
                        </div>
                        {/* Поиск только по новостям */}
                        {
                            this.props.isAuth && this.props.isShowSearch
                            &&
                                <div className={css.search}>

                                <div className={css.searchLine}>
                                    <div className={css.searchIcon}>
                                        <img src={searchIcon} alt="" />
                                    </div>
                                    <input type="text"
                                        value={this.props.searchValue}
                                        className={css.searchInput + ' mainInput'}
                                        onChange={this.handleSearchInput}
                                        placeholder={"Например: React"}
                                    />
                                </div>
                            </div>
                            

                        }
                        

                        <div className={css.topNavRight + ' flex aic'} >

                            <div className={css.topNavAuth}>
                                {
                                    this.props.isAuth
                                        ? <div className='headerAuth flex aic'>
                                            <span className={css.topNavLogin}>
                                                {
                                                    this.props.userLogin
                                                }
                                                {
                                                    this.props.isAdminProfile
                                                    ? <span style={{"color": "#4a7eb9"}}> (admin)</span>
                                                    : null
                                                }
                                            </span>
                                            <button className='mainButton' onClick={this.props.accountLogout}>Выйти</button>
                                        </div>
                                        : <div className='headerAuth'>
                                            <button className={css.topNavButton + ' mainButton'} onClick={this.props.showLoginPopup}>Вход</button>
                                        </div>
                                }
                            </div>
                        </div>
                    </nav>
                </header>

            </>
        )
    }


}

export default Header;