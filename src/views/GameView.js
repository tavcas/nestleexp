import './Game.css';
import { connect } from 'react-redux';
import { NumImages } from '../constants';
import { fetchHighScoreList } from '../reducers/thunks';
import PuzzleView from './PuzzleView';
import PropTypes from 'prop-types';
// import LeaderBoardView from './LeaderBoardView';
import GameHeaderView from './GameHeaderView';
// import RestartButtonsView from './RestartButtonsView';
import { initGame, moveStep } from '../reducers/reducers';
import { useEffect } from 'react';

const Game = ({ gameName, gameComplete, moveStep }) => {
    useEffect(() => {
        if (gameComplete) {
            moveStep('win');
        }
    }, [gameComplete]);
    return (
        <div className="game">
            <PuzzleView />
            <GameHeaderView key="full" gameName={gameName} />
        </div>
    );
};

Game.propTypes = {
    gameName: PropTypes.string,
    highScoreList: PropTypes.object,
    onInitGame: PropTypes.func,
    gameComplete: PropTypes.bool,
    moveStep: PropTypes.func
};

const mapStateToProps = state => {
    return {
        gameName: state.tileGame.gameName,
        highScoreList: state.tileGame.highScoreList,
        gameComplete: state.tileGame.gameComplete
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitGame: gameId => {
            dispatch(initGame({ gameId, imageNumber: Math.floor(Math.random() * NumImages) + 1, doShuffling: true }));
            dispatch(fetchHighScoreList);
        },

        moveStep: step => {
            dispatch(moveStep({ step }));
        }
    };
};

const GameView = connect(mapStateToProps, mapDispatchToProps)(Game);

export default GameView;
