/** @format */

import api from './base.api';

export interface ProjectData {
    title: string;
    description: string;
    owner: string;
    users: Array<string>;
}
export interface SavedProjectData extends ProjectData {
    _id:string;
}
function create(data: ProjectData) {
    return api({
        method: 'post',
        url: '/project/create',
        contentType: 'ajax',
        data,
    });
}

function find(data: {phone:string}) {
    return api({
        method: 'get',
        url: '/project/find',
        data
    });
}

function deleteOne(id: string) {
    return api({
        method: 'post',
        url: '/project/delete/' + id,
    });
}

function join(data: {phone: string, title: string}) {
    return api({
        method: 'post',
        url: '/project/join',
        contentType: 'ajax',
        data,
    });
}
export default {
    create,
    join,
    find,
    deleteOne,
};
