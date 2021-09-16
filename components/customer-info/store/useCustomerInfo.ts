import {useDispatch, useSelector} from "react-redux";

export const useCustomerInfo = () => {
    const holderMsgData = useSelector(state => state.customerInfo.holderMsgData)
    const otherMsgData = useSelector(state => state.customerInfo.otherMsgData)
    const accountMsgData = useSelector(state => state.customerInfo.accountMsgData)

    const dispatch = useDispatch()

    // 实时更新持有人信息表单
    const updateHolderMsgData = (data: any) => {
        dispatch({
            type: 'customerInfo/update/holderMsgData',
            data
        })
    }

    // 实时更新其他信息表单
    const updateOtherMsgData = (data: any) => {
        dispatch({
            type: 'customerInfo/update/otherMsgData',
            data
        })
    }

    // 实时更新账户信息表单
    const updateAccountMsgData = (data: any) => {
        dispatch({
            type: 'customerInfo/update/accountMsgData',
            data
        })
    }

    // 实时更新手机号表单
    const updatePhoneTableData = (data: any) => {
        dispatch({
            type: 'customerInfo/update/phoneTableData',
            data
        })
    }

    // 实时更新邮箱表单
    const updateEmailTableData = (data: any) => {
        dispatch({
            type: 'customerInfo/update/emailTableData',
            data
        })
    }

    return {
        holderMsgData,
        otherMsgData, accountMsgData,
        updateHolderMsgData,
        updateOtherMsgData,
        updateAccountMsgData,
        updatePhoneTableData,
        updateEmailTableData
    }
}