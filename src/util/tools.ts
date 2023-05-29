import { resolve } from "path";

export function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(void 0);
        }, ms);
    });
}

export function wait(func: () => [boolean, any], times: number, ms: number = 100) {
    return new Promise((resolve) => {
        let result = func();
        if(!result[0]) {
            let timer = setInterval(() => {
                result = func();
                if(result[0] || times === 0) {
                    clearInterval(timer);
                    resolve(result);
                } else {
                    times--;
                }
            }, ms);
        } else {
            resolve(result);
        }
    });
}
export function trim(val: string) {
    if(typeof val !== 'string') {
        return null;
    }
    return val.replace(/(^\s*)|(\s*$)/g, ""); 
}