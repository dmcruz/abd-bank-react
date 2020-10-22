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
} from "./user.action"

const getItemOnHand = (state) => state.user.itemOnHand
const getInventoryCount = (state) => state.user.inventory.length
const getUserMaxItems = (state) => state.user.maxItems
const getErrorMessage = (state) => state.user.errorMessage
const getIsError = (state) => state.user.isError
const getPocketBells = (state) => state.user.pocketBells

function* addItemToBagAsync() {
  const itemOnHand = yield select(getItemOnHand)
  const itemCount = yield select(getInventoryCount)
  const userMaxItems = yield select(getUserMaxItems)

  if (itemCount < userMaxItems) {
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

  if (itemCount > 0) {
    yield put(stashBells(itemOnHand.price))
    yield put(removeItem(itemOnHand))
    if (yield select(getIsError)) {
      yield message.error(yield select(getErrorMessage))
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

  if (inventoryCount < userMaxItems) {
    if (pocketBells - itemOnHand.price >= 0) {
      yield put(takeOutBells(itemOnHand.price))
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
