/** @format */

import React, {useState, useEffect} from 'react';
import {Tag} from 'antd';
import {deepCopy} from '@utils/tool.util';
const {CheckableTag} = Tag;

export interface RefFunction {
    (): Array<string>;
}
interface Props {
    onRef?: (fn: RefFunction) => void;
}

export default function CheckTag(props: Props) {
    const [searchTags, setSearchTags] = useState([
        {name: 'magenta', checked: false},
        {name: 'red', checked: false},
        {name: 'volcano', checked: false},
        {name: 'orange', checked: false},
        {name: 'gold', checked: false},
        {name: 'lime', checked: false},
        {name: 'green', checked: false},
        {name: 'cyan', checked: false},
        {name: 'blue', checked: false},
        {name: 'geekblue', checked: false},
        {name: 'purple', checked: false},
    ]);

    function searchTagChange(index: number) {
        const temp = deepCopy(searchTags);
        temp[index].checked = !temp[index].checked;
        setSearchTags(temp);
    }

    function getCheckedTags() {
        return searchTags.filter(i => i.checked).map(i => i.name);
    }

    useEffect(() => {
        if (props.onRef) {
            props.onRef(getCheckedTags);
        }
    });

    return (
        <div style={{width: '100%'}}>
            {searchTags.map((tag, index) => {
                return (
                    <CheckableTag key={tag.name} onChange={() => searchTagChange(index)} checked={tag.checked}>
                        {tag.name}
                    </CheckableTag>
                );
            })}
        </div>
    );
}
