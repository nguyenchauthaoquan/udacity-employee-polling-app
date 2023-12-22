import {ChangeEvent, FC, FormEvent, useState} from 'react';
import {LoginProps} from "../../models/components/props.ts";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {handleLogin} from "../../actions/actions.ts";
import {ThunkDispatch} from "redux-thunk";
import {reducer} from "../../reducers/reducer.ts";
import {Action} from "../../models/components/action.ts";

const Login: FC<LoginProps> = (props: LoginProps) => {
    const navigate = useNavigate();


    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        props.login(username, password)

        navigate("/home")
    }

    return (
        <>
            <Container>
                <Row>
                    <Col sm={12} className={"d-flex justify-content-center"}>
                        <h3>Employee Polls</h3>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className={"d-flex justify-content-center"}>
                        <h3 data-testid="login-heading">Login</h3>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>User</Form.Label>
                                <Form.Control data-testid="username" type="text" placeholder="User" value={username} onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control data-testid="password" type="password" placeholder="Password" value={password} onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} />
                            </Form.Group>
                            <Button variant="light" type="submit" data-testid="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

const mapStateToProps = (state: ReturnType<typeof reducer>) => {
    return {
        authenticated: !!state.authenticatedUser
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<ReturnType<typeof reducer>, never, Action>) => {
    return {
        login: (username: string, password: string) => {
            dispatch(handleLogin(username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);