

import { useMatch } from "react-router-dom";

export const withRouter = (Component) =>{

    let RouterComponent = (props) => {
        const match = useMatch('/news/post/:postId/');
        return <Component {...props} match={match}/>;
    }
    return RouterComponent;
    
}

