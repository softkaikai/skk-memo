/** @format */

import api from './base.api';

export interface SaveRecord {
    _id: string;
    title: string;
    projectId: string;
    imgUrl?: string;
    tags: string[];
    jsCode?: string;
    cssCode?: string;
    htmlCode?: string;
}

function save(data: SaveRecord) {
    return api({
        method: 'post',
        url: '/record/save',
        contentType: 'ajax',
        data
    });
}

export interface FindRecord {
    title: string;
    projectId: string;
    tags: string[];
}

function find(data: FindRecord) {
    return api({
        method: 'post',
        url: '/record/find',
        contentType: 'ajax',
        data,
    })
}

function findById(id: string) {
    return api({
        method: 'get',
        url: `/record/findById/${id}`
    })
}

function deleteById(id: string) {
    return api({
        method: 'get',
        url: `/record/delete/${id}`
    })
}


export default {
    save,
    find,
    findById,
    deleteById,
};
