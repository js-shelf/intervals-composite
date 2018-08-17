const intervals = {};
let counter = 0;

const count = () => counter;

const interval = (options) => {
  const { cb, ms } = options;
  if (!(typeof cb === 'function')) {
    throw new Error('"cb" is not a valid callback function');
  }
  if (Number.isNaN(+ms) || ms < 0) {
    throw new Error('"ms" is not a valid milliseconds number');
  }

  let id = null;
  const start = () => { id = setInterval(cb, ms); };
  const clear = () => clearInterval(id);
  return { start, clear };
};

const add = (options) => {
  const { label, cb, ms } = options;
  if (intervals[label] === undefined) {
    intervals[label] = interval({ cb, ms });
    counter += 1;
  } else {
    throw new Error(`interval "${label}" already added`);
  }
};

const get = label => intervals[label] || null;

const remove = (label) => {
  if (intervals[label] !== undefined) {
    intervals[label].clear();
    delete intervals[label];
    counter -= 1;
  }
};

const removeAll = () => Object.keys(intervals).forEach(remove);

const start = () => Object.keys(intervals)
  .forEach(label => intervals[label].start());

const clear = () => Object.keys(intervals)
  .forEach(label => intervals[label].clear());

module.exports = {
  interval,
  add,
  get,
  remove,
  removeAll,
  count,
  start,
  clear
};