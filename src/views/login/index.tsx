/** @format */

import React, {Component, useState} from 'react';
import loginCss from './index.module.css';
import {Button, Input, Select, message} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Props} from '@/types';
import {useHistory} from 'react-router-dom';
import userApi from '@/apis/user.api';
import localStorageTool from '@utils/localStorage.util';

const {Option} = Select;

export default function Index(props: Props) {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    // 默认登录
    const [signType, setSignType] = useState('Sign In');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    function login() {
        if (loading) return;
        if (!account) return message.error('请输入手机号');
        if (!password) return message.error('请输入密码');
        if (signType === 'Sign Up' && !code) return message.error('请输入邀请码');
        setLoading(true);
        if (signType === 'Sign Up') {
            userApi
                .register({
                    phone: account,
                    password: password,
                    code: code,
                })
                .then((res: any) => {
                    const data = res.data;
                    setLoading(false);
                    if (data.code === '0') {
                        localStorageTool.set('token', data.data);
                        localStorageTool.set('phone', account);
                        message.success('注册成功');
                        history.push('/project');
                    } else {
                        message.error(data.msg);
                    }
                });
        } else {
            userApi
                .login({
                    phone: account,
                    password: password,
                })
                .then((res: any) => {
                    const data = res.data;
                    setLoading(false);
                    if (data.code === '0') {
                        localStorageTool.set('token', data.data);
                        localStorageTool.set('phone', account);
                        history.push('/project');
                    } else {
                        message.error(data.msg);
                    }
                });
        }
    }

    return (
        <div className={loginCss.login}>
            <div className={loginCss.login__main}>
                <div className={loginCss.login__title} style={{marginBottom: '40px'}}>
                    this is a simple memorial website
                </div>

                <Input.Group style={{marginBottom: '20px'}} compact>
                    <Input
                        onChange={e => setAccount(e.target.value)}
                        style={{width: '75%'}}
                        prefix={<UserOutlined />}
                    />
                    <Select onChange={e => setSignType(e)} defaultValue="Sign In" style={{width: '25%'}}>
                        <Option value="Sign Up">Sign Up</Option>
                        <Option value="Sign In">Sign In</Option>
                    </Select>
                </Input.Group>
                {signType === 'Sign Up' ? (
                    <Input
                        onChange={e => setCode(e.target.value)}
                        style={{marginBottom: '20px'}}
                        placeholder="input invitation code"
                    />
                ) : null}
                <Input.Password
                    onChange={e => setPassword(e.target.value)}
                    style={{marginBottom: '70px'}}
                    placeholder="input password"
                />

                <Button type="primary" disabled={loading} loading={loading} onClick={login}>
                    {signType}
                </Button>
            </div>
        </div>
    );
}
