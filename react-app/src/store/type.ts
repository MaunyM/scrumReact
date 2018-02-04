export class Participant {
    _id: string;
    name?: string;
    vote?: Card;
}

export class Card {
    value: string;
}

export type CardDeck = Card[];

export class Planning {
    name: string;
    connectNumber: number;
    participants: Participant[] = [];
}