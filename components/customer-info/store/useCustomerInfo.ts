import {useDispatch, useSelector} from "react-redux";

export const useCustomerInfo = () => {
    const holderMsgData = useSelector(state => state.customerInfo.holderMsgData)
    const otherMsgData = useSelector(state => state.customerInfo.otherMsgData)

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

    return {holderMsgData, otherMsgData, updateHolderMsgData, updateOtherMsgData}
}