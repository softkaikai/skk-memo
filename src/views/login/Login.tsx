/** @format */

import React, {Component} from 'react';
import loginCss from './login.module.css';
import {Button} from 'antd';
import {Props} from '@/types';

export default class Login extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div className={loginCss.login}>
                <div className={loginCss.login__main}>this is title</div>
                <Button type="primary">Login In</Button>
            </div>
        );
    }
}
