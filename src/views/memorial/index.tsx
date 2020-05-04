/** @format */

import React, {useState, useEffect} from 'react';
import {Input, Button, Modal, message} from 'antd';
import CheckTag, {RefFunction, InitFunction} from './check-tag';
import tagApi from '@apis/tag.api';
import recordApi, {SaveRecord} from '@apis/record';
import uploadApi from '@apis/upload.api';
import Coding from '@components/Coding';
import localStorageTool from '@utils/localStorage.util';
import classNames  from 'classnames';


import cssModule from './index.module.css';

export default function Memorial() {
    const [addTagModalVisibility, setAddTagModalVisibility] = useState(false);
    const [currentRecordId, setCurrentRecordId] = useState('');
    const [newTag, setNewTag] = useState('');
    const [jsCode, setJsCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [htmlCode, setHtmlCode] = useState('');
    const [title, setTitle] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [records, setRecords] = useState<SaveRecord[]>([]);

    const projectId = localStorageTool.get('projectId');
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

    function save() {
        if (!title) return message.error('请输入标题');
        if (!projectId) return message.error('请重新登录');
        recordApi
                .save({
                    _id: currentRecordId,
                    tags: getAddCheckedTag(),
                    imgUrl,
                    jsCode,
                    htmlCode,
                    cssCode,
                    title,
                    projectId,
                })
                .then((res: any) => {
                    const data = res.data;
                    if (data.code === '0') {
                        clearForm();
                        findRecord();
                        message.success('创建成功');
                    } else {
                        message.error(data.msg);
                    }
                });
    }

    function findRecord() {
        if (!projectId) return message.error('请重新登录');
        recordApi
                .find({
                    tags: getSearchCheckedTag(),
                    title: searchTitle,
                    projectId,
                })
                .then((res: any) => {
                    const data = res.data;
                    if (data.code === '0') {
                        setRecords(data.data as SaveRecord[]);
                    } else {
                        message.error(data.msg);
                    }
                });
    }

    function findRecordById(id: string) {
        recordApi
                .findById(id)
                .then((res: any) => {
                    const data = res.data;
                    if (data.code === '0') {
                        const temp: SaveRecord = data.data;
                        setCurrentRecordId(temp._id);
                        setJsCode(temp.jsCode || '');
                        setCssCode(temp.cssCode || '');
                        setHtmlCode(temp.htmlCode || '')
                        setTitle(temp.title);
                        setImgUrl(temp.imgUrl || '');
                        tagInitFn(temp.tags);
                    } else {
                        message.error(data.msg);
                    }
                });
    }

    function deleteRecordById(id: string, e: React.MouseEvent) {
        e.stopPropagation();
        recordApi
                .deleteById(id)
                .then((res: any) => {
                    const data = res.data;
                    if (data.code === '0') {
                        findRecord();
                        message.success('删除成功');
                    } else {
                        message.error(data.msg);
                    }
                })
    }

    function clearForm() {
        setCurrentRecordId('');
        setJsCode('');
        setCssCode('');
        setHtmlCode('')
        setTitle('');
        setImgUrl('')
        tagInitFn([]);
    }

    function clearSearch() {
        setSearchTitle('');
        tagSearchInitFn([]);
        // 不能直接调findRecord, 因为数据要在下一个周期才会更新
        if (!projectId) return message.error('请重新登录');
        recordApi
                .find({
                    tags: [],
                    title: '',
                    projectId,
                })
                .then((res: any) => {
                    const data = res.data;
                    if (data.code === '0') {
                        setRecords(data.data as SaveRecord[]);
                    } else {
                        message.error(data.msg);
                    }
                });
    }

    function recordClick(id: string) {
        findRecordById(id);
        setCurrentRecordId(id);
    }

    useEffect(() => {
        findRecord()
    }, [])

    function uploadImg() {
        const file = document.getElementById('JS_UPLOAD') as HTMLInputElement;
        const formData = new FormData();
        if (file.files && file.files.length) {
            formData.append('file', file.files[0]);
            uploadApi
                .image(formData)
                .then((res: any) => {
                    const data = res.data;
                    if (data.code === '0') {
                        setImgUrl(data.data);
                        message.success('上传成功');
                    } else {
                        message.error(data.msg);
                    }
                });
        } else {
            return message.error('图片都还没选就开始上传，你在寻思啥呢？😈👿');
        }
    }

    let getSearchCheckedTag: RefFunction;
    let getAddCheckedTag: RefFunction;
    let tagInitFn: InitFunction;
    let tagSearchInitFn: InitFunction;

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
                    onSearch={findRecord}
                    value={searchTitle}
                    onChange={e => setSearchTitle(e.target.value)}
                    placeholder="请输入标题"
                />
                <Button type="primary" onClick={clearSearch}>清除</Button>
                <Button style={{marginLeft: '20px'}} type="primary" onClick={e => setAddTagModalVisibility(true)}>新建标签</Button>
                <Button style={{marginLeft: '20px'}} type="primary" onClick={clearForm}>新建列表</Button>
                <div style={{width: '800px', marginTop: '20px'}}>
                    <CheckTag 
                        onRef={(fn: RefFunction) => (getSearchCheckedTag = fn)} 
                        onInit={fn => (tagSearchInitFn = fn)}
                    />
                </div>
            </div>
            <div className={cssModule['memo__main']}>
                <div className={cssModule['memo__result'] + ' new-scroll-bar'}>
                    <ul>
                        {
                            records.map((record, index) => {
                                return (
                                    <li 
                                        key={record._id}
                                        className={classNames(cssModule['memo__result-list'], {[classNames(cssModule['memo__result-list_active'])]: record._id === currentRecordId})}
                                        onClick={e => recordClick(record._id)}
                                     >
                                         {record.title}
                                         <span 
                                            className={cssModule['delete']}
                                            onClick={e => deleteRecordById(record._id, e)}
                                         >删除</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={cssModule['memo__code'] + ' new-scroll-bar'}>
                    <div style={{marginLeft: '100px', marginBottom: '10px'}}>
                        <Button type="primary" onClick={save}>保存</Button>
                    </div>
                    <div>
                        <span className={cssModule['memo__code-title']}>
                            <span className="color-red">*</span>
                            标题：
                        </span>
                        <Input value={title} onChange={e => setTitle(e.target.value)} style={{width: '300px'}} placeholder="请输入标题" />
                    </div>
                    <div>
                        <span className={cssModule['memo__code-title']}>标签：</span>
                        <span className="display-ib">
                            <CheckTag onRef={(fn: RefFunction) => (getAddCheckedTag = fn)} 
                            onInit={(fn) => (tagInitFn = fn)}
                            />
                        </span>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <span className={cssModule['memo__code-title']}>图片：</span>
                        <span className="display-ib">
                            <input id="JS_UPLOAD" type="file" />
                            <Button onClick={uploadImg}>上传图片</Button>
                            {imgUrl ? (
                                <div style={{width: '100%'}}>
                                    <img style={{width: '100%'}} src={imgUrl} alt="no img"/>
                                </div>
                            ) : null}
                        </span>
                    </div>
                    <div style={{marginLeft: '100px', marginBottom: '10px'}}>
                        <Coding language="html" code={htmlCode} setCode={(code:string) => setHtmlCode(code)} />
                    </div>
                    <div style={{marginLeft: '100px', marginBottom: '10px'}}>
                        <Coding language="js" code={jsCode} setCode={(code:string) => setJsCode(code)} />
                    </div>
                    <div style={{marginLeft: '100px', marginBottom: '10px'}}>
                        <Coding language="css" code={cssCode} setCode={(code:string) => setCssCode(code)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
