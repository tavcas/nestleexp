import { connect } from 'react-redux';
import { PuzzleWidth } from '../constants';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown';
import { moveStep } from '../reducers/reducers';

const FullImage = ({ imageNumber, size, moveStep }) => {
    const timeout = 5000;
    const renderer = ({ minutes, seconds }) => minutes * 60 + seconds;
    const imPath = `${window.location.href}/images/art${imageNumber}.png`;
    const tileWidth = PuzzleWidth / size;
    const tileWrapperStyle = {
        width: `${size * tileWidth}px`
    };
    const tileContainerStyle = {
        gridTemplateColumns: `repeat(${size},${tileWidth}px)`
    };

    return (
        <div className="game">
            <div className="tile-wrapper" style={tileWrapperStyle}>
                <div className="tile-container" style={tileContainerStyle}>
                    <img src={`${imPath}`} draggable="false" alt="Full image" />
                </div>
            </div>
            <div className="game-title">
                <h3>
                    <Countdown renderer={renderer} autoStart={true} onComplete={() => moveStep('game')} date={Date.now() + timeout} />
                </h3>
                <p>Conoces la lata?</p>
                <sub>Completa el rompecabezaantes de que se acabe el tiempo!</sub>
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
