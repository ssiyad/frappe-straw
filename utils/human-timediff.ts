const whole = /^((\d+(\.\d+)*)(ns|ms|us|µs|m|s|h))+$/;
const pieces = /((\d+(\.\d+)*)(ns|ms|us|µs|m|s|h))/g;
const measure = /(ns|ms|us|µs|m|s|h)/g;

const multipliers: Record<string, number> = {
  ns: 1e-6,
  us: 0.001,
  µs: 0.001,
  ms: 1,
  s: 1000,
  m: 60000,
  h: 3.6e6,
};

const analyse = (time: string) => {
  const unit = time.match(measure)?.shift() || '';
  time = time.substring(0, time.length - unit.length);

  return parseFloat(time) * multipliers[unit];
};

export const humanTimediff = (time: string | number) => {
  // If the time is already a number, return it.
  if (typeof time === 'number') {
    return time;
  }

  // If the time is a string, check if it is valid.
  if (!whole.test(time)) {
    throw new Error('invalid time');
  }

  // Get the actual time from the string.
  return time.match(pieces)?.reduce((acc, value) => {
    return acc + analyse(value);
  }, 0);
};
