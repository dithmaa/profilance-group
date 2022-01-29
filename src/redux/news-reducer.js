let newsPostsArr;

JSON.parse(localStorage.getItem('newsPosts'))  // если есть в Local Storage, Возьми оттуда
    ? newsPostsArr = JSON.parse(localStorage.getItem('newsPosts')) // Если нет, то вот по дефолту
    : newsPostsArr = [
        {
            id: 1,
            title: 'Пост 1. Что такое React?',
            text: 'React — JavaScript-библиотека с открытым исходным кодом для разработки пользовательских интерфейсов. React разрабатывается и поддерживается Facebook, Instagram и сообществом отдельных разработчиков и корпораций. React может использоваться для разработки одностраничных и мобильных приложений',
            postDate: [27, 0, 15, 30], // day month hour minutes
            isAgree: true, // Эту штуку меняет только Админ аккаунт. Юзер не имеет доступа к ней
            isShowNow: false // эта штука true, только у Админ Аккаунта. У юзера всегда false
        },
        {
            id: 2,
            title: 'Пост 2. Что такое Axios',
            text: 'Axios — это широко известная JavaScript-библиотека. Она представляет собой HTTP-клиент, основанный на промисах и предназначенный для браузеров и для Node. js.',
            postDate: [27, 0, 15, 30],
            isAgree: false,
            isShowNow: false
        },
        {
            id: 3,
            title: 'Пост 3. Почему нужно учить Хуки в 2022 году?',
            text: 'Хуки позволяют повторно использовать логику состояния без изменения иерархии компонентов. Это облегчает обмен ссылками между многими компонентами или всей системы в целом. ... Хуки позволяют делать тоже самое разбивая логику между компонентами на маленькие функции и использовать их внутри компонентов.',
            postDate: [27, 0, 15, 30],
            isAgree: false,
            isShowNow: false
        },
        {
            id: 4,
            title: 'Docker это',
            text: 'Docker — программное обеспечение для автоматизации развёртывания и управления приложениями в средах с поддержкой контейнеризации, контейнеризатор приложений.',
            postDate: [28, 0, 22, 6],
            isAgree: false,
            isShowNow: false
        },
        {
            id: 5,
            title: 'React Acync',
            text: 'React Async — это библиотека на основе promise, которая позволяет извлекать данные в приложении React. Давайте рассмотрим различные примеры с использованием компонентов, хуков и вспомогательных функций, чтобы понять, как мы можем реализовать загрузку состояния при выполнении запросов.',
            postDate: [28, 0, 22, 6],
            isAgree: false,
            isShowNow: false
        },
        {
            id: 6,
            title: 'Ветка в Git',
            text: '— это простой перемещаемый указатель на один из таких коммитов. По умолчанию, имя основной ветки в Git — master . Как только вы начнёте создавать коммиты, ветка master будет всегда указывать на последний коммит.',
            postDate: [28, 0, 22, 6],
            isAgree: false,
            isShowNow: false
        }
    ]



let initialState = {
    newsPosts: newsPostsArr, // типо та, над которой издеваются во время поиска
    originalNewsPosts: newsPostsArr, // типо резервная
    searchValue: '',
    isShowSearch: false,
    showSearchAlert: false
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
                postDate: postDateNow,
                isAgree: false
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
        // Поиск только новостей, ничего другого
        case SEARCH_NEWS:{
            

            let showSearchAlert = false;

            let wasAgreed = state.originalNewsPosts
            .filter(post => post.isAgree === true);

            let newsPostsSearched = wasAgreed
            .filter(post => post.title.toLowerCase().includes(action.searchNewsBody.toLowerCase()));



            newsPostsSearched.length === 0
            ? showSearchAlert = true
            : showSearchAlert = false


            return{
                ...state,
                newsPosts: newsPostsSearched,
                showSearchAlert: showSearchAlert
            }
        }

        case SHOW_SEARCH: {
            return{
                ...state,
                isShowSearch: true
            }
        }
        case HIDE_SEARCH: {
            return{
                ...state,
                isShowSearch: false
            }
        }
        case AGREE_POST: {
            const temp = [...state.newsPosts];
            temp[action.postPos].isAgree = true; 
            console.log('Успешно засеталось');
            localStorage.setItem('newsPosts', JSON.stringify(temp));
            return{
                ...state,
                newsPosts: temp

            }
        }

        default:
            return state;
    }
    
}

const ADD_NEWS_POST = "ADD_NEWS_POST";
const HANDLE_SEARCH_VALUE = "HANDLE_SEARCH_VALUE";
const SEARCH_NEWS = "SEARCH_NEWS";
const SHOW_SEARCH = "SHOW_SEARCH";
const HIDE_SEARCH = "HIDE_SEARCH";
const AGREE_POST = "AGREE_POST";


export let addNewsPost = (postTitle, postText) => ({type: ADD_NEWS_POST, 
    payload:{title: postTitle, text: postText}});
export let handleSearchValue = (newSearchValue) => ({type: HANDLE_SEARCH_VALUE, newSearchValue}); 
export let searchNews = (searchNewsBody) => ({type: SEARCH_NEWS, searchNewsBody}); 
export let showSearch = () => ({type: SHOW_SEARCH}); 
export let hideSearch = () => ({type: HIDE_SEARCH}); 
export let agreePost = (postPos) => ({type: AGREE_POST, postPos}); // Только для администратора


export default newsReducer;