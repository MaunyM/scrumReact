import * as React from 'react';
import { Participant, Planning } from '../store/type';
import { ScrumState } from '../store';
import { connect } from 'react-redux';
import ParticipantComponent from './Participant';

import './Waiting-room.css';

interface Props {
    planning: Planning;
    everyBodyVote: boolean;
}

const WaitingRoom = (props: Props) => (
    <div>
        <h3>Welcome !</h3>
        <h3>The connect number is {props.planning ? props.planning.connectNumber : ''}</h3>
        <div className={'participantsContainer'}>
            {props.planning.participants.map(
                (participant: Participant) => <ParticipantComponent
                    key={participant._id}
                    participant={participant}
                    showYourCard={props.everyBodyVote}

                />
            )}
        </div>
    </div>);

export default connect(
    (state: ScrumState, ownProps) => ({
        planning: state.planning,
        everyBodyVote: state.planning.participants.every((participant: Participant) => participant.vote !== undefined)
    }),
    dispatch => ({})
)(WaitingRoom);