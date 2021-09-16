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
    },
    accountMsgData: {
        accountType: '',
        accountName: '',
        accountAddress: '',
        transactionLimitExpirationDate: '2021-01-01',
        transactionLimitAuthDate: '2021-01-01',
        settlementMethod: ''
    },
    phoneTableData: {
        key: '',
        areaCode: '',
        phoneNumber: '',
        isDefault: '',
    },
    emailTableData: {
        email: '',
        isDefault: ''
    },
    textForm: {
        phoneTableData : [
            {
                areaCode: '',
                phoneNumber: '',
                isDefault: '',
            }
        ],
        emailTableData: [
            {
                email: '',
                isDefault: ''
            }
        ]
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
        case 'customerInfo/update/accountMsgData':
            // @ts-ignore
            return state.set('accountMsgData', action.data)
        case 'customerInfo/update/phoneTableData':
            // @ts-ignore
            return state.setIn(['textForm', 'phoneTableData'], action.data)
        case 'customerInfo/update/emailTableData':
            // @ts-ignore
            return state.setIn(['textForm', 'emailTableData'], action.data)
        default:
            return state
    }
}

export default customerInfoReducer