/** @format */

import React, {useState} from 'react';
import {List, Card, Empty, Button, Menu, Dropdown, Modal, Input, Collapse} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import moduleCss from './index.module.css';

const {Panel} = Collapse;

export default function Project() {
    const [addProjectModalVisibility, setAddProjectModalVisibility] = useState(false);
    const [joinProjectModalVisibility, setJoinProjectModalVisibility] = useState(false);
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
    const data: Array<{title: string}> = [{title: 'kaikaiTest'}];
    const history = useHistory();

    function addProjectModalOk() {
        setAddProjectModalVisibility(false);
    }
    function addProjectModalCancel() {
        setAddProjectModalVisibility(false);
    }
    function joinProjectModalOk() {
        setJoinProjectModalVisibility(false);
    }
    function joinProjectModalCancel() {
        setJoinProjectModalVisibility(false);
    }
    function joinProject(event: React.MouseEvent) {
        event.stopPropagation();
    }
    function joinProjectBtn() {
        return (
            <span onClick={joinProject} style={{color: '#07d', cursor: 'pointer'}}>
                添加
            </span>
        );
    }

    function jumpToProject() {
        history.push('/memorial');
    }

    return (
        <div className={moduleCss.project}>
            <Modal
                title="添加项目"
                visible={addProjectModalVisibility}
                onOk={addProjectModalOk}
                onCancel={addProjectModalCancel}
            >
                <Input style={{marginBottom: '10px'}} maxLength={10} placeholder="Title" />
                <textarea className={moduleCss.project__textarea} placeholder="Describe" maxLength={200}></textarea>
            </Modal>
            <Modal
                title="加入项目 0 - 0"
                visible={joinProjectModalVisibility}
                onOk={joinProjectModalOk}
                onCancel={joinProjectModalCancel}
            >
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="This is panel header 1" key="1" extra={joinProjectBtn()}>
                        <p>dfgdfgfdgfdgfdg</p>
                    </Panel>
                    <Panel header="This is panel header 2" key="2" extra={joinProjectBtn()}>
                        <p>dfgdfgfdgfdgfdg</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3" extra={joinProjectBtn()}>
                        <p>dfgdfgfdgfdgfdg</p>
                    </Panel>
                </Collapse>
            </Modal>

            <header className={moduleCss.project__title}>
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link">
                        Memorial <DownOutlined />
                    </a>
                </Dropdown>
            </header>
            <section className={moduleCss.project__list}>
                {data && data.length ? (
                    <List
                        grid={{gutter: 16, column: 4}}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Card title={item.title}>
                                    Card content
                                    <div style={{marginTop: '20px', textAlign: 'right'}}>
                                        <Button type="primary" onClick={jumpToProject}>
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
                        <Button type="primary">立即创建</Button>
                    </Empty>
                )}
            </section>
        </div>
    );
}
