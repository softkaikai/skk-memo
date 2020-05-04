/** @format */

import axios from 'axios';
import qs from 'qs';

interface ApiData {
    method?: string;
    url: string;
    contentType?: string;
    data?: any;
}
export default function(req: ApiData) {
    const baseURL = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:3333' : 'http://some-domain.com';
    const headers: any = {};
    if (req.contentType === 'file') {
        headers['Content-Type'] = 'multipart/form-data';
    } else {
        headers['Content-Type'] = 'ajax' ? 'application/x-www-form-urlencoded' : 'application/json';
    }
    const config: any = {
        baseURL,
        headers,
        method: req.method || 'get',
        url: req.url,
        transformRequest(data: any, headers: any) {
            if (headers['Content-Type'] === 'multipart/form-data') {
                return data;
            }
            return qs.stringify(data);
        },
        transformResponse(data: any) {
            return JSON.parse(data);
        },
    };
    if (config.method === 'get' && req.data) {
        config.params = req.data;
    }
    if (config.method === 'post' && req.data) {
        config.data = req.data;
    }

    return axios(config);
}
