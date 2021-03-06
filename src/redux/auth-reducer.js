let isAuthNow;
JSON.parse(localStorage.getItem('isAuth'))
? isAuthNow = JSON.parse(localStorage.getItem('isAuth')).isAuth
: isAuthNow = false

let initialState = {
    isAuth: isAuthNow,
    users: [
        {
            id: 1,
            login: "slavik",
            password: "пароль123",
            order: "user"
        },
        {
            id: 2,
            login: "maxwell",
            password: "пароль123",
            order: "admin"
        }
    ],
    authError: false
};



const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_LOGOUT: {
            localStorage.removeItem('isAuth');
            localStorage.removeItem('authData');
            return{
                ...state,
                isAuth: false
            }
        }
        case ACCOUNT_LOGIN: {
            // Проверка логина
            let loginCheck = null;
            let passwordCheck = null;

            state.users.map( (item) => item.login).includes(action.payload.login)
                ? loginCheck = true
                : loginCheck = false

            // Проверка пароля
            state.users.map( (item) => item.password).includes(action.payload.password)
                ? passwordCheck = true 
                : passwordCheck = false


            if(loginCheck && passwordCheck){ // проверка на авторизацию
                // console.log("Авторизация произошла успешно");
                let getAuthData = state.users.filter(item=> item.login.includes(action.payload.login))[0]; // получить польз-ля на основе полученных данных
                // localStorage.setItem('authData', JSON.stringify(action.payload)); // только пароль и логин
                localStorage.setItem('authData', JSON.stringify(getAuthData)); // пар, лог, и статус админа в кэш
                localStorage.setItem('isAuth', JSON.stringify({isAuth: true})); // явлется ли зарег-м на данный момент в кэш

                
                return{
                    ...state, 
                    isAuth: true,
                    authError: false
                }
            } else{ 
                // console.log("Не правильный логин или пароль");
                return{
                    ...state,
                    authError: true
                }
            }
            

            
        }

        default:
            return state;
    }
    
}

const ACCOUNT_LOGOUT = "ACCOUNT_LOGOUT";
const ACCOUNT_LOGIN = "ACCOUNT_LOGIN";


export let accountLogout = () => ({type: ACCOUNT_LOGOUT});
export let accountLogin = (login, password) => ({type: ACCOUNT_LOGIN, 
    payload: {login: login, password: password} });


export default authReducer;