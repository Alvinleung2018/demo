import {message, notification} from "antd";

export const submitHolderMsg = (data: any) => {
    return new Promise((resolve, reject) => {
        resolve(data)
        notification.success({message: '持有人信息', description: JSON.stringify(data)})
        message.success('提交成功')
    })
}

export const submitOtherMsg = (data: any) => {
    return new Promise((resolve, reject) => {
        resolve(data)
        notification.success({message: '其他信息', description: JSON.stringify(data)})
        message.success('提交成功')
    })
}