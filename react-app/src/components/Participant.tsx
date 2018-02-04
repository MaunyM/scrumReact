import * as React from 'react';
import { connect } from 'react-redux';

import { ScrumState } from '../store';
import { Participant } from '../store/type';

import CardComponent from './Card';

import './Participant.css';

interface Props {
    showYourCard: boolean;
    participant: Participant;
}

const ParticipantComponent = (props: Props) => (
    <div className={'ui participant'}>
        {props.participant.name ? (
            <span>{props.participant.name} {props.participant.vote && <i className="checkmark icon"/>}</span>
        ) : (
            <i className="spy icon"/>
        )}
        <CardComponent card={props.participant.vote} back={!props.showYourCard}/>
    </div>
);

export default connect(
    (state: ScrumState, ownProps) => ({}),
    dispatch => ({})
)(ParticipantComponent);