import Axios from 'axios';
import { setTimeout } from 'core-js/library/web/timers';

function user(state = {}, action) {
    let now, component, values;
    switch (action.type) {

        case 'SET_USER_DATA':
            return {
                ...state,
                data: action.userData
            }

        case 'SET_USER_TIMESTAMP':
            now = Math.round((new Date()).getTime() / 1000);
            localStorage['userTimestamp'] = Math.round((new Date()).getTime() / 1000)
            return {
                ...state,
                timestamp: now
            }

        case 'SET_USER_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.value,
                isValid: action.value && state.isConfirmed
            }

        case 'SET_USER_IS_CONFIRMED':
            return {
                ...state,
                isConfirmed: action.value,
                isValid: action.value && state.isLoggedIn
            }

        case 'EDIT_USER':
            component = action.component;
            values = action.values;
            Axios.post("http://localhost:5000/auth/edit", values, {
                headers: {
                    Authorization: 'Bearer ' + localStorage['_jwt']
                }
            }).then(
                resp => {
                    console.log('EDIT SUCCESS RESPONSE', resp)
                    let closed = false;
                    if (resp.data) {
                        if (resp.data.status === 'success' && resp.data.auth_token) {

                            component.handleRequestClose();
                            localStorage.setItem('_jwt', resp.data.auth_token);
                            component.props.setUserIsLoggedIn(true);
                            component.props.setUserIsConfirmed(resp.data.user.confirmed);
                            component.props.setUserData(resp.data.user);
                            component.props.setUserTimestamp();
                            closed = true;
                            console.log('User Logged In')
                        }
                    }
                    if (!closed) {
                        console.log('makeNotPending')
                        component.makeNotPending();
                    }
                }, err => {
                    console.log('EDIT FAIL RESPONSE', err.response)
                    if (err.response.status === 401) {
                        component.setState(
                            { submitError: err.response.data.message }
                        );
                    }
                    component.makeNotPending();
                }
                ).catch((err) => { console.log('Caught Error:', err) });

            return {
                ...state
            }

        case 'REGISTER':
            component = action.component;
            values = action.values;


            Axios.post("http://localhost:5000/auth/register", values).then(
                (resp) => {
                    let closed = false;
                    if (resp.data) {
                        if (resp.data.status === 'success' && resp.data.auth_token) {

                            component.handleRequestClose();
                            localStorage.setItem('_jwt', resp.data.auth_token);
                            component.props.setUserIsLoggedIn(true);
                            component.props.setUserIsConfirmed(false);
                            component.props.setUserData(resp.data.user);
                            component.props.setUserTimestamp();
                            closed = true;
                            console.log('User Logged In')

                        }
                    }
                    if (!closed) {
                        console.log('makeNotPending')
                        component.makeNotPending();
                    }
                },
                (err) => {
                    if (err.response.status === 401) {
                        component.setState(
                            { submitError: err.response.data.message }
                        );
                    }
                    component.makeNotPending();
                }
            ).catch((err) => { console.log('Caught Error:', err) });
            return {
                ...state
            }

        case 'LOGOUT':
            if (localStorage['_jwt']) {
                Axios.post(
                    "http://localhost:5000/auth/logout",
                    { logout: true },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage['_jwt']
                        }
                    }
                ).then(
                    (resp) => {
                        if (resp.data) {
                            if (resp.data.status === 'success') {
                                console.log('Remote Logged Out');
                            }
                        }
                    },
                    (err) => {
                        console.log('LOGOUT error', err.response.data.message);
                    }
                    ).catch((err) => { console.log('Caught Error:', err) });
                localStorage.removeItem('_jwt');
            } else {
                console.log('Local Logged Out');
            }
            now = Math.round(new Date().getTime() / 1000);
            localStorage['reduxPersist:user'] = '{timestamp:' + now + '}';
            return {
                ...state,
                isLoggedIn: false,
                isConfirmed: false,
                isValid: false,
                data: {}
            }


        case 'SET_USER_STATUS':

            component = action.component;
            const checkTimeout = 15;
            const ts = component.props.user.timestamp || parseInt(localStorage['userTimestamp'], 10);

            if (!localStorage['_jwt']) {
                if (ts) {
                    return { ...state }
                }
                setTimeout(component.props.userLogOut, 1);
                setTimeout(component.props.setUserTimestamp, 1);
                return { ...state }
            }

            now = Math.round(new Date().getTime() / 1000);

            if (ts && now - ts < checkTimeout && !action.force) {
                return {
                    ...state
                }
            }

            Axios.post(
                "http://localhost:5000/auth/status",
                { status: true },
                {
                    headers: {
                        Authorization: 'Bearer: ' + localStorage['_jwt']
                    }
                }
            ).then(
                resp => {
                    if (resp.data) {
                        if (resp.data.status === 'success' && resp.data.auth_token) {
                            console.log('User Updated');
                            localStorage.setItem('_jwt', resp.data.auth_token);
                            component.props.setUserIsLoggedIn(true);
                            component.props.setUserIsConfirmed(resp.data.userData.confirmed);
                            component.props.setUserData(resp.data.userData);
                            component.props.setUserTimestamp();
                        }
                    }
                },
                err => {
                    console.log('SET_USER_STATUS', err.response.data.message);
                    component.props.userLogOut();
                }
                ).catch((err) => { console.log('Caught Error:', err) });
            return {
                ...state
            }

        case 'RESEND_EMAIL':
            Axios.post(
                "http://localhost:5000/auth/resend_email",
                { resend: true },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage['_jwt']
                    }
                }
            ).then(
                (resp) => {
                    if (resp.data) {
                        if (resp.data.status === 'success') {
                            console.log('Email Resent');
                        } else {
                            console.log(resp.data.message)
                        }
                    }
                },
                (err) => {
                    console.log('RESEND_EMAIL', err.response.data.message);
                }).catch((err) => { console.log('Caught Error:', err) });
            return {
                ...state
            }

        case 'USER_LOGIN':
            component = action.component;
            values = action.values;
            Axios.post("http://localhost:5000/auth/login", values).then(
                (resp) => {
                    let closed = false;
                    if (resp.data) {
                        if (resp.data.status === 'success' && resp.data.auth_token) {
                            localStorage.setItem('_jwt', resp.data.auth_token);
                            component.setState(
                                { submitError: '' }
                            );
                            component.handleRequestClose();
                            component.props.setUserIsLoggedIn(true);
                            component.props.setUserIsConfirmed(resp.data.user.confirmed);
                            component.props.setUserData(resp.data.user);
                            component.props.setUserTimestamp();
                            closed = true;
                            console.log('User Logged In')
                        }
                    }
                    if (!closed) {
                        component.makeNotPending();
                    }
                },
                (err) => {
                    console.log('USER_LOGIN', err.response.data.message);
                    console.log(err.response)
                    if (err.response.data.message) {
                        component.setState(
                            { submitError: err.response.data.message }
                        );
                    }
                    component.makeNotPending()
                }
            ).catch((err) => { console.log('Caught Error:', err) });
            return {
                ...state
            }

        default:
            return state;
    }
}

export default user;