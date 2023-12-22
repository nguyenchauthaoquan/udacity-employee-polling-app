import {FC} from 'react';
import {LeaderBoardProps} from "../../models/components/props.ts";
import { connect } from 'react-redux';
import {Table} from "react-bootstrap";
import {reducer} from "../../reducers/reducer.ts";
import User from "../../models/data/user.ts";

const LeaderBoard: FC<LeaderBoardProps> = (props: LeaderBoardProps) => {
    return (
        <Table bordered responsive striped hover data-testid="leaderboard-table">
            <thead>
            <tr>
                <th>Users</th>
                <th>Answered</th>
                <th>Created</th>
            </tr>
            </thead>
            <tbody>
            {
                props.users?.map((user: User) =>
                    <tr key={user.id}>
                        <td className={"d-flex"}>
                            <div>
                                <img src={user.avatarURL} alt="logo" width={100} height={100}/>
                            </div>
                            <div className={"ms-3"}>
                                <h5 className="font-bold">{user.name}</h5>
                                <br/>{user.id}
                            </div>
                        </td>
                        <td>{Object.keys(user.answers).length}</td>
                        <td>{user.questions.length}</td>
                    </tr>
                )
            }

            </tbody>
        </Table>
    );
}

const mapStateToProps = (state: ReturnType<typeof reducer>) => {
    return {
        users: Object.values(state.users as User).sort((a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length)
    }
}

export default connect(mapStateToProps)(LeaderBoard);