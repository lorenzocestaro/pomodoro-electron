const EventEmitter = require('events').EventEmitter;

const config = require('../config');
const { actions, timerStates } = config;

const TimerPrototype = {
  ...EventEmitter.prototype(),

  // Properties
  timerState: timerStates.INACTIVE,
  endDate: null,
  interval: null,
  currentTime = () => new Date().getTime(),
  timeLeft = () => endDate? endDate.getTime() - currentTime() : null,

  // Helpers and generic methods
  setTimerState = (newState) => {
    this.timerState = newState;
    this.emit(action.TIMER_CHANGED_STATE, newState);
  },
  startTimer = ({ timerDuration, eventToEmit }) => () => {
    this.endDate = new Date(currentTime() + (timerDuration));
    this.interval = setInterval(this.emit(actions.TICK), config.oneSecond);
    this.emit(eventToEmit);
  },
  goInactive = () => {
    clearInterval(interval);
    this.setState(states.INACTIVE);
  },

  // Event handlers
  startPomodoro = startTimer({
    timerDuration: config.pomodoroLength,
    eventToEmit: actions.POMODORO_TIMER_STARTED,
  }),
  startShortBreak = startTimer({
    timerDuration: config.shortBreakLength,
    eventToEmit: actions.SHORT_BREAK_TIMER_STARTED,
  }),
  startLongBreak = startTimer({
    timerDuration: config.longBreakLength,
    eventToEmit: actions.LONG_BREAK_TIMER_STARTED,
  }),
  forceStop = () => {
    goInactive();
    this.emit(actions.TIMER_WAS_STOPPED);
  },
  checkIfTimerEnded = () => {
    const timeLeft = this.timeLeft();
    if (timeLeft && timeLeft.minutes <= 0 && timeLeft.seconds <= 0) {
      const cases = {
        [timerStates.POMODORO]: actions.POMODORO_TIMER_ENDED,
        [timerStates.SHORT_BREAK]: actions.SHORT_BREAK_TIMER_ENDED,
        [timerStates.LONG_BREAK]: action.LONG_BREAK_TIMER_ENDED,
      }
      emit(cases[this.timerState]);
    }
  },
}

function Timer() {
  const timer = TimerPrototype();

  // Listen to events from App
  timer.on(actions.START_POMODORO, timer.startPomodoro);
  timer.on(actions.START_SHORT_BREAK, timer.startShortBreak);
  timer.on(actions.START_LONG_BREAK, timer.startLongBreak);
  timer.on(actions.STOP_TIMER, timer.forceStop);

  // Listen to events from Timer
  timer.on(actions.TICK, timer.checkIfTimerEnded);
  timer.on(actions.POMODORO_TIMER_ENDED, timer.startShortBreak);
  timer.on(actions.SHORT_BREAK_TIMER_ENDED, timer.goInactive);
  timer.on(actions.LONG_BREAK_TIMER_ENDED, timer.goInactive);

  return Timer;
}

module.exports = Timer();
