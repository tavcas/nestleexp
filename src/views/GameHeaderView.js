import './Game.css';
import PropTypes from 'prop-types';

const GameHeaderView = () => (
    <header className="game-header">
        <div className="game-title">
            Quedan <b>60</b> segundos
        </div>
    </header>
);

GameHeaderView.propTypes = {
    gameName: PropTypes.string
};

export default GameHeaderView;
