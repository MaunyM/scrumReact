import { AnyAction } from 'redux';
import { Planning } from '../store/type';

const planningReducer = (state: Planning = new Planning(), action: AnyAction) => {
    switch (action.type) {
        case 'PLANNING_CREATED' :
            return {...state, ...action.data};
        case 'PLANNING_CHANGED':
            return action.data;
        case 'PLANNING_JOINED' :
            return action.data;
        default :
            return state;
    }
};

export default planningReducer;