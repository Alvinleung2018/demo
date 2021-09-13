interface HolderMsg {
    peopleType: string
    chineseName: string
    qq: string
    idCardStartDate: string
    idCardSEndDate: string
    marriage: string
}

interface HolderMsgState {
    holderMsg: HolderMsg
}

const initHolderMsgState: HolderMsgState = {
    holderMsg: {
        peopleType: '',
        chineseName: '',
        qq: '',
        idCardStartDate: '',
        idCardSEndDate: '',
        marriage: ''
    }
}

const HolderMsg = (state: HolderMsgState = initHolderMsgState, action: any) => {
    switch (action.type) {
        case 'validateForm':
            console.log('action',action)
            return {...state}
    }
    return state
}

export default HolderMsg