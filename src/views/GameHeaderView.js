import './Game.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { moveStep } from '../reducers/reducers';

const GameHeader = ({ moveStep }) => {
    const [timeout, setTimeout] = useState(90000);
    useEffect(() => {
        const int = setInterval(() => setTimeout(timeout - 1000), 1000);
        return () => clearInterval(int);
    });
    return (
        <header className="game-header">
            <div className="game-title">
                <p>¡Completa el rompecabezas!</p>
                <button className="game-button" onTouchEnd={() => moveStep('intro')} onClick={() => moveStep('intro')}>
                    Empieza de nuevo
                </button>
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
