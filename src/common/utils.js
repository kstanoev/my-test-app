import dayjs from 'dayjs';

/**
 * Returns a two-dimensional matrix with the days of the month in the given year and month
 * starting from the first day of the week. Format: [[dayjs, dayjs, ...], [dayjs, dayjs, ...], ...]
 * @param {number} year
 * @param {number} month
 * @returns {Array<Array<dayjs.Dayjs>>}
 */
export function getMonth(year = dayjs().year(), month = dayjs().month()) {
  const firstDay = dayjs(new Date(year, month, 1)).day();
  let daysCount = 0 - firstDay;

  const matrix = new Array((firstDay > 5 ||
    (firstDay > 4 && dayjs().daysInMonth(month) > 30)) ? 6 : 5).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        daysCount++;
        return dayjs(new Date(year, month, daysCount));
      });
    });
  return matrix;
}
