import {Action} from "../models/components/action.ts";
import {GET_QUESTIONS, SAVE_ANSWERS_QUESTION, SAVE_QUESTION} from "../constants/constants.ts";
import Question from "../models/data/question.ts";
import User from "../models/data/user.ts";
import Option from "../models/data/option.ts";

export default function questionsReducer (state = {}, action: Action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.payload
            };
        case SAVE_QUESTION:
            return {
                ...state,
                [(action.payload as Question).id]: action.payload
            };
        case SAVE_ANSWERS_QUESTION:
            return {
                ...state,
                [(action.payload as {author: string,
                    qid: string,
                    answer: string}).qid]: {
                    ...(state as Record<string, Question>)[(action.payload as {author: string,
                        qid: string,
                        answer: string}).qid],
                    [(action.payload as {author: string,
                        qid: string,
                        answer: string}).answer]: {
                        ...(state as Record<string,Record<string, User>>)[(action.payload as {author: string,
                            qid: string,
                            answer: string}).qid][(action.payload as {author: string,
                            qid: string,
                            answer: string}).answer],
                        votes: (state as Record<string,Record<string, Option>>)[(action.payload as {author: string,
                            qid: string,
                            answer: string}).qid][(action.payload as {author: string,
                            qid: string,
                            answer: string}).answer].votes.concat((action.payload as {author: string,
                            qid: string,
                            answer: string}).author)
                    }
                }
            }
        default:
            return state;
    }
}