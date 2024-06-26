import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import tileGame from './reducers/reducers';
import { fetchHighScoreList } from './reducers/thunks';
import { initGame } from './reducers/reducers';
import { Provider } from 'react-redux';
import { GameId_4x4, NumImages } from './constants';
import { configureStore } from '@reduxjs/toolkit';
import App from './views/App';

const store = configureStore({
    reducer: {
        tileGame
    }
});

store.dispatch(initGame({ gameId: GameId_4x4, imageNumber: Math.floor(Math.random() * NumImages) + 1, doShuffling: true }));
store.dispatch(fetchHighScoreList);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
