import Todo from "./TodoClass";

export const todosStorage = (todos)=>{
    // localStorage.removeItem('todos');
    if(!todos) {
        const storedTodos = JSON.parse(localStorage.getItem('todos'))
        if(storedTodos){
            return storedTodos.map(todo => (
                {...todo, time : Todo.getDate(new Date(todo.date))}
            ));
        }
        return [];
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}


export const getSorts = () => {
    const list = todosStorage();
    const sorts = {
        'category':[''],
        'time':['Today'],
        'priority':[
            'High Priority',
            'Medium Priority',
            'Low Priority',
        ],
        'goal':[],
        'status':['todo', 'done']
    }
    Object.keys(sorts).forEach(key=>{
        list.forEach(todo=>{
            if(todo[key] !== null && !sorts[key].includes(todo[key])){
                sorts[key].push(todo[key]);
            }
        })
    })
    return sorts;
}