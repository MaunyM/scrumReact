class JoinPlanning {
    connectNumber: string = '';
}

class Presentation {
    name: string = '';
}

interface Forms {
    join_planning: JoinPlanning;
    presentation: Presentation;
}

export { Forms, JoinPlanning, Presentation };