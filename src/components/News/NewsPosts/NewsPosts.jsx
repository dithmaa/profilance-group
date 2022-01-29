
import React from 'react';
import css from './NewsPosts.module.scss';
class NewsPosts extends React.Component {
    agreePost = (postPos) => {
        this.props.agreePost(postPos);
    }
    render(){
        return (
            <div className={css.newsPost} key={this.props.id}>
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
                                    onClick={()=>this.agreePost(this.props.pos)}>
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
                <p className={css.newsPostText}>{this.props.text}</p>
    
    
            </div>
        )
    }
}
export default NewsPosts;