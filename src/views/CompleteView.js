import './Game.css';

import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { moveStep } from '../reducers/reducers';

import * as feti from '@tsparticles/confetti';

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

const Complete = ({ moveStep, step }) => {
    useEffect(() => {
        var timeout;
        // step === 'win' &&
        feti.confetti({
            angle: randomInRange(0, 360),
            spread: 360,
            count: 3000,
            origin: { y: 0.6 },
            scale: 10
        });
        timeout = setTimeout(() => moveStep('intro'), 5000);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <div className="game">
            <div className="center">
                <h1 style={{ fontSize: '5em', textTransform: 'uppercase' }}>{step === 'win' ? '¡Ganaste!' : 'Intentalo de nuevo'}</h1>
            </div>
        </div>
    );
};

Complete.propTypes = {
    moveStep: PropTypes.func,
    step: PropTypes.string
};

const mapStateToProps = state => {
    return {
        step: state.tileGame.step
    };
};

const mapDispatchToProps = dispatch => {
    return {
        moveStep: step => {
            dispatch(moveStep({ step }));
        }
    };
};

const CompleteView = connect(mapStateToProps, mapDispatchToProps)(Complete);

export default CompleteView;
