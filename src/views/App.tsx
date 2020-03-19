/** @format */

import React, {Component} from 'react';
import Loadable from 'react-loadable';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
} from 'react-router-dom';

import Loading from '@components/Loading';
import Login from './login';

const AsyncProject = Loadable({
    loader: () => import('./project'),
    loading: Loading,
});

interface Props {}

export default class App extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/project" component={AsyncProject} />
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
