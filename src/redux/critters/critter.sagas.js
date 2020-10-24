import { takeLatest, put, select } from 'redux-saga/effects';
import { message } from 'antd';
import {
  fetchCrittersSuccess,
  fetchCrittersFail,
} from './critter.action';
import { getRandomStuff } from '../../utils/Util';

const getApiUrl = (state) => state.critters.apiUrl;
const getCritterMessage = (state) => state.critters.message;

function* fetchCrittersRequestAsync() {
  const apiUrl = yield select(getApiUrl);

  const apiResponse = yield fetch(apiUrl);
  if (apiResponse.ok) {
    const data = yield apiResponse.json();
    const randomizedData = yield getRandomStuff(data, 20);
    yield put(fetchCrittersSuccess(randomizedData));
  } else {
    yield put(fetchCrittersFail('Error...error...'));
    yield message.error(yield select(getCritterMessage));
  }
}

export function* onWatchFetchCrittersRequest() {
  yield takeLatest('FETCH_CRITTERS_REQUEST', fetchCrittersRequestAsync);
}
