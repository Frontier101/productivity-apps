export default class TodoClass {
    constructor(id, name, date, goal, category, priority){
        this.id = id;
        this.name = name;
        this.status = 'todo';
        this.date = date;
        this.time = TodoClass.getDate(new Date(date));
        this.category = category;
        this.priority = priority;
        this.goal = goal;
    }
    static getDate(date){
        const now = new Date();
        const day = 1000 * 60 * 60 * 24;

        const utc = (d) =>{
            return (
                Date.UTC(
                    d.getFullYear(), 
                    d.getMonth(), 
                    d.getDate(),
                )
            )
        }

        const todayUTC = utc(now);
        const dateUTC = utc(date);

        const diffInDays = Math.round((todayUTC - dateUTC) / day);
        
        if(date.getFullYear() < now.getFullYear()){
            return 'Last Year(s)'
        }
        if(date.getMonth() < now.getMonth()){
            return 'Last Month'
        }

        if(diffInDays === 0) return 'Today';
        if(diffInDays === 1) return 'Yesterday';
        if(diffInDays < 7 && now.getDay()>date.getDay()) return 'this Week';
        if(diffInDays < 14) return 'last weak';
        if(date.getMonth() === now.getMonth()){
            return 'This Month';
        }
        return 'This Year';
    }

    static sortBy(todoList, type, sortList){
        if(!sortList.length) return {};
        
        let sorted = {};
        sortList.forEach(sort => {
            sorted[sort] = todoList.filter(todo=>(
                todo.hasOwnProperty(type) && todo[type] === sort 
            ));
        });
        return sorted;
    }
}