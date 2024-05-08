import GameView from './GameView';
import SplashView from './SplashView';
import FullImageView from './FullImageView';
import CompleteView from './CompleteView';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { moveStep } from '../reducers/reducers';

const AppView = ({ step }) => {
    switch (step) {
        case 'intro':
            return <SplashView />;
        case 'start':
            return <FullImageView />;
        case 'game':
            return <GameView />;
        default:
            return <CompleteView />;
    }
};

AppView.propTypes = {
    step: PropTypes.string,
    moveStep: PropTypes.func
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

const App = connect(mapStateToProps, mapDispatchToProps)(AppView);
export default App;
