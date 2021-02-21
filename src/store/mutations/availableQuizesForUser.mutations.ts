import {State} from "../../models/State";
import {Quiz} from "../../models/Quiz";

export const setAvailableQuizesForUserMutation = (state: State, quizes: Quiz[]) => {
    state.availableQuizesForUser = quizes
}
