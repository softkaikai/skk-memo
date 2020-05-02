/** @format */

import React, {useState, useEffect} from 'react';
import {List, Card, Empty, Button, Menu, Dropdown, Modal, Input, Collapse, message} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import moduleCss from './index.module.css';
import projectApi, {SavedProjectData} from '@apis/project.api';
import localStorageTool from '@utils/localStorage.util';

const {Panel} = Collapse;

export default function Project() {
    const [addProjectModalVisibility, setAddProjectModalVisibility] = useState(false);
    const [joinProjectModalVisibility, setJoinProjectModalVisibility] = useState(false);
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDes, setProjectDes] = useState('');
    const [addProjectTitle, setAddProjectTitle] = useState('');
    const [projects, setProjects] = useState<Array<SavedProjectData>>([])

    const phone = localStorageTool.get('phone');

    const menu = (
        <Menu>
            <Menu.Item>
                <a onClick={() => setAddProjectModalVisibility(true)}>创建项目</a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={() => setJoinProjectModalVisibility(true)}>加入项目</a>
            </Menu.Item>
        </Menu>
    );
    const history = useHistory();

    function joinProject() {
        if (!phone) return message.error('请先登录');

        projectApi
                .join({
                    phone: phone,
                    title: addProjectTitle
                })
                .then((res: any) => {
                    const data = res.data;
                    if (data.code === '0') {
                        getProjects();
                        message.success('加入成功');
                    } else {
                        message.error(data.msg);
                    }
                });
    }

    function deleteProject(id:string) {
        if (!phone) return message.error('请先登录');

        projectApi
                .deleteOne(id)
                .then((res: any) => {
                    const data = res.data;
                    if (data.code === '0') {
                        getProjects();
                        message.success('删除成功');
                    } else {
                        message.error(data.msg);
                    }
                });
    }

    function getProjects() {
        if (!phone) return message.error('请先登录');

        projectApi
                .find({phone})
                .then((res: any) => {
                    const data = res.data;
                    if (data.code === '0') {
                        setProjects(data.data);
                    } else {
                        message.error(data.msg);
                    }
                });
    }
    useEffect(() => {
        getProjects()
    }, []);

    function addProjectModalOk() {
        if (!projectTitle) return message.error('请输入项目标题');
        if (!projectDes) return message.error('请输入项目描述');
        if (!phone) return message.error('请先登录');

        projectApi
                .create({
                    title: projectTitle,
                    description: projectDes,
                    owner: phone,
                    users: [phone]
                })
                .then((res: any) => {
                    const data = res.data;
                    if (data.code === '0') {
                        message.success('创建成功');
                        getProjects();
                    } else {
                        message.error(data.msg);
                    }
                });
        setAddProjectModalVisibility(false);
    }
    function addProjectModalCancel() {
        setAddProjectModalVisibility(false);
    }
    function joinProjectModalOk() {
        if (!addProjectTitle) return message.error('请输入项目标题');

        joinProject();
        setJoinProjectModalVisibility(false);
    }
    function joinProjectModalCancel() {
        setJoinProjectModalVisibility(false);
    }

    function jumpToProject(id:string) {
        localStorageTool.set('projectId', id);
        history.push('/memorial');
    }

    return (
        <div className={moduleCss.project}>
            <Modal
                title="添加项目"
                destroyOnClose
                visible={addProjectModalVisibility}
                onOk={addProjectModalOk}
                onCancel={addProjectModalCancel}
            >
                <Input onChange={e => setProjectTitle(e.target.value)} style={{marginBottom: '10px'}} maxLength={10} placeholder="Title" />
                <textarea onChange={e => setProjectDes(e.target.value)} className={moduleCss.project__textarea} placeholder="Describe" maxLength={200}></textarea>
            </Modal>
            <Modal
                title="加入项目 0 - 0"
                destroyOnClose
                visible={joinProjectModalVisibility}
                onOk={joinProjectModalOk}
                onCancel={joinProjectModalCancel}
            >
                <Input onChange={e => setAddProjectTitle(e.target.value)} style={{marginBottom: '10px'}} maxLength={10} placeholder="Title" />
                {/* <Collapse defaultActiveKey={['1']}>
                    <Panel header="This is panel header 1" key="1" extra={joinProjectBtn()}>
                        <p>dfgdfgfdgfdgfdg</p>
                    </Panel>
                    <Panel header="This is panel header 2" key="2" extra={joinProjectBtn()}>
                        <p>dfgdfgfdgfdgfdg</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3" extra={joinProjectBtn()}>
                        <p>dfgdfgfdgfdgfdg</p>
                    </Panel>
                </Collapse> */}
            </Modal>

            <header className={moduleCss.project__title}>
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link">
                        Memorial <DownOutlined />
                    </a>
                </Dropdown>
            </header>
            <section className={moduleCss.project__list}>
                {projects && projects.length ? (
                    <List
                        grid={{gutter: 16, column: 4}}
                        dataSource={projects}
                        renderItem={item => (
                            <List.Item>
                                <Card title={item.title}>
                                    {item.description}
                                    <div style={{marginTop: '20px', textAlign: 'right'}}>
                                        {item.owner === phone ? (
                                            <Button style={{marginRight: '20px'}} onClick={e => deleteProject(item._id)}>
                                                删除
                                            </Button>
                                        ) : null}
                                        
                                        <Button type="primary" onClick={e => jumpToProject(item._id)}>
                                            立即进入
                                        </Button>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                ) : (
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                        }}
                        description={<span>还没有参与任何项目哦 0 - 0</span>}
                    >
                        <Button type="primary" onClick={() => setAddProjectModalVisibility(true)}>立即创建</Button>
                    </Empty>
                )}
            </section>
        </div>
    );
}
