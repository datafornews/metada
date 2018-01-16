export function setUserIsLoggedIn(value) {
    return {
        type: 'SET_USER_IS_LOGGED_IN',
        value
    }
}

export function setUserIsConfirmed(value) {
    return {
        type: 'SET_USER_IS_CONFIRMED',
        value
    }
}

export function userLogOut() {
    return {
        type: 'LOGOUT'
    }
}

export function setUserData(userData) {
    return {
        type: 'SET_USER_DATA',
        userData
    }
}

export function setUserTimestamp() {
    return {
        type: 'SET_USER_TIMESTAMP'
    }
}

export function setUserStatus(component, force){
    return {
        type: 'SET_USER_STATUS',
        component,
        force
    }
}

export function registerUser(component, values){
    return {
        type: 'REGISTER',
        component,
        values
    }
}

export function editUser(component, values){
    return {
        type: 'EDIT_USER',
        component,
        values
    }
}

export function resendEmail(){
    return {
        type: 'RESEND_EMAIL'
    }
}

export function userLogin(component, values){
    return {
        type: 'USER_LOGIN',
        component,
        values
    }
}