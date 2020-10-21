import { takeLatest, put, select, delay } from 'redux-saga/effects';
import { stashBells, removeItem,
    addItemToBagStart, addItemToBagSuccess, addItemToBagFail,addItemToBag,
    sellItemStart, sellItemSuccess, sellItemFail } from './user.action';
import { withdrawalRequest, withdrawalSuccess, withdrawalFail,
    depositRequest, depositSuccess, depositFail } from '../bank/bank.action';
import { message } from 'antd';

const getItemOnHand = (state) => state.user.itemOnHand;
const getInventoryCount = (state) => state.user.inventory.length;
const getInventory = (state) => state.user.inventory;
const getUserMaxItems = (state) => state.user.maxItems;
const getErrorMessage = (state) => state.user.errorMessage;
const getPocketBells = (state) => state.user.pocketBells;
const getIsError = (state) => state.user.isError;

function* addItemToBagAsync() {
    const itemOnHand = yield select(getItemOnHand);
    const itemCount = yield select(getInventoryCount);
    const userMaxItems = yield select(getUserMaxItems);
    
	if(itemCount < userMaxItems) {
        yield put(addItemToBagSuccess(itemOnHand)); 
        yield message.success(yield select(getErrorMessage));
    } else {
        yield put(addItemToBagFail('Your bag is full!'));
        yield message.error(yield select(getErrorMessage));
    }
}

function* sellItemAsync() {
    const itemOnHand = yield select(getItemOnHand);
    const itemCount = yield select(getInventoryCount);

    if (itemCount > 0) {
        yield put(stashBells(itemOnHand.price));
        yield put(removeItem(itemOnHand));
        if (yield select(getIsError)) {
            yield message.error(yield select(getErrorMessage));
        }

    } else {
        yield put(sellItemFail('No item to sell!'));
        yield message.error(yield select(getErrorMessage));
        
    }
}

export function* onWatchAddItemToBagStart() {
    yield takeLatest('ADD_ITEM_TO_BAG_START', addItemToBagAsync);
}

export function* onWatchSellItemStart() {
    yield takeLatest('SELL_ITEM_START', sellItemAsync);
}