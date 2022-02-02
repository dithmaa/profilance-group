
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
    removePost =(postPos) => {
        this.props.removePost(postPos)
    }
    
    state = { 
        isShowMoreWindow: true
    }
    toggleShowMoreWindow = () => {
        this.setState((state)=>{
            return {
                isShowMoreWindow: !state.isShowMoreWindow
            }
        })
    }
    render() {
        
        let newsPostText = this.props.text

        {
            if(newsPostText.length >= 300){
                newsPostText = newsPostText.substr(0,300) + ' ...'
            }
        }

        return (


            <div className={css.newsPost}>
                {
                    this.state.isShowMoreWindow 
                    && <div className={css.newsPostMore} onClick={(e)=>e.preventDefault()} >
                        <button onClick={(postPos)=>this.removePost(this.props.pos)}>Удалить пост</button>
                        <button>Редактировать пост</button>
                    </div>
                }
                

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
                                ? <div>
                                    <button className={css.newsPostAgreeBtn}
                                        onClick={() => this.agreePost(this.props.pos)}>
                                        Одобрить
                                    </button>
                                    <button className={css.newsPostShowMore} onClick={this.toggleShowMoreWindow}>⁝</button>
                                </div>

                                : <div><button className={css.newsPostShowMore}
                                onClick={this.toggleShowMoreWindow}
                                >⁝</button></div>
                        }
                    </div>
                }

                <Link to={"post/" + this.props.id} className={css.newsPostContent}
                style={ this.props.isShowNow ? {"paddingTop": "0px"} : {"paddingTop": "20px"}}
                >
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



            </div>




        )
    }
}
export default NewsPostItem;