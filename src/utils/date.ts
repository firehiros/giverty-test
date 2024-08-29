import * as Moment from 'moment-timezone';

import { GMT_8_TIMEZONE } from '@config/constants';

export const MOMENT_DATE = {
  DEFAULT: 'YYYY-MM-DD HH:mm:ss.SSSSSS',
  YYYY_MM_DD: 'YYYY-MM-DD',
  YYYY_MM: 'YYYY-MM',
  YYYYMMDD: 'YYYY/MM/DD',
  YYYYMMDD2: 'YYYYMMDD',
  MMDDYYYY: 'MM/DD/YYYY',
  DD_MM_YYYY: 'DD-MM-YYYY',
  DDMMYYYY: 'DD/MM/YYYY',
  YYYYMMDDHHMMSSSSS: 'YYYYMMDDHHmmssSSS',
  YYYY_MM_DD_00_00_00: 'YYYY-MM-DD 00:00:00.000',
  YYYY_MM_DD_23_59_59: 'YYYY-MM-DD 23:59:59.999',
  YYYY: 'YYYY',
  YYYY_MM_DD_HH_MM_SS: 'YYYY-MM-DD HH:mm:ss',
  YYYY_MM_00: 'YYYY-MM-01',
};

export function parse2Str(date, format = MOMENT_DATE.DEFAULT) {
  return Moment.tz(date, GMT_8_TIMEZONE).format(format);
}
export function addDays(date: any, days: number) {
  return Moment.tz(date, GMT_8_TIMEZONE).add(days, 'days').toDate();
}

export function getStartEndOfMonth(date) {
  const start = Moment.tz(date, GMT_8_TIMEZONE)
    .startOf('month')
    .format(MOMENT_DATE.YYYY_MM_DD_HH_MM_SS);
  const end = Moment.tz(date, GMT_8_TIMEZONE)
    .endOf('month')
    .format(MOMENT_DATE.YYYY_MM_DD_HH_MM_SS);
  return {
    start,
    end,
  };
}

export function getStartEndOfYear(date) {
  const start = Moment.tz(date, GMT_8_TIMEZONE)
    .startOf('year')
    .format(MOMENT_DATE.YYYY_MM_DD_HH_MM_SS);
  const end = Moment.tz(date, GMT_8_TIMEZONE)
    .endOf('year')
    .format(MOMENT_DATE.YYYY_MM_DD_HH_MM_SS);
  return {
    start,
    end,
  };
}

export function isSameMonth(date1: any, date2: any) {
  const m1 = Moment.tz(date1, GMT_8_TIMEZONE);
  const m2 = Moment.tz(date2, GMT_8_TIMEZONE);
  return m1.isSame(m2, 'month');
}

export function isSameDay(date1: any, date2: any) {
  const m1 = Moment.tz(date1, GMT_8_TIMEZONE);
  const m2 = Moment.tz(date2, GMT_8_TIMEZONE);
  return m1.isSame(m2, 'day');
}
