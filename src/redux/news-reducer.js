let newsPostsArr;

JSON.parse(localStorage.getItem('newsPosts'))  // если есть в Local Storage, Возьми оттуда
    ? newsPostsArr = JSON.parse(localStorage.getItem('newsPosts')) // Если нет, то вот по дефолту
    : newsPostsArr = [
        {
            id: 1,
            title: 'Пост 1. Что такое React?',
            text: 'React — JavaScript-библиотека с открытым исходным кодом для разработки пользовательских интерфейсов. React разрабатывается и поддерживается Facebook, Instagram и сообществом отдельных разработчиков и корпораций. React может использоваться для разработки одностраничных и мобильных приложений',
            postDate: [27, 0, 15, 30]
        },
        {
            id: 2,
            title: 'Пост 2. Что такое Axios',
            text: 'Axios — это широко известная JavaScript-библиотека. Она представляет собой HTTP-клиент, основанный на промисах и предназначенный для браузеров и для Node. js.',
            postDate: [27, 0, 15, 30]
        },
        {
            id: 3,
            title: 'Пост 3. Почему нужно учить Хуки в 2022 году?',
            text: 'Хуки позволяют повторно использовать логику состояния без изменения иерархии компонентов. Это облегчает обмен ссылками между многими компонентами или всей системы в целом. ... Хуки позволяют делать тоже самое разбивая логику между компонентами на маленькие функции и использовать их внутри компонентов.',
            postDate: [27, 0, 15, 30]
        }
    ]



let initialState = {
    newsPosts: newsPostsArr, // типо та, над которой издеваются во время поиска
    original: newsPostsArr, // типо резервная
    searchValue: 'React'
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEWS_POST: {
            // получение даты
            let dateDay = new Date().getDate();
            let dateMonth = new Date().getMonth();
            let dateHours = new Date().getHours();
            let dateMinutes = new Date().getMinutes();

            let postDateNow = [dateDay, dateMonth, dateHours, dateMinutes];
            // создание поста
            let postElement = {
                id: state.newsPosts.length + 1,
                title: action.payload.title,
                text: action.payload.text,
                postDate: postDateNow
            }
            console.log(postElement);

            

            let temp = [...state.newsPosts, postElement];

            localStorage.setItem('newsPosts', JSON.stringify(temp));

            return{
                ...state, 
                newsPosts: temp
            }
        }
        case HANDLE_SEARCH_VALUE:{
            return{
                ...state, 
                searchValue: action.newSearchValue
            }
        }
        case SEARCH_NEWS:{
            

            let newsPostsSearched = state.original
            .filter(post => post.title.toLowerCase().includes(action.searchNewsBody.toLowerCase()))

            return{
                ...state,
                newsPosts: newsPostsSearched
            }
        }
        default:
            return state;
    }
    
}

const ADD_NEWS_POST = "ADD_NEWS_POST";
const HANDLE_SEARCH_VALUE = "HANDLE_SEARCH_VALUE";
const SEARCH_NEWS = "SEARCH_NEWS";


export let addNewsPost = (postTitle, postText) => ({type: ADD_NEWS_POST, 
    payload:{title: postTitle, text: postText}});
export let handleSearchValue = (newSearchValue) => ({type: HANDLE_SEARCH_VALUE, newSearchValue}); 
export let searchNews = (searchNewsBody) => ({type: SEARCH_NEWS, searchNewsBody}); 

export default newsReducer;