import {FC} from 'react';
import {PrivateRouteProps} from "../../models/components/props.ts";
import {reducer} from "../../reducers/reducer.ts";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

const PrivateRoute: FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
    return  props.authenticated ? props.children :  <Navigate to={`/`}/>;
};

const mapStateToProps = (state: ReturnType<typeof reducer>) => {
    return {
        authenticated: !!state.authenticatedUser,
    }
}

export default connect(mapStateToProps)(PrivateRoute);