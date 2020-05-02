/** @format */

import React, {useState} from 'react';
import {Input, Button, Modal, message} from 'antd';
import CheckTag, {RefFunction} from './check-tag';
import tagApi from '@apis/tag.api';

import cssModule from './index.module.css';

export default function Memorial() {
    const [addTagModalVisibility, setAddTagModalVisibility] = useState(false);
    const [newTag, setNewTag] = useState('');

    function addTagModalOk() {
        if (!newTag) return message.error('请输入新标签名称');
        tagApi
                .create(newTag)
                .then((res: any) => {
                    const data = res.data;
                    if (data.code === '0') {
                        // getProjects();
                        message.success('创建成功');
                    } else {
                        message.error(data.msg);
                    }
                });
        setAddTagModalVisibility(false);
    }
    function addTagModalCancel() {
        setAddTagModalVisibility(false);
    }

    function search() {
        console.log(123);
    }

    let getSearchCheckedTag: RefFunction;
    let getAddCheckedTag: RefFunction;

    return (
        <div className={cssModule.memo}>
            <Modal
                title="添加标签"
                destroyOnClose
                visible={addTagModalVisibility}
                onOk={addTagModalOk}
                onCancel={addTagModalCancel}
            >
                <Input onChange={e => setNewTag(e.target.value)} style={{marginBottom: '10px'}} maxLength={10} placeholder="new tag" />
            </Modal>
            <div className={cssModule['memo__header']}>
                <Input.Search
                    style={{width: '400px', marginRight: '20px'}}
                    onSearch={search}
                    placeholder="请输入关键字"
                />
                <Button type="primary">清除</Button>
                <Button style={{marginLeft: '20px'}} type="primary" onClick={e => setAddTagModalVisibility(true)}>新建标签</Button>
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
