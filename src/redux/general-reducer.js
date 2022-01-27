let initialState = {
    isShowLoginPopup: false
};

const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOGIN_POPUP: {
            return{
                ...state,
                isShowLoginPopup: true
            }
        }
        case HIDE_LOGIN_POPUP: {
            return{
                ...state,
                isShowLoginPopup: false
            }
        }

        default:
            return state;
    }
    
}

const SHOW_LOGIN_POPUP = "SHOW_LOGIN_POPUP";
const HIDE_LOGIN_POPUP = "HIDE_LOGIN_POPUP";


export let showLoginPopup = () => ({type: SHOW_LOGIN_POPUP});
export let hideLoginPopup = () => ({type: HIDE_LOGIN_POPUP});

export default generalReducer;