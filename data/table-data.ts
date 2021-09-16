import {reject} from "lodash";

export const phoneFormData = [
    {
        areaCode: '+86',
        phoneNumber: '13800138000',
        isDefault: '是'
    },
    {
        areaCode: '+00852',
        phoneNumber: '13912349895',
        isDefault: '否'
    },
]

export const getPhoneFormData = () => {
    return new Promise((resolve, reject) => {
        resolve(phoneFormData)
    })
}

export const emailFormData = [
    {
        email: '12345@qq.com',
        emailIsDefault: '是'
    }
]

export const getEmailFormData = () => {
    return new Promise((resolve, reject) => {
        resolve(emailFormData)
    })
}