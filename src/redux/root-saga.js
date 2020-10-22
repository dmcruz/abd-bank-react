import { all, call } from 'redux-saga/effects';
import { onWatchAddItemToBagStart, onWatchSellItemStart, onWatchBuyItemStart } from './user/user.sagas';
import { onWatchWithdraw, onWatchDeposit } from './bank/bank.sagas';

export default function* rootSaga() {
    yield all([
        call(onWatchAddItemToBagStart),
        call(onWatchSellItemStart),
        call(onWatchWithdraw),
        call(onWatchDeposit),
        call(onWatchBuyItemStart)
    ])
}