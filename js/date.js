
function getCurrentTime() {
  const clock = new Date().toLocaleTimeString([], {hour: '2-digit', minute: 'numeric'});
  renderTime(clock);
}

setInterval(getCurrentTime, 1000)



