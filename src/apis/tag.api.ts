/** @format */

import api from './base.api';


function create(name: string) {
    return api({
        method: 'post',
        url: '/tag/create',
        contentType: 'ajax',
        data: {name}
    });
}

function find() {
    return api({
        url: 'tag/find'
    })
}


export default {
    create,
    find,
};
