/** @format */

import React, {useState, useEffect} from 'react';
import {Tag, message} from 'antd';
import {deepCopy} from '@utils/tool.util';
import tagApi from '@apis/tag.api';

const {CheckableTag} = Tag;

export interface RefFunction {
    (): Array<string>;
}
export interface InitFunction {
    (tags: string[]): void;
}
interface Props {
    onRef?: (fn: RefFunction) => void;
    onInit?: (fn: InitFunction) => void;
}
interface TagArray {
    name: string;
    id: string;
    checked: boolean;
}

export default function CheckTag(props: Props) {
    const [searchTags, setSearchTags] = useState<TagArray[]>([]);

    function init(checkedTags: string[]) {
        const temp = deepCopy(searchTags);
        temp.forEach((i:any) => {
            i.checked = checkedTags.includes(i.name);
        })
        setSearchTags(temp)
    }

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
        if (props.onInit) {
            props.onInit(init);
        }
    });
    useEffect(() => {
        tagApi
                .find()
                .then((res: any) => {
                    const data = res.data;
                    if (data.code === '0') {
                        const tags: any = data.data;
                        const newTags = tags.map((i: any) => {
                            return {
                                name: i.name,
                                checked: false,
                                id: i._id
                            }
                        })
                        setSearchTags(newTags);
                    } else {
                        message.error(data.msg);
                    }
                });
    }, [])

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
