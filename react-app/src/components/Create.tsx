import * as React from 'react';
import { ScrumState } from '../store';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

interface Props {
    onCreateClick?: () => void;
}

const Create = (props: Props) => (
    <Button className="normal" onClick={props.onCreateClick}>Create</Button>
);

export default connect(
    (state: ScrumState, ownProps) => ({}),
    dispatch => ({
        onCreateClick: () => dispatch({type: 'CREATE_PLANNING'}),
    })
)(Create);