const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
export function BytesToReadable(bytes: number, decimals: number = 2){
    let divTimes = 0;
    let rz = bytes;
    while(rz > 1000){
        rz /= 1000;
        divTimes++;
    }
    return `${Math.round(rz*10**decimals)/10**decimals} ${sizes[divTimes]}`;
}