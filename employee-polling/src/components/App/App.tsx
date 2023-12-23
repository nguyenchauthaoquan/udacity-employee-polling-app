import {FC, useEffect} from 'react'
import {AppProps} from "../../models/components/props.ts";
import Login from "../Login/Login.tsx";
import {Route, Routes} from "react-router-dom";
import LeaderBoard from "../LeaderBoard/LeaderBoard.tsx";
import Home from "../Home/Home.tsx";
import NewPoll from "../NewPoll/NewPoll.tsx";
import {connect} from "react-redux";
import {getAppData} from "../../actions/actions.ts";
import {reducer} from "../../reducers/reducer.ts";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "../../models/components/action.ts";
import User from "../../models/data/user.ts";
import Layout from "../Layout/Layout.tsx";
import PollPage from "../PollPage/PollPage.tsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.tsx";
import PageNotFound from "../PageNotFound/PageNotFound.tsx";

const App: FC<AppProps> = (props: AppProps) => {
    useEffect(() => {
        props.getAppData()
    })
  return (
      <Layout>
          <Routes>
              <Route path={"/"} index={true} element={<Login/>}/>
              <Route path={"home"} element={<PrivateRoute><Home/></PrivateRoute>}/>
              <Route path={"leaderboard"} element={<PrivateRoute><LeaderBoard/></PrivateRoute>}/>
              <Route path={"add"} element={<PrivateRoute><NewPoll /></PrivateRoute>}/>
              <Route path={"question/:id"} element={<PrivateRoute><PollPage /></PrivateRoute>}/>
              <Route path={"*"} element={<PageNotFound />}/>
          </Routes>
      </Layout>
  )
}

const mapStateToProps = (state: ReturnType<typeof reducer>) => {
    return {
        user: state.authenticatedUser as User
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<ReturnType<typeof reducer>, never, Action>) => {
    return {
        getAppData: () => {
            return dispatch(getAppData())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
