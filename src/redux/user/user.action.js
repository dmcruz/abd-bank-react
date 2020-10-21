export const setName = name => ({
    type: 'SET_NAME',
    payload: name
});

export const setBirthDate = bdate => ({
    type: 'SET_BDATE',
    payload: bdate
});
export const setIslandName = name => ({
    type: 'SET_ISLAND_NAME',
    payload: name
});

export const stashBells = bells => ({
    type: 'STASH_BELLS',
    payload: bells
});

export const takeOutBells = bells => ({
    type: 'TAKE_OUT_BELLS',
    payload: bells
});

export const addItemToBag = (item) =>({
    type: 'ADD_INVENTORY',
    payload: item
})

export const sellItem = (index, item) =>({
    type: 'SELL_ITEM',
    index: index,
    payload: item
})

export const addItemToBagStart = (itemOnHand) => ({
    type: 'ADD_ITEM_TO_BAG_START',
    payload: itemOnHand
})

export const addItemToBagSuccess = (itemOnHand) => ({
    type: 'ADD_ITEM_TO_BAG_SUCCESS',
    payload: itemOnHand
})

export const addItemToBagFail = (errorMessage) => ({
    type: 'ADD_ITEM_TO_BAG_FAIL',
    payload: errorMessage
})

export const sellItemStart = (itemOnHand) => ({
    type: 'SELL_ITEM_START',
    payload: itemOnHand
})

export const sellItemSuccess = () => ({
    type: 'SELL_ITEM_SUCCESS',
})

export const sellItemFail = (errorMessage) => ({
    type: 'SELL_ITEM_FAIL',
    payload: errorMessage
})