import { ActionsObservable, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { Action } from 'redux';

import * as io from 'socket.io-client';

import 'rxjs/add/operator/mergeMap';
import { Planning } from '../store/type';
import { ChangeMeAction, JoinPlanningAction, ScrumAction } from './index';
import { Subscriber } from 'rxjs/Subscriber';
import { push } from 'react-router-redux';

let socket: SocketIOClient.Socket;

const createPlanning = (action$: ActionsObservable<Action>) =>
    action$.ofType('CREATE_PLANNING')
        .mergeMap((action: Action) =>
            new Observable((observer: Subscriber<ScrumAction>) => {
                socket = io('http://localhost:4000');

                socket.on('planning_created', (data: Planning) => {
                    observer.next({type: 'PLANNING_CREATED', data});
                    observer.next(push('/waitingRoom'));

                });
                socket.on('planning_changed', (data: Planning) => {
                    observer.next({type: 'PLANNING_CHANGED', data});
                });
                socket.on('connect', (data: string) => {
                    observer.next({type: 'CONNECTED'});
                    socket.emit('create_planning');
                });
            })
        );

const joinPlanning = (action$: ActionsObservable<Action>) =>
    action$.ofType('JOIN_PLANNING')
        .mergeMap((action: JoinPlanningAction) =>
            new Observable((observer: Subscriber<ScrumAction>) => {
                socket = io('http://localhost:4000');

                socket.on('planning_joined', (data: Planning) => {
                    observer.next({type: 'PLANNING_JOINED', data});
                    observer.next(push('/presentationRoom'));
                });
                socket.on('connect', (data: string) => {
                    observer.next({type: 'CONNECTED'});
                    socket.emit('join_planning', action.data);
                });
            })
        );

const meChange = (action$: ActionsObservable<Action>) =>
    action$.ofType('CHANGE_ME')
        .mergeMap((action: ChangeMeAction) =>
            new Observable((observer: Subscriber<ScrumAction>) => {
                socket.emit('me_change', action);
                socket.on('me_changed', (data: Planning) => {
                    observer.next({type: 'PLANNING_CHANGED', data});
                });
            })
        );

export const scrumEpic = combineEpics(
    createPlanning,
    joinPlanning,
    meChange
);