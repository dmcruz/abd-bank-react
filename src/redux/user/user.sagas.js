import { takeLatest, put, select } from "redux-saga/effects"
import { message } from "antd"
import {
  stashBells,
  takeOutBells,
  removeItem,
  addItemToBagSuccess,
  addItemToBagFail,
  sellItemSuccess,
  sellItemFail,
  buyItemSuccess,
  buyItemFail,
  clearUserError,
} from "./user.action"
import { removeCritter, fetchCrittersSuccess } from '../critters/critter.action';

const getItemOnHand = (state) => state.user.itemOnHand
const getInventoryCount = (state) => state.user.inventory.length
const getUserMaxItems = (state) => state.user.maxItems
const getErrorMessage = (state) => state.user.errorMessage
const getIsError = (state) => state.user.isError
const getPocketBells = (state) => state.user.pocketBells
const getCritters = (state) => state.critters.critters;

function* addItemToBagAsync() {
  const itemOnHand = yield select(getItemOnHand)
  const itemCount = yield select(getInventoryCount)
  const userMaxItems = yield select(getUserMaxItems)

  if (itemCount < userMaxItems) {
    yield put(removeCritter(itemOnHand))
    yield put(fetchCrittersSuccess(yield select(getCritters)))
    yield put(addItemToBagSuccess(itemOnHand))
    yield message.success(yield select(getErrorMessage))
  } else {
    yield put(addItemToBagFail("Your bag is full!"))
    yield message.error(yield select(getErrorMessage))
  }
}

function* sellItemAsync() {
  const itemOnHand = yield select(getItemOnHand)
  const itemCount = yield select(getInventoryCount)

  yield put(clearUserError());
  if (itemCount > 0) {
    yield put(stashBells(itemOnHand.sellPrice))
    yield put(removeItem(itemOnHand))
    const errMsg = yield select(getErrorMessage)
    if (yield select(getIsError)) {
      yield message.error(errMsg)
    } else {
      yield put(sellItemSuccess(itemOnHand))
      yield message.success(yield select(getErrorMessage))
    }
  } else {
    yield put(sellItemFail("No item to sell!"))
    yield message.error(yield select(getErrorMessage))
  }
}

function* buyItemAsync() {
  const itemOnHand = yield select(getItemOnHand)
  const inventoryCount = yield select(getInventoryCount)
  const userMaxItems = yield select(getUserMaxItems)
  const pocketBells = yield select(getPocketBells)

  yield put(clearUserError());
  if (inventoryCount < userMaxItems) {
    yield console.log(`pocket ${pocketBells} buyPrice ${itemOnHand.buyPrice}`);

    if (pocketBells - itemOnHand.buyPrice >= 0) {
      yield put(takeOutBells(itemOnHand.buyPrice))
      yield put(addItemToBagSuccess(itemOnHand))
      yield put(buyItemSuccess(itemOnHand))

      yield message.success(yield select(getErrorMessage))
    } else {
      yield put(buyItemFail("Not enough bells!"))
      yield message.error(yield select(getErrorMessage))
    }
  } else {
    yield put(buyItemFail("Not enough space"))
    yield message.error(yield select(getErrorMessage))
  }
}

export function* onWatchAddItemToBagStart() {
  yield takeLatest("ADD_ITEM_TO_BAG_START", addItemToBagAsync)
}

export function* onWatchSellItemStart() {
  yield takeLatest("SELL_ITEM_REQUEST", sellItemAsync)
}

export function* onWatchBuyItemStart() {
  yield takeLatest("BUY_ITEM_REQUEST", buyItemAsync)
}
