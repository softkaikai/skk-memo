/** @format */

import React, {useState} from 'react';
import {List, Card, Empty, Button, Menu, Dropdown, Modal, Input} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import moduleCss from './index.module.css';

export default function Project() {
    const [addProjectModalVisibility, setAddProjectModalVisibility] = useState(false);
    const menu = (
        <Menu>
            <Menu.Item>
                <a onClick={() => setAddProjectModalVisibility(true)}>创建项目</a>
            </Menu.Item>
            <Menu.Item>
                <a>加入项目</a>
            </Menu.Item>
        </Menu>
    );
    const data: Array<{title: string}> = [];

    function addProjectModalOk() {
        setAddProjectModalVisibility(false);
    }
    function addProjectModalCancel() {
        setAddProjectModalVisibility(false);
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
                                <Card title={item.title}>Card content</Card>
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
