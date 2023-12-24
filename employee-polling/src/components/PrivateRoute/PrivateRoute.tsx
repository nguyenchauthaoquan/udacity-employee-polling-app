import {FC} from 'react';
import {PrivateRouteProps} from "../../models/components/props.ts";
import {reducer} from "../../reducers/reducer.ts";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

const PrivateRoute: FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
    const redirectUrl = window.location.href.toString().split(window.location.host)[1];
    console.log(redirectUrl)
    return  props.authenticated ? props.children :  (
        <Navigate to={`/login?redirectTo=${redirectUrl}`} />
    );
};

const mapStateToProps = (state: ReturnType<typeof reducer>) => {
    return {
        authenticated: !!state.authenticatedUser,
    }
}

export default connect(mapStateToProps)(PrivateRoute);