//@ts-check

import { Link } from "react-router-dom";

const Home = (props) => {


    return(
        <div className="home">
            
            {
                props.isAuth 
                ? <><h1>Привет, {props.userLogin} </h1>
                    <p>Мы — Profilance, и мы всегда рады привествовать вас здесь!</p>
                    </> 
                : <div className="alert">
                    <h1>Привет, Гость</h1>
                    <button onClick={props.showLoginPopup} className="mainButton">Войти</button>
                    
                </div>
            }
            <div className="home-text">
                
                {
                    props.isAuth 
                    ? <p>Перейдите в раздел <Link to="news/" style={{color: "#1f7fb0", textDecoration: "underline"}}>Новости</Link>, чтобы узнать новое</p>
                    : <>
                    <p>У нас есть два аккаунта. Выберите один на вкус: </p>
                    <ul>
                        <li><h4>Аккаунт администратора</h4><p>Логин: maxwell</p> <p>Пароль: пароль123</p></li>
                        <li><h4>Аккаунт гостя</h4><p>Логин: slavik</p> <p>Пароль: пароль123</p></li>
                    </ul>
                    </>
                }
                
            </div>
            <div className="home-img" style={{marginTop: "30px"}}>
                <img style={{width: "100%"}} src="https://blog.mann-ivanov-ferber.ru/wp-content/uploads/2018/06/image3-37.png" alt="" />
            </div>
        </div>
    )
} 


export default Home;