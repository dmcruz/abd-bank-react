import { all, call } from 'redux-saga/effects';
import { onWatchAddItemToBagStart, onWatchSellItemStart } from './user/user.sagas';

export default function* rootSaga() {
    yield all([
        call(onWatchAddItemToBagStart),
        call(onWatchSellItemStart)
    ])
}