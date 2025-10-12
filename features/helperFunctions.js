export const setId = (arr) => {
    return arr.length ? arr[0].id + 1 : 0;
}

export const getItem = (key ,name, arr) => {
    return arr.findIndex(item => item[key]=== name);
}

export const storage = (itemName) =>{
    return (item)=>{
        if(!item) return JSON.parse(localStorage.getItem(itemName) || '[]');
        localStorage.setItem(itemName, JSON.stringify(item));
    }
}

export const getNames = (list)=>{
    return list.map(item => item.name);
}

export const deleteItem = (list, id, storage) => {
    const index = list.findIndex(
        item => item.id === id
    );
    list.splice(index, 1);
    storage(list);
}

export const sortByTime = (arr) =>{
    return arr.sort((obj1, obj2)=>(
        new Date(obj1.deadline) - new Date(obj2.deadline)
    ))
}

export const timeCounter = (duration) => {
    const formatTimer = num => num < 10 ? '0'+num : num;

    const hours = formatTimer(Math.floor(duration / 3600000));
    const minutes = formatTimer(Math.floor((duration - hours*3600000) / 60000));
    const secs = formatTimer((duration - hours*3600000 - minutes*60000)/1000);

    return {hours, minutes, secs};
}

export const getDuration = (obj) => {
    const h = obj.h * 60 * 60 * 1000;
    const min = obj.min * 60 * 1000;
    const sec = obj.sec * 1000;

    return h + min + sec;
}