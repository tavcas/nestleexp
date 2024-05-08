import './Game.css';
import Countdown from 'react-countdown';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { moveStep } from '../reducers/reducers';

const GameHeader = ({ moves, moveStep }) => {
    const [timeout, setTimeout] = useState(60000);
    useEffect(() => {
        const int = setInterval(() => setTimeout(timeout - 1000), 1000);
        return () => clearInterval(int);
    });
    const renderer = ({ minutes, seconds }) => minutes * 60 + seconds;
    return (
        <header className="game-header">
            <div className="game-title">
                <h3>
                    <Countdown key="game-count" renderer={renderer} onComplete={() => moveStep('lose')} controlled={true} date={timeout} />{' '}
                </h3>
                <p>Completa el rompecabezas en segundos.</p>
                <sub>Haz realizado {moves} movimientos.</sub>
            </div>
        </header>
    );
};

GameHeader.propTypes = {
    moveStep: PropTypes.func,
    moves: PropTypes.number
};

const mapStateToProps = state => {
    return {
        moves: state.tileGame.moves
    };
};

const mapDispatchToProps = dispatch => {
    return {
        moveStep: step => {
            dispatch(moveStep({ step }));
        }
    };
};

const GameHeaderView = connect(mapStateToProps, mapDispatchToProps)(GameHeader);

export default GameHeaderView;
