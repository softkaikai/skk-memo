/** @format */

import api from './base.api';

interface LoginData {
    phone: string;
    password: string;
}
function login(data: LoginData) {
    return api({
        method: 'post',
        url: '/user/login',
        contentType: 'ajax',
        data,
    });
}

interface RegisterData extends LoginData {
    code: string;
}
function register(data: RegisterData) {
    return api({
        method: 'post',
        url: '/user/register',
        contentType: 'ajax',
        data,
    });
}

export default {
    login,
    register,
};
