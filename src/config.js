const pomodoroLength = 25 * 60 * 1000;
const longBreakLength = 10 * 60 * 1000;
const shortBreakLength = 5 * 60 * 1000;
const oneSecond = 100;

const appCanEmit = {
  START_POMODORO: 'app0',
  START_SHORT_BREAK: 'app1',
  START_LONG_BREAK: 'app2',
  STOP_TIMER: 'app3',
}

const timerCanEmit = {
  POMODORO_TIMER_STARTED: 'timer0',
  SHORT_BREAK_TIMER_STARTED: 'timer1',
  LONG_BREAK_TIMER_STARTED: 'timer2',
  POMODORO_TIMER_ENDED: 'timer3',
  SHORT_BREAK_TIMER_ENDED: 'timer4',
  LONG_BREAK_TIMER_ENDED: 'timer5',
  TIMER_WAS_STOPPED: 'timer6',
  TICK: 'timer7',
  TIMER_CHANGED_STATE: 'timer8',
}

const timerStates = {
  POMODORO: '0',
  SHORT_BREAK: '1',
  LONG_BREAK: '2',
  INACTIVE: '3',
}


module.exports = {
  actions: { ...appCanEmit, ...timerCanEmit },
  longBreakLength,
  oneSecond,
  pomodoroLength,
  shortBreakLength,
  timerStates,
};
