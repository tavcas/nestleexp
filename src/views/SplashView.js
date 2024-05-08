import './Game.css';

import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { moveStep } from '../reducers/reducers';

const Splash = ({ moveStep }) => {
    useEffect(() => {
        const timeout = setTimeout(() => moveStep('start'), 1000);
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
    moveStep: PropTypes.func
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        moveStep: step => {
            dispatch(moveStep({ step }));
        }
    };
};

const SplashView = connect(mapStateToProps, mapDispatchToProps)(Splash);

export default SplashView;
