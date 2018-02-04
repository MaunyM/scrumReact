import * as React from 'react';
import { connect } from 'react-redux';

import { ScrumState } from '../store';

import './Join.css';
import { Card } from 'semantic-ui-react';

import './Card.css';
import { Card as CardType } from '../store/type';

class Props {
    back?: boolean;
    card?: CardType;
    onClick?: () => void;
}

const CardComponent = (props: Props) => (
    <Card className={'poker'} onClick={props.onClick}>
        {!props.back && props.card ? (
            <Card.Content>
                {props.card.value}
            </Card.Content>
        ) : (
            <Card.Content className={'back'}>
                Agile
            </Card.Content>
        )
        }
    </Card>
);

export default connect(
    (state: ScrumState, ownProps) => ({}),
    dispatch => ({})
)(CardComponent);