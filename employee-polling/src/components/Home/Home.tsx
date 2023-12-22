import {FC} from 'react';
import {DashBoardProps, HomeProps} from "../../models/components/props.ts";
import DashBoard from "../DashBoard/DashBoard.tsx";
import {connect} from "react-redux";
import {reducer} from "../../reducers/reducer.ts";
import User from "../../models/data/user.ts";
import Question from "../../models/data/question.ts";

const Home: FC<HomeProps> = () => {
    return (
        <DashBoard  />
    );
}

const mapStateToProps = (state: ReturnType<typeof reducer>): DashBoardProps => {
    return {
        user: state.authenticatedUser as User,
        users: state.users,
        questions: Object.values(state.questions as Question).sort((a, b) => b.timestamp - a.timestamp)
    }
}

export default connect(mapStateToProps)(Home);