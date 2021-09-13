interface IUser {
    id: number,
    name: string
}

interface IState {
    user: IUser
}

const initUserState: IState = {
    user: {
        id: 0,
        name: ''
    }
}

const User = (state: IState = initUserState, action: any) => {
    switch (action.type) {
        case 'savePeopleType':
            return {...state, ...action.payload}
    }
    return state
}

export default User