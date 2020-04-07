/** @format */

import React, {useState} from 'react';
import {Input, Button, Tag} from 'antd';
import CheckTag, {RefFunction} from './check-tag';

import cssModule from './index.module.css';

export default function Memorial() {
    const tags: Array<string> = [
        'magenta',
        'red',
        'volcano',
        'orange',
        'gold',
        'lime',
        'green',
        'cyan',
        'blue',
        'geekblue',
        'purple',
    ];
    const tagColors: Array<string> = [
        'magenta',
        'red',
        'volcano',
        'orange',
        'gold',
        'lime',
        'green',
        'cyan',
        'blue',
        'geekblue',
        'purple',
    ];

    function search() {
        console.log(123);
    }

    let getSearchCheckedTag: RefFunction;
    let getAddCheckedTag: RefFunction;

    return (
        <div className={cssModule.memo}>
            <div className={cssModule['memo__header']}>
                <Input.Search
                    style={{width: '400px', marginRight: '20px'}}
                    onSearch={search}
                    placeholder="请输入关键字"
                />
                <Button type="primary">清除</Button>
                <div style={{width: '800px', marginTop: '20px'}}>
                    <CheckTag onRef={(fn: RefFunction) => (getSearchCheckedTag = fn)} />
                </div>
            </div>
            <div className={cssModule['memo__main']}>
                <div className={cssModule['memo__result'] + ' new-scroll-bar'}>
                    <ul>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                        <li className={cssModule['memo__result-list']}>士大夫</li>
                    </ul>
                </div>
                <div className={cssModule['memo__code'] + ' new-scroll-bar'}>
                    <div>
                        <span className={cssModule['memo__code-title']}>
                            <span className="color-red">*</span>
                            标题：
                        </span>
                        <Input style={{width: '300px'}} placeholder="请输入标题" />
                    </div>
                    <div>
                        <span className={cssModule['memo__code-title']}>
                            <span className="color-red">*</span>
                            关键字：
                        </span>
                        <span className="display-ib">sdf</span>
                    </div>
                    <div>
                        <span className={cssModule['memo__code-title']}>标签：</span>
                        <span className="display-ib">
                            <CheckTag onRef={(fn: RefFunction) => (getSearchCheckedTag = fn)} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
