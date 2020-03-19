/** @format */

import React, {Component} from 'react';
import Login from './login/Login';

interface Props {}

export default class App extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        return <Login />;
    }
}
