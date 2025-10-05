export const reducer = (state, action) => {
        if(action.type === 'ADD_TASK') {
            const newtasks = [...state.tasks, action.payload];
            return {
                ...state,
                tasks: newtasks
            };
        };
        if(action.type === 'UPDATE'){
            const newTasks = state.tasks.map((t) =>
                t.id === action.payload ? {...t, stat: !t.stat} : t
            );
            return {...state, tasks: newTasks}
        };
        if(action.type === 'REMOVE'){
            const newTasks = state.tasks.filter((t) => 
                t.id !== action.payload
            );
            return {...state, tasks: newTasks}
        }
        if(action.type === 'LOADTASKS'){
            const newTasks = action.payload;
            return {...state, tasks: newTasks}
        }
        throw new Error('no match')
    };