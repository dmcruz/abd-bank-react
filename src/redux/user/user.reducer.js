import dayjs from 'dayjs';

const INITIAL_STATE = {
    name: 'donatsu',
    birthDate: dayjs('2007/07/07'),
    islandName: "Amanpulo",
    pocketBells: 0,
    maxItems: 10,
    inventory: []
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_BDATE':
            return {
                ...state,
                birthDate: action.payload
            }
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload
            }
        case 'SET_ISLAND_NAME':
            return {
                ...state,
                islandName: action.payload
            }
        case 'STASH_BELLS':
            return {
                ...state,
                pocketBells: state.pocketBells + action.payload
            }
        case 'TAKE_OUT_BELLS':

            return {
                ...state,
                pocketBells: (state.pocketBells - action.payload < 0 ? 0 : state.pocketBells - action.payload)
            }
        case 'ADD_INVENTORY':
            var x = state.inventory;

            if (x.length < state.maxItems) {

                var i = x.length;
                var obj = { index: i, item: action.payload};
                x.push(obj);
                console.log('obj ' + JSON.stringify(obj));
                return {
                    ...state,
                    inventory: x
                }
            }
            return state;

        case 'SELL_ITEM':
            var activeInventory = state.inventory;
            if (activeInventory.length > 0) {
                var foundIndex = activeInventory.findIndex(f=>f.item.id === action.payload.item.id);
                activeInventory.splice(foundIndex, 1);

                state.pocketBells += action.payload.item.price;
                var pocketBells = state.pocketBells;

                return {
                    ...state,
                    pocketBells: pocketBells,
                    inventory: activeInventory
                }
            }
            return{
                state
            }
        default:
            return state;

    }

}

export default userReducer;