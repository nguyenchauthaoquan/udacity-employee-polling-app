import {FC} from 'react';
import {DashBoardProps} from "../../models/components/props.ts";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {reducer} from "../../reducers/reducer.ts";
import {connect} from "react-redux";
import Question from "../../models/data/question.ts";
import moment from "moment";
import User from "../../models/data/user.ts";
import {Link, useNavigate} from "react-router-dom";

const DashBoard: FC<DashBoardProps> = (props: DashBoardProps) => {
    const navigate = useNavigate();

    return (
        <>
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Header className={"text-center"}>
                            <Card.Title data-testid="dashboard-heading">New Questions</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Container>
                                <Row>
                                    {
                                        props.questions?.filter((question: Question) => props.user && !question.optionOne.votes.includes(props.user.id)
                                            && !question.optionTwo.votes.includes(props.user.id)).map((question: Question) =>
                                            <Col md={4} className={"mt-2"} key={question.id}>
                                                <Link to={`question/${question.id}`}>
                                                    <Card>
                                                        <Card.Body>
                                                            <Card.Title className={"text-center"}>{question.author}</Card.Title>
                                                            <Card.Text className={"text-center"}>
                                                                {moment(question.timestamp).format("hh:mm:A | MM/DD/YYYY")}
                                                            </Card.Text>
                                                        </Card.Body>
                                                        <Card.Footer>
                                                            <Button variant={"outline-success"} className={"d-block w-100"} onClick={() => navigate(`/question/${question.id}`)}>Show</Button>
                                                        </Card.Footer>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className={"mt-3"}>
                <Col md={12}>
                    <Card>
                        <Card.Header className={"text-center"}>
                            <Card.Title>Done</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Container>
                                <Row>
                                    {
                                        props.questions?.filter((question: Question) => props.user && (question.optionOne.votes.includes(props.user.id)
                                            || question.optionTwo.votes.includes(props.user.id))).map((question: Question) =>
                                            <Col md={4} className={"mt-2"} key={question.id}>
                                                <Link to={`question/${question.id}`}>
                                                    <Card>
                                                        <Card.Body>
                                                            <Card.Title className={"text-center"}>{question.author}</Card.Title>
                                                            <Card.Text className={"text-center"}>
                                                                {moment(question.timestamp).format("hh:mm:A | DD/MM/YYYY")}
                                                            </Card.Text>
                                                        </Card.Body>
                                                        <Card.Footer>
                                                            <Button variant={"outline-success"} className={"d-block w-100"} onClick={() => navigate(`/question/${question.id}`)}>Show</Button>
                                                        </Card.Footer>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

const mapStateToProps = (state: ReturnType<typeof reducer>): DashBoardProps => {
    return {
        user: state.authenticatedUser as User,
        users: state.users,
        questions: Object.values(state.questions as Question).sort((a, b) => b.timestamp - a.timestamp)
    }
}

export default connect(mapStateToProps)(DashBoard);