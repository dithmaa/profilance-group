
import css from './NewsPosts.module.scss';
const NewsPosts = (props) => {
    return (
        <div className={css.newsPost} key={props.id}>

            <span className={css.newsPostDate}>

                {
                props.postDate.length !== 0
                ?
                props.day + ' ' + props.month + ' в ' +
                    props.minutes + ":" + props.seconds
                : null 
                }
            </span>
            <h3 className={css.newsPostTitle}>{props.title}</h3>
            <p className={css.newsPostText}>{props.text}</p>
        </div>
    )
}
export default NewsPosts;