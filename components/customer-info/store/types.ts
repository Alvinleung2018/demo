export interface actionType {
    type: string
    data: actionDataType
}

interface actionDataType {
    peopleType: string
    chineseName: string
    qq?: string
    idCardStartDate?: string
    idCardEndDate?: string
    marriage?: string
    riskDisclosure: string
    witness: string
    address?: string
    openAccountDate?: string
    closeAccountDate?: string
    riskLevel: string
}