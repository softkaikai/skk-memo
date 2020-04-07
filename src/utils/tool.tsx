/** @format */

export function deepCopy(data: any) {
    if (data == null) return data;

    return JSON.parse(JSON.stringify(data));
}
