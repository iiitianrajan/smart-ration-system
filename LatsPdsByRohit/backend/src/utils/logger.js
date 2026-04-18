function write(level, event, meta = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    event,
    ...meta,
  };

  const line = JSON.stringify(payload);

  if (level === 'error') {
    console.error(line);
    return;
  }

  console.log(line);
}

function info(event, meta) {
  write('info', event, meta);
}

function warn(event, meta) {
  write('warn', event, meta);
}

function error(event, meta) {
  write('error', event, meta);
}

module.exports = {
  info,
  warn,
  error,
};
