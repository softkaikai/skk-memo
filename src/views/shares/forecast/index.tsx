/** @format */

import React, {useState} from 'react';
import {Route, useHistory} from 'react-router-dom';
import {Input, DatePicker, Modal, Button, Radio, message} from 'antd';
import {AddRecord, RecordEnum, EditRecord, EditRecordNum} from './index.d';
import {getYMDHM, deepCopy} from '@utils/tool.util';
import {RadioChangeEvent} from 'antd/lib/radio';
const {TextArea} = Input;

export default function SharesForecast() {
    const [addRecordModalVisibility, setAddRecordModalVisibility] = useState(false);
    const [editRecordModalVisibility, setEditRecordModalVisibility] = useState(false);
    const [record, setRecord] = useState<AddRecord>({
        name: '',
        code: '',
        forecast: '',
        startDate: '',
        result: '',
        isRight: false,
    });
    const [records, setRecords] = useState<AddRecord[]>([]);
    const [editRecord, setEditRecord] = useState<EditRecord>({
        forecast: '',
        result: '',
        isRight: false,
    });

    function recordChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: RecordEnum) {
        if (record) {
            record[field] = event.target.value;
        }

        setRecord(record);
    }
    function editRecordChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: EditRecordNum) {
        if (editRecord) {
            editRecord[field] = event.target.value;
        }

        setEditRecord(editRecord);
    }
    function editRecordRadioChange(event: RadioChangeEvent) {
        const temp = deepCopy(editRecord);
        temp.isRight = event.target.value;
        setEditRecord(temp);
    }

    function openRecordModal() {
        setRecord({
            name: '',
            code: '',
            forecast: '',
            startDate: '',
            result: '',
            isRight: false,
        });
        setAddRecordModalVisibility(true);
    }
    function addRecordModalOk() {
        if (!record.name) {
            message.error('请输入股票名字');
            return;
        }
        if (!record.code) {
            message.error('请输入股票编号');
            return;
        }
        if (!record.forecast) {
            message.error('请输入股票趋势预测');
            return;
        }
        record.startDate = getYMDHM();
        records.push(record);
        setRecords(records);
        setAddRecordModalVisibility(false);
    }
    function addRecordModalCancel() {
        setAddRecordModalVisibility(false);
    }
    function editRecordModalOk() {
        setEditRecordModalVisibility(false);
    }
    function editRecordModalCancel() {
        setEditRecordModalVisibility(false);
    }
    function openEditRecordModal(index: number) {
        const tempRecord = records[index];
        setEditRecord({
            forecast: tempRecord.forecast,
            result: tempRecord.result,
            isRight: tempRecord.isRight,
        });
        setEditRecordModalVisibility(true);
    }

    return (
        <div style={{padding: '20px'}}>
            <div>
                <Input style={{width: '300px', marginRight: '50px'}} addonBefore="股票名字" placeholder="name" />
                <Input style={{width: '300px', marginRight: '50px'}} addonBefore="股票代码" placeholder="code" />

                <Button type="primary" onClick={openRecordModal}>
                    添加记录
                </Button>
            </div>
            <div style={{marginTop: '20px'}}>
                <Input.Group compact>
                    <Input style={{width: '80px'}} placeholder="开始时间" />
                    <DatePicker style={{width: '220px', marginRight: '50px'}} />

                    <Input style={{width: '80px'}} placeholder="结束时间" />
                    <DatePicker style={{width: '221px'}} />
                </Input.Group>
            </div>

            <div style={{marginTop: '20px'}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>开始时间</th>
                            <th>股票名字</th>
                            <th>股票代码</th>
                            <th>趋势预测</th>
                            <th>实际趋势</th>
                            <th>预测结果</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <td>{record.startDate}</td>
                                    <td>{record.name}</td>
                                    <td>{record.code}</td>
                                    <td>{record.forecast}</td>
                                    <td>{record.result}</td>
                                    <td>{record.isRight ? '正确' : '错误'}</td>
                                    <td>
                                        <span className="a">删除</span>-
                                        <span className="a" onClick={() => openEditRecordModal(index)}>
                                            编辑
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <Modal
                title="添加记录"
                destroyOnClose
                visible={addRecordModalVisibility}
                onOk={addRecordModalOk}
                onCancel={addRecordModalCancel}
            >
                <div>
                    <Input
                        onChange={e => recordChange(e, RecordEnum.Name)}
                        style={{width: '300px'}}
                        addonBefore="股票名字"
                        placeholder="name"
                    />
                </div>
                <div style={{marginTop: '20px'}}>
                    <Input
                        onChange={e => recordChange(e, RecordEnum.Code)}
                        style={{width: '300px'}}
                        addonBefore="股票代码"
                        placeholder="code"
                    />
                </div>
                <div style={{marginTop: '20px'}}>
                    <p>趋势预测</p>
                    <TextArea onChange={e => recordChange(e, RecordEnum.Forecast)} rows={4} />
                </div>
            </Modal>
            <Modal
                title="修改记录"
                destroyOnClose
                visible={editRecordModalVisibility}
                onOk={editRecordModalOk}
                onCancel={editRecordModalCancel}
            >
                <div>
                    <p>趋势预测</p>
                    <TextArea value={editRecord.forecast} rows={4} />
                </div>
                <div style={{marginTop: '20px'}}>
                    <p>实际趋势</p>
                    <TextArea onChange={e => editRecordChange(e, EditRecordNum.Result)} rows={4} />
                </div>
                <div style={{marginTop: '20px'}}>
                    <p>预测结果</p>
                    <Radio.Group value={editRecord.isRight} onChange={e => editRecordRadioChange(e)}>
                        <Radio value={true}>正确</Radio>
                        <Radio value={false}>错误</Radio>
                    </Radio.Group>
                </div>
            </Modal>
        </div>
    );
}
