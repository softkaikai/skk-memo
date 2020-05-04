/** @format */

import api from './base.api';

function image(data: any) {
    return api({
        method: 'post',
        url: '/upload/image',
        contentType: 'file',
        data
    })
}


export default {
    image,
};
