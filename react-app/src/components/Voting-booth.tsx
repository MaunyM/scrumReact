import * as React from 'react';
import { Card, CardDeck, Participant } from '../store/type';
import { ScrumState } from '../store';
import { connect } from 'react-redux';
import CardComponent from './Card';

import './Voting-booth.css';

interface Props {
    me: Participant;
    connectNumber: number;
    deck: CardDeck;
    voting: (p: Participant, c: Card, n: Number) => void;
}

const VotingBoothComponent = (props: Props) => (
    <div>
        <div className={'votingBoothContainer'}>
            {props.deck.map(
                (card: Card) => <CardComponent
                    key={card.value}
                    card={card}
                    onClick={() => props.voting(props.me, card, props.connectNumber)}
                />
            )}
        </div>
    </div>);

export default connect(
    (state: ScrumState, ownProps) => ({
        me: state.me,
        connectNumber: state.planning.connectNumber,
        deck: state.deck
    }),
    dispatch => ({
        voting: (me: Participant, card: Card, connectNumber: number) => {
            const newMe = {...me, vote: card};
            dispatch({type: 'CHANGE_ME', me: newMe, connectNumber});
        }
    })
)(VotingBoothComponent);