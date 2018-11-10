const pomodoroLength = 25 * 60 * 1000;
const longBreakLength = 10 * 60 * 1000;
const shortBreakLength = 5 * 60 * 1000;
const oneSecond = 100;

const appCanEmit = {
  START_POMODORO: Symbol('START_POMODORO'),
  START_SHORT_BREAK: Symbol('START_SHORT_BREAK'),
  START_LONG_BREAK: Symbol('START_LONG_BREAK'),
  STOP_TIMER: Symbol('STOP_TIMER'),
}

const timerCanEmit = {
  TICK: Symbol('TICK'),
  POMODORO_TIMER_STARTED: Symbol('POMODORO_TIMER_STARTED'),
  SHORT_BREAK_TIMER_STARTED: Symbol('SHORT_BREAK_TIMER_STARTED'),
  LONG_BREAK_TIMER_STARTED: Symbol('LONG_BREAK_TIMER_STARTED'),
  POMODORO_TIMER_ENDED: Symbol('POMODORO_TIMER_ENDED'),
  SHORT_BREAK_TIMER_ENDED: Symbol('SHORT_BREAK_TIMER_ENDED'),
  LONG_BREAK_TIMER_ENDED: Symbol('LONG_BREAK_TIMER_ENDED'),
  TIMER_WAS_STOPPED: Symbol('TIMER_WAS_STOPPED'),
  TIMER_CHANGED_STATE: Symbol('TIMER_CHANGED_STATE'),
}

const timerStates = {
  POMODORO: Symbol('POMODORO'),
  SHORT_BREAK: Symbol('SHORT_BREAK'),
  LONG_BREAK: Symbol('LONG_BREAK'),
  INACTIVE: Symbol('INACTIVE'),
}


module.exports = {
  actions: { ...appCanEmit, ...timerCanEmit },
  longBreakLength,
  oneSecond,
  pomodoroLength,
  shortBreakLength,
  timerStates,
};
