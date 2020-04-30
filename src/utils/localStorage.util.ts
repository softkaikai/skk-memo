/** @format */

export default {
    get(key: string) {
        return JSON.parse(localStorage.getItem(key) as string);
    },
    set(key: string, value: any) {
        if (value == null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    },
    remove(key: string) {
        localStorage.removeItem(key);
    },
    clear() {
        for (const [key, value] of Object.entries(localStorage)) {
            localStorage.removeItem(key);
        }
    },
};
