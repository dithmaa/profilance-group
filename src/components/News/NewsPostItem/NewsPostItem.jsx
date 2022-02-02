
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import css from './NewsPostItem.module.scss';
class NewsPostItem extends React.Component {
    constructor(props){
        super(props)
    }
    agreePost = (postPos) => {
        this.props.agreePost(postPos);
    }

    render() {
        
        let newsPostText = this.props.text

        {
            if(newsPostText.length >= 300){
                newsPostText = newsPostText.substr(0,300) + ' ...'
            }
        }

        return (

        


            <Link to={"post/" + this.props.id} className={css.newsPost}>

                {
                    // Показывать настройки одобрения только администратору
                }
                {
                    this.props.isShowNow
                    && <div className={css.newsPostAgree + ' flex jcsb'}>
                        {
                            this.props.isAgree
                                ? <span className={css.newsPostIsAgree}>Одобрен</span>
                                : <span className={css.newsPostIsNotAgree}>Не одобрен</span>
                        }
                        {
                            !this.props.isAgree
                                ? <button className={css.newsPostAgreeBtn}
                                    onClick={() => this.agreePost(this.props.pos)}>
                                    Одобрить
                                </button>
                                : null
                        }
                    </div>
                }

                <span className={css.newsPostDate}>

                    {
                        this.props.postDate.length !== 0
                            ?
                            this.props.day + ' ' + this.props.month + ' в ' +
                            this.props.minutes + ":" + this.props.seconds
                            : null
                    }
                </span>
                <h3 className={css.newsPostTitle}>{this.props.title}</h3>
                <p className={css.newsPostText}>
                    
                    {
                        newsPostText
                    }
                </p>



            </Link>




        )
    }
}
export default NewsPostItem;