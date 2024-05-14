import './Game.css';

import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NumImages, GameId_3x3 } from '../constants';
import { moveStep, initGame } from '../reducers/reducers';

const Splash = ({ moveStep, onInitGame }) => {
    useEffect(() => {
        onInitGame(GameId_3x3);
        const timeout = setTimeout(() => moveStep('start'), 2000);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <div className="game">
            <img className="splash" src="/splash.png" />
            <div>
                <h1>Nutricion manejada por expertos</h1>
                <h2>Brindando soluciones para cada necesidad</h2>
            </div>
        </div>
    );
};

Splash.propTypes = {
    moveStep: PropTypes.func,
    onInitGame: PropTypes.func
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        moveStep: step => {
            dispatch(moveStep({ step }));
        },
        onInitGame: gameId => {
            dispatch(initGame({ gameId, imageNumber: Math.floor(Math.random() * NumImages) + 1, doShuffling: true }));
        }
    };
};

const SplashView = connect(mapStateToProps, mapDispatchToProps)(Splash);

export default SplashView;
