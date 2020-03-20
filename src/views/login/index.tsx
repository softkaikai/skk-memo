/** @format */

import React, {Component, useState} from 'react';
import loginCss from './index.module.css';
import {Button, Input, Select} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Props} from '@/types';
import {useHistory} from 'react-router-dom';

const {Option} = Select;

export default function Index(props: Props) {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    // 默认登录
    const [signType, setSignType] = useState('Sign In');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    function getData() {
        setLoading(true);
        setTimeout(() => {
            // setLoading(false)
            history.push('/project');
        }, 1000);
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
                <Input.Password
                    onChange={e => setPassword(e.target.value)}
                    style={{marginBottom: '70px'}}
                    placeholder="input password"
                />

                <Button type="primary" disabled={loading} loading={loading} onClick={getData}>
                    {signType}
                </Button>
            </div>
        </div>
    );
}
