import { getDuration, getItem, storage } from "../helperFunctions";

const pomodoroStorage = storage('pomodoro');

export const reducer = (state, action, callback) =>{
    const index = getItem(
        'id',
        action.payload,
        state.pomodoroList
    );
    callback(state.pomodoroList[index]);
    pomodoroStorage(state.pomodoroList);
}


export const countdown = (pomodoro) =>{
    const session = pomodoro.sessions[pomodoro.currentSession];
    if(pomodoro.seconds === getDuration(session.duration)) {
        for(let [i, s] of session.numOfSessions.entries()){
            if(s === 0){
                session.numOfSessions[i]= 1;
                break;
            }
        }
        pomodoro.currentSession = (
            pomodoro.currentSession === 'Focus'
            ? 'Break' : 'Focus'
        );
        pomodoro.seconds = 0;
        return;
    }
    pomodoro.counter += 1000;
    pomodoro.totalDuration -= 1000;
    pomodoro.seconds += 1000;
}

export const resetTimer = (pomodoro) =>{
    const numOfSessions = label => (
        pomodoro.sessions[label].numOfSessions
    );
    pomodoro.seconds = 0;
    pomodoro.isPlay = false;
    pomodoro.currentSession = 'Focus';
    pomodoro.totalDuration = 0;
    Object.keys(pomodoro.sessions).forEach(key=>{
        numOfSessions(key).fill(0);
        pomodoro.totalDuration += (
            numOfSessions(key).length * 
            getDuration(pomodoro.sessions[key].duration)
        );
    });
    pomodoro.counter = 0;
    const now = new Date();
    pomodoro.realTime = new Date(
        now.getTime() + 
        pomodoro.totalDuration + 
        (2000 * (numOfSessions('Focus').length + 1) )
    ).toISOString();
}

export const setIsPlay = (pomodoro) =>{
    pomodoro.isPlay = !pomodoro.isPlay;
}
export const pauseTimer = (pomodoro) =>{
    pomodoro.isPlay = false;
}