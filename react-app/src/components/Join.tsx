import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';

import { JoinPlanning } from '../store/forms';
import { ScrumState } from '../store';
import { changeField } from '../actions/forms';

import './Join.css';

interface Props {
    join_planning: JoinPlanning;
    onJoinClick: (e: JoinPlanning) => void;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Join = (props: Props) => (
    <div className="joinComponent">
        <Input
            maxLength="6"
            type="tel"
            value={props.join_planning.connectNumber}
            onChange={props.onChange}
            name="connectNumber"
        />
        <Button className="primary" onClick={() => props.onJoinClick(props.join_planning)}>Join</Button>
    </div>
);

export default connect(
    (state: ScrumState, ownProps) => ({
        join_planning: state.forms.join_planning
    }),
    dispatch => ({
        onJoinClick: (data: JoinPlanning) => {
            dispatch({type: 'JOIN_PLANNING', data});
        },
        onChange: (e: React.FormEvent<HTMLInputElement>) => {
            dispatch(changeField('join_planning', e.currentTarget.name, e.currentTarget.value));
        }
    })
)(Join);