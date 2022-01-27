import React from 'react';
import css from './Header.module.scss';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

class Header extends React.Component {
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
                        <div className={css.topNavRight + ' flex aic'} >

                            <div className={css.topNavAuth}>
                                {
                                    this.props.isAuth
                                        ? <div className='headerAuth flex aic'>
                                            <span className={css.topNavLogin}>
                                                {
                                                    this.props.userLogin
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