import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
  
/*
 * This component provides the router prop to the component it wraps. It is used in App.js, 
 * since App is a class component.
 */

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
        <Component
            {...props}
            router={{ location, navigate, params }}
        />
        );
    }

    return ComponentWithRouterProp;
}

export default withRouter;