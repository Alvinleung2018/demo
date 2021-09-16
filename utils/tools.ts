import moment from "moment";

interface DateType {
    openAccountDate?: string
    closeAccountDate?: string
    idCardEndDate?: string
    idCardStartDate?: string
}


export const findSameElementInArray = (targetObj: object, arr: string[]) => {
    let resList: string[] = []
    for (let i in targetObj) {
        // @ts-ignore
        targetObj[i].forEach((el: any) => {
            arr.forEach((nameItem: any) => {
                if(el === nameItem) {
                    resList.push(i)
                }
            })
        })
    }
    return Array.from(new Set(resList))
}




export const formatDate = (value: any) => {
    let obj: DateType = {}
    if(Object.prototype.toString.call(value) === '[object Object]') {
        for(let key in value) {
            if(value[key] instanceof Object) {
                obj[key] = moment(value[key]).format('YYYY-MM-DD')
            }
        }
    }
    return { ...value, ...obj}
}


