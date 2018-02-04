import { AnyAction } from 'redux';
import { Participant, Planning } from '../store/type';

const meReducer = (state: Participant = new Participant(), action: AnyAction) => {
    switch (action.type) {
        case 'PLANNING_JOINED':
        return (action.data as Planning).participants[action.data.participants.length - 1];
        case 'CHANGE_ME':
            return action.me;
        default :
            return state;
    }
};

export default meReducer;