interface IAdmin {
    id: number,
    name: string
}

interface IState {
    admin: IAdmin
}

const initAdminState: IState = {
    admin: {
        id: 0,
        name: ''
    }
}

const Admin = (state: IState = initAdminState, action: any) => {
    return state
}

export default Admin