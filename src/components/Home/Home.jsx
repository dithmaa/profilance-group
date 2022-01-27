//@ts-check

const Home = (props) => {


    return(
        <div className="home">
            {
                props.isAuth 
                ? <h1>Привет, {props.userLogin} </h1>
                : <div className="alert">
                    <h1>Привет, Гость</h1>
                    <button onClick={props.showLoginPopup} className="mainButton">Войти</button>
                </div>
            }
            
        </div>
    )
} 


export default Home;