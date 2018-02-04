import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { push } from 'react-router-redux';
import './App.css';

import { ScrumState } from './store';

import { Header } from 'semantic-ui-react';
import WaitingRoom from './components/Waiting-room';
import Choice from './components/Choice';
import PresentationRoom from './components/Presentation-room';
import VotingBooth from './components/Voting-booth';

interface Props {
    onHeaderClick: () => void;
}

const App = (props: Props) => (
    <div className="App">
        <Header as="h2" onClick={props.onHeaderClick} >Planning poker</Header>
        <div className="container">
            <div className="column"/>
            <div>
                <Route exact={true} path="/" component={Choice}/>

                <Route path="/presentationRoom" component={PresentationRoom}/>
            </div>
            <div className="column"/>
        </div>
        <Route path="/votingBooth" component={VotingBooth}/>
        <Route path="/waitingRoom" component={WaitingRoom}/>
    </div>);

export default connect(
    (state: ScrumState, ownProps) => ({}),
    dispatch => ({
        onHeaderClick: () => dispatch(push(''))
    })
)(App);