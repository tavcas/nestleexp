import { HIGHSCORE_LIST_LOADED, HIGHSCORE_LIST_SAVED, NAME_SUBMITTED } from './tile-game-reducer';

export async function fetchHighScoreList(dispatch, getState) {
    if (process.env.REACT_APP_APIURL.length === 0) {
        return;
    }
    let url = `${process.env.REACT_APP_APIURL}/highscore-lists/${getState().tileGame.highScoreListId}`;
    try {
        let result = await get(url);
        dispatch(HIGHSCORE_LIST_LOADED({ highScoreList: result }));
    } catch (e) {
        console.error('Network request failed');
    }
}

export async function updateHighScoreList(dispatch, getState) {
    if (process.env.REACT_APP_APIURL.length === 0) {
        return;
    }

    let url = `${process.env.REACT_APP_APIURL}/highscore-lists/${getState().tileGame.highScoreListId}/game-results`;

    var state = getState().tileGame;

    if (!state.userName || state.userName.length === 0 || state.nameSubmitted) {
        return;
    }

    dispatch(NAME_SUBMITTED());

    let body = {
        userName: state.userName,
        score: state.moves,
        id: state.userId
    };

    try {
        await post(url, body);
    } catch (e) {
        console.error('Network request failed3');
        return;
    }

    let getUrl = `${process.env.REACT_APP_APIURL}/highscore-lists/${getState().tileGame.highScoreListId}`;
    let result = await get(getUrl);

    dispatch(HIGHSCORE_LIST_SAVED({ highScoreList: result }));
}

async function get(url) {
    try {
        let response = await fetch(url, {
            headers: {
                ApiKey: `${process.env.REACT_APP_APIKEY}`
            }
        });
        if (!response.ok) {
            throw Error('Network request failed');
        }
        return await response.json();
    } catch (e) {
        throw Error('Network request failed');
    }
}

async function post(url, body) {
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ApiKey: `${process.env.REACT_APP_APIKEY}`
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw Error('Network request failed');
        }
    } catch (e) {
        throw Error('Network request failed');
    }
}

