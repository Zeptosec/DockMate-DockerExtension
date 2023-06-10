const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
export function BytesToReadable(bytes: number){
    let divTimes = 0;
    let rz = bytes;
    while(rz > 1000){
        rz /= 1000;
        divTimes++;
    }
    return `${rz} ${sizes[divTimes]}`;
}