let newsPosts;

JSON.parse(localStorage.getItem('newsPosts')) 
? console.log(JSON.parse(localStorage.getItem('newsPosts')).title)
: console.log('')


let initialState = {
    newsPosts: [
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
                id: 4,
                title: action.payload.title,
                text: action.payload.text,
                postDate: postDateNow
            }
            console.log(postElement);
            localStorage.setItem('newsPosts', JSON.stringify(postElement));
            return{
                ...state, 
                newsPosts: [...state.newsPosts, postElement]
            }
        }
        default:
            return state;
    }
    
}

const ADD_NEWS_POST = "ADD_NEWS_POST";


export let addNewsPost = (postTitle, postText) => ({type: ADD_NEWS_POST, payload:{title: postTitle, text: postText}});

export default newsReducer;