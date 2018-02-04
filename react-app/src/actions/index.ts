import { Action } from 'redux';
import { Participant, Planning } from '../store/type';
import { JoinPlanning } from '../store/forms';

class PlanningAction implements Action {
    type: string;
    data: Planning;
}

export class JoinPlanningAction implements Action {
    type: string;
    data: JoinPlanning;
}

export class ChangeMeAction implements Action {
    type: string;
    connectNumber: number;
    me: Participant;
}

export type ScrumAction = Action | PlanningAction | JoinPlanningAction | ChangeMeAction;