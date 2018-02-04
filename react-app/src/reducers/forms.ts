import { AnyAction } from 'redux';
import { JoinPlanning, Presentation } from '../store/forms';

const defaultState = {
    join_planning: new JoinPlanning(),
    presentation: new Presentation()
};

const form = (state = defaultState, action: AnyAction) => {
    switch (action.type) {
        case 'CHANGE_FIELD':
            return {
                ...state,
                [action.form]: {
                    ...state[action.form],
                    [action.field]: action.value
                }
            };
        case 'CANCEL_FORM':
            return {
                ...state,
                [action.form]: {...defaultState[action.form]}
            };
        default:
            return state;
    }
};

export default form;