import {FC} from "react";
import {PollPageProps} from "../../models/components/props.ts";
import {connect} from "react-redux";
import {handleSaveAnswerQuestion} from "../../actions/actions.ts";
import {useNavigate, useParams} from "react-router-dom";
import Question from "../../models/data/question.ts";
import {ThunkDispatch} from "redux-thunk";
import {reducer} from "../../reducers/reducer.ts";
import {Action} from "../../models/components/action.ts";
import {Button, Col, ProgressBar, Row} from "react-bootstrap";
import User from "../../models/data/user.ts";

const PollPage: FC<PollPageProps> = (props: PollPageProps) => {
    const navigate = useNavigate();
    const param = useParams();

    const question = Object.values(props.questions as Record<string, Question>).find((question: Question) => question.id === param.id) as Question;
    const user = Object.values(props.users as Record<string, User>).find((user: User) => user.id === question.author) as User

    const handleQuestionOne = () => {
        props.addAnswer && props.addAnswer(question.id, "optionOne");
        navigate("/home")
    }
    const handleQuestionTwo = () => {
        props.addAnswer && props.addAnswer(question.id, "optionTwo");
        navigate("/home")
    }

    const calculatePercentage = (option: string, question: Question) => {
        const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length;

        switch (option) {
            case "optionOne":
                return question.optionOne.votes.length / numberVotesTotal * 100 + " %";
            case "optionTwo":
                return question.optionTwo.votes.length / numberVotesTotal * 100 + " %";
            default:
                return "";
        }
    };

    const hasVotedForOptionOne = props.user && question.optionOne.votes.includes(props.user?.id);
    const hasVotedForOptionTwo = props.user && question.optionTwo.votes.includes(props.user?.id);
    const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

    return (
        <Row>
            <Col md={12} className={"text-center"}>
                <h3>Poll by {user?.id}</h3>
            </Col>
            <Col md={12} className={"d-flex justify-content-center"}>
                <img src={user?.avatarURL} alt="logo" width={100} height={100}/>
            </Col>
            <Col md={6}>
                <Button disabled={hasVoted} variant={hasVotedForOptionOne ? "success" : ""} onClick={handleQuestionOne}>
                    {question.optionOne.text} {hasVoted && <><p>{question.optionOne.votes.length}</p><p>{calculatePercentage("optionOne", question)}</p></>}
                </Button>
                <Button disabled={hasVoted} variant={hasVotedForOptionTwo ? "success" : ""} onClick={handleQuestionTwo}>
                    {question.optionTwo.text} {hasVoted && <><p>{question.optionTwo.votes.length}</p><p>{calculatePercentage("optionTwo", question)}</p></>}
                </Button>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state: ReturnType<typeof reducer>, props: PollPageProps): PollPageProps => {
    return {
        ...props,
        users: state.users,
        user: state.authenticatedUser as User,
        questions: state.questions as Record<string, Question>
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<ReturnType<typeof reducer>, never, Action>) => {
    return {
        addAnswer: (questionId: string, answer: string) => {
            dispatch(handleSaveAnswerQuestion(questionId, answer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollPage);