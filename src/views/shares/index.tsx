/** @format */

import React, {useState} from 'react';
import {Route, useHistory} from 'react-router-dom';
import SharesForecast from './forecast';

export default function Shares() {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <Route path="/shares/forecast" component={SharesForecast} />
        </div>
    );
}
