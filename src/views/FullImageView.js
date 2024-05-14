import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown';
import { moveStep } from '../reducers/reducers';

const FullImage = ({ imageNumber, moveStep }) => {
    const timeout = 5000;
    const renderer = ({ minutes, seconds }) => minutes * 60 + seconds;
    const imPath = `${window.location.href}/images/art${imageNumber}.png`;

    return (
        <div className="game">
            <div className="full-image">
                <img width="1500px" src={`${imPath}`} draggable="false" alt="Full image" />
            </div>
            <div className="game-title">
                <h3 style={{ fontSize: '5em' }}>
                    <Countdown renderer={renderer} autoStart={true} onComplete={() => moveStep('game')} date={Date.now() + timeout} />
                </h3>
                <p>¿Conoces la lata?</p>
                <sub>¡Completa el rompecabeza antes de que se acabe el tiempo!</sub>
            </div>
        </div>
    );
};

FullImage.propTypes = {
    size: PropTypes.number,
    imageNumber: PropTypes.number,
    moveStep: PropTypes.func
};

const mapStateToProps = state => {
    return {
        imageNumber: state.tileGame.imageNumber
    };
};

const mapDispatchToProps = dispatch => {
    return {
        moveStep: step => {
            dispatch(moveStep({ step }));
        }
    };
};

const FullImageView = connect(mapStateToProps, mapDispatchToProps)(FullImage);

export default FullImageView;
