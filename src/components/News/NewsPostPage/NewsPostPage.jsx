import { connect } from "react-redux";
import { withRouter } from "../../../hoc/withRouter";

const NewsPostPage = (props) => {
    let postId = props.match.params.postId;


    // Гениальное решение, до которого я не мог додуматься пол дня :)
    let newsPostsElement = props.newsPosts.filter(item=>item.id == postId)[0]; 
    console.log(newsPostsElement);


    return(
        <div>
            <h1>{newsPostsElement.title}</h1>
            <p>{newsPostsElement.text}</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        newsPosts: state.newsPage.newsPosts
    }
}

export default withRouter(connect(mapStateToProps,{})(NewsPostPage));