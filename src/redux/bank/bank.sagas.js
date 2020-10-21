import { takeLatest, put, select } from 'redux-saga/effects';
import { withdrawalSuccess, withdrawalFail, withdrawBells,
    depositSuccess, depositFail, depositBells } from '../bank/bank.action';
import { stashBells, takeOutBells } from '../user/user.action';

import { message } from 'antd';

const getBells = (state) => state.bank.bells;
const getBellsRequested = (state) => state.bank.bellsRequested;
const getPocketBells = (state) => state.user.pocketBells;
const getErrorMessage = (state) => state.bank.errorMessage;

function* withdrawAsync() {
    const bellsInBank = yield select(getBells);
    const bellsRequested = yield select(getBellsRequested);
    
	if (bellsInBank - bellsRequested >= 0) {
        yield put(withdrawBells(bellsRequested));
        yield put(stashBells(bellsRequested));
        yield put(withdrawalSuccess());
    } else {
        yield put(withdrawalFail('Insufficient balance'));
        message.error(yield select(getErrorMessage))
    }
}

function* depositAsync() {
    const bellsRequested = yield select(getBellsRequested);
    const pocketBells = yield select(getPocketBells);
    
	if (bellsRequested <= pocketBells) {
        yield put(takeOutBells(bellsRequested));
        yield put(depositBells(bellsRequested));
        yield put(depositSuccess());
    } else {
        yield put(depositFail('Insufficient balance'));
        message.error(yield select(getErrorMessage))
    }
}

export function* onWatchWithdraw() {
    yield takeLatest('WITHDRAWAL_REQUEST', withdrawAsync);
}

export function* onWatchDeposit() {
    yield takeLatest('DEPOSIT_REQUEST', depositAsync);
}