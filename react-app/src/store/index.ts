import { CardDeck, Participant, Planning } from './type';
import { Forms } from './forms';

interface ScrumState {
    planning: Planning;
    me: Participant;
    deck: CardDeck;
    forms: Forms;
}

export { ScrumState };