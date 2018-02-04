import * as React from 'react';
import { Input, Button } from 'semantic-ui-react';
import { Presentation } from '../store/forms';
import { connect } from 'react-redux';
import { ScrumState } from '../store';
import { changeField } from '../actions/forms';
import { Participant } from '../store/type';

import './Presentation-room.css';
import { push } from 'react-router-redux';

interface Props {
    presentation: Presentation;
    me: Participant;
    connectNumber: number;
    onChange: () => void;
    onGoClick: (c: number, m: Participant, p: Presentation) => void;
}

const PresentationRoom = (props: Props) => (
    <div className="presentationRoomComponent">
        <h3>Hello !</h3>
        <h3>What's your name ?</h3>
        <Input
            value={props.presentation.name}
            onChange={props.onChange}
            name="name"
        />
        <Button
            className="primary"
            onClick={() => props.onGoClick(props.connectNumber, props.me, props.presentation)}
        >
            Go
        </Button>
    </div>
);

export default connect(
    (state: ScrumState) => ({
        connectNumber: state.planning.connectNumber,
        me: state.me,
        presentation: state.forms.presentation
    }),
    (dispatch) => ({
        onGoClick: (connectNumber: number, me: Participant, presentation: Presentation) => {
            const newMe = {...me, name: presentation.name};
            dispatch({type: 'CHANGE_ME', me: newMe, connectNumber});
            dispatch(push('/votingBooth'));
        },
        onChange: (e: React.FormEvent<HTMLInputElement>) => {
            dispatch(changeField('presentation', e.currentTarget.name, e.currentTarget.value));

        }
    })
)(PresentationRoom);