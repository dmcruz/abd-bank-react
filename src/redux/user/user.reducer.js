import { Cascader } from 'antd';
import dayjs from 'dayjs';

const INITIAL_STATE = {
    name: 'donatsu',
    birthDate: dayjs('2007/07/07'),
    islandName: "Amanpulo",
    pocketBells: 0,
    maxItems: 10,
    inventory: [],
    itemCount() {
        return this.inventory.length;
    },
    itemOnHand: null,
    errorMessage: '',
    isError: false,
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
        case 'REMOVE_ITEM':
            const activeInventory = state.inventory;
            if (activeInventory.length > 0) {
                var foundIndex = activeInventory.findIndex(f=>f.id === action.payload.id);
                activeInventory.splice(foundIndex, 1);
                return {
                    ...state,
                    inventory: activeInventory
                }
            } else {
                return {
                    ...state,
                    errorMessage: 'Item not found!'
                }
            }
        case 'ADD_ITEM_TO_BAG_START':
            return {
                ...state,
                errorMessage: '',
                isError: false,
                itemOnHand: action.payload,
            }
        case 'ADD_ITEM_TO_BAG_SUCCESS':
            const inventoryCopy = state.inventory;
            const itemCopy = action.payload; 
            itemCopy.id += `-${inventoryCopy.length + 1}`; // make id unique
            inventoryCopy.push(itemCopy);
            return {
                ...state,
                isError: false,
                inventory: inventoryCopy,
                itemOnHand: null,
                errorMessage: `Added ${action.payload.name}`,
            }
        case 'ADD_ITEM_TO_BAG_FAIL':
            return {
                ...state,
                isError: true,
                errorMessage: action.payload
            }
        case 'SELL_ITEM_START':
            return {
                ...state,
                errorMessage: '',
                itemOnHand: action.payload,
            }
        case 'SELL_ITEM_SUCCESS':
            return {
                ...state,
                itemOnHand: null,
                errorMessage: `Sold ${action.payload.name}`
            }
        case 'SELL_ITEM_FAIL':
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;

    }

}

export default userReducer;