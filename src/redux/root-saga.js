import { all, call } from 'redux-saga/effects';
import { onWatchAddItemToBagStart, onWatchSellItemStart } from './user/user.sagas';
import { onWatchWithdraw, onWatchDeposit } from './bank/bank.sagas';

export default function* rootSaga() {
    yield all([
        call(onWatchAddItemToBagStart),
        call(onWatchSellItemStart),
        call(onWatchWithdraw),
        call(onWatchDeposit)
    ])
}