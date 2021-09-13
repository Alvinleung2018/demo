import { fromJS } from 'immutable';
import {actionType} from "./types";

const defaultState = fromJS({
    form_key: 'customer_info',
    holderMsgData: {
        peopleType: '',
        chineseName: '',
        qq: '',
        idCardStartDate: '2021-01-01',
        idCardEndDate: '2021-02-01',
        marriage: false,
    },
    otherMsgData: {
        riskDisclosure: false,
        witness: '',
        address: '',
        openAccountDate: '2021-01-01',
        closeAccountDate: '2021-02-01',
        riskLevel: '',
    }
})

const customerInfoReducer = (state = defaultState, action: actionType) => {
    switch (action.type) {
        case 'customerInfo/update/holderMsgData':
            // @ts-ignore
            return state.set('holderMsgData', action.data)
        case 'customerInfo/update/otherMsgData':
            // @ts-ignore
            return state.set('otherMsgData', action.data)
        default:
            return state
    }
}

export default customerInfoReducer