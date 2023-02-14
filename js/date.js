// Variables
const INTERVAL_MS = 1000;

// load
initDate();

function getCurrentTime() {
  const clock = new Date().toLocaleTimeString([], {hour: '2-digit', minute: 'numeric'});
  renderTime(clock);
}

function initDate() {
  setInterval(getCurrentTime, INTERVAL_MS);
}



