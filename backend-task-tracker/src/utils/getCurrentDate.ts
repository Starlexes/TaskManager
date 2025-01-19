import { LOCALE, TIMEZONE } from 'src/constants/timeOptions';

export const getCurrentDate = (): Date => {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat(LOCALE, {
    timeZone: TIMEZONE,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formattedDate = formatter.formatToParts(now);

  const dateParts: Record<string, string> = {};
  formattedDate.forEach(({ type, value }) => {
    dateParts[type] = value;
  });

  const isoString = `${dateParts.year}-${dateParts.month}-${dateParts.day}T${dateParts.hour}:${dateParts.minute}:${dateParts.second}Z`;

  return new Date(isoString);
};
