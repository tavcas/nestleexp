import { connect } from 'react-redux';
// import { PuzzleWidth } from '../constants';
import PropTypes from 'prop-types';

const FullImage = props => {
    const imPath = `${window.location.href}/images/art${props.imageNumber}.png`;
    // const tileWidth = PuzzleWidth / props.size;
    // const fullImageWidth = props.size * tileWidth;
    let fullImageStyle = {
        // width: fullImageWidth + 'px',
        // height: fullImageWidth + 'px'
        width: '100%',
        height: '100%'
    };

    return (
        <div className="full-image" style={fullImageStyle}>
            <img src={`${imPath}`} draggable="false" alt="Full image" />
        </div>
    );
};

FullImage.propTypes = {
    size: PropTypes.number,
    imageNumber: PropTypes.number
};

const mapStateToProps = state => {
    return {
        imageNumber: state.tileGame.imageNumber
    };
};

const FullImageView = connect(mapStateToProps)(FullImage);

export default FullImageView;
