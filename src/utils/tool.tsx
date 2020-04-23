/** @format */

export function deepCopy(data: any) {
    if (data == null) return data;

    return JSON.parse(JSON.stringify(data));
}

export function addZero(num: Number): string {
    if (num < 10) {
        return '0' + num;
    }

    return '' + num;
}

export function getYMD(date?: Date): string {
    if (!date) {
        date = new Date();
    }

    return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
}
