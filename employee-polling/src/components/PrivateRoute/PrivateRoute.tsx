import {FC, useState} from 'react';
import {PrivateRouteProps} from "../../models/components/props.ts";
import {reducer} from "../../reducers/reducer.ts";
import {connect} from "react-redux";
import {Alert} from "react-bootstrap";
import {Link} from "react-router-dom";

const PrivateRoute: FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
    const [showAlert, setShowAlert] = useState<boolean>(!props.authenticated);

    const handleCloseAlert = () => {
        setShowAlert(false);
    }

    return  props.authenticated ? props.children :  (
        <Alert variant="danger" show={showAlert} onClose={handleCloseAlert} dismissible>
            <Alert.Heading>Error!</Alert.Heading>
            <p>Please login before access to this page, click <Link to={"/"}>here</Link> to return to login page.</p>
        </Alert>
    );
};

const mapStateToProps = (state: ReturnType<typeof reducer>) => {
    return {
        authenticated: !!state.authenticatedUser,
    }
}

export default connect(mapStateToProps)(PrivateRoute);