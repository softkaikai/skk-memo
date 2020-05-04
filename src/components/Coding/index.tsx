import React, {useState, useEffect} from 'react';
import {message, Button, Modal, Input} from 'antd';
import cssModule from './index.module.css';
import ClipboardJS from 'clipboard';
const {TextArea} = Input;

interface Props {
    language: string;
    code: string;
    setCode(code: string): void;
}
export default function Coding(props: Props) {
    const [modalVisibility, setModalVisibility] = useState(false);
    const [code, setCode] = useState('');

    function openModal() {
        console.log(props)
        setCode(props.code);
        setModalVisibility(true);
    }
    function modalOk() {
        props.setCode(code);
        setModalVisibility(false);
    }
    function modalCancel() {
        setModalVisibility(false);
    }

    useEffect(() => {
        let clipboard: any;
        clipboard = new ClipboardJS(`#${props.language}`, {
            text: function() {
                if (!code && !props.code) {
                    message.error('都没内容，还点什么点啊💩');
                }
                return props.code || code;
            },
        });

        clipboard.on('success', function() {
            message.success('复制成功');
        });
        
        clipboard.on('error', function() {
            message.error('复制出错');
        });

        return function cancel() {
            clipboard.destroy();
        }
    }, [props.code])

    return (
        <div className={cssModule.main}>
            <Modal
                title="编辑代码"
                destroyOnClose
                visible={modalVisibility}
                onOk={modalOk}
                onCancel={modalCancel}
            >
                <TextArea defaultValue={code} onChange={e => setCode(e.target.value)} rows={10} />
            </Modal>
            <div className={cssModule.main__title}>
                <span >{props.language}</span>
                <Button 
                    type="primary" 
                    style={{marginLeft: '20px'}}
                    onClick={openModal}
                >编辑</Button>
                <button id={props.language} style={{marginLeft: '20px'}}>copy</button>
            </div>
            <div className={cssModule.main__code}>
                <pre>
                    <code>{props.code}</code>
                </pre>
            </div>
        </div>
    )
}