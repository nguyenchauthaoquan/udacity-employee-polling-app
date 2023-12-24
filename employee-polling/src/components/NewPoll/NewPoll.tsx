import {ChangeEvent, FC, FormEvent, useState} from 'react';
import {NewPollProps} from "../../models/components/props.ts";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {handleSaveQuestion} from "../../actions/actions.ts";
import {ThunkDispatch} from "redux-thunk";
import {reducer} from "../../reducers/reducer.ts";
import {Action} from "../../models/components/action.ts";
import {useNavigate} from "react-router-dom";

const NewPoll: FC<NewPollProps> = (props: NewPollProps) => {
    const navigate = useNavigate();
    const [optionOne, setOptionOne] = useState<string>("");
    const [optionTwo, setOptionTwo] = useState<string>("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.addQuestion(optionOne, optionTwo);

        navigate("/")
    }

    return (
        <Container data-testid="new-poll">
            <Row>
                <Col md={12} className={"text-center"}>
                    <h3>Would you rather</h3>
                </Col>
            </Row>
            <Row>
                <Col md={12} className={"text-center"}>
                    <span className={"text-secondary"}>Create Your Own Poll</span>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
                        <Form.Group className="mb-3" controlId="first-option">
                            <Form.Label data-testid={"first-option-label"}>First Option</Form.Label>
                            <Form.Control data-testid={"first-option-input"} type="text" value={optionOne} onChange={(event: ChangeEvent<HTMLInputElement>) => setOptionOne(event.target.value)} placeholder="Option One" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="second-option">
                            <Form.Label data-testid={"second-option-label"}>Second Option</Form.Label>
                            <Form.Control data-testid={"second-option-input"} type="text" value={optionTwo} onChange={(event: ChangeEvent<HTMLInputElement>) => setOptionTwo(event.target.value)} placeholder="Option Two" />
                        </Form.Group>
                        <Button variant="light" type="submit" data-testid={"poll-submit-btn"}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state: ReturnType<typeof reducer>) => {
    return {
        questions: state.questions
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<ReturnType<typeof reducer>, never, Action>) => {
    return {
        addQuestion: (firstOption: string, secondOption: string) => {
            dispatch(handleSaveQuestion(firstOption, secondOption));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPoll);