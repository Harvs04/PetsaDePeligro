export function isToday(date: Date): boolean {
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function withinPeriod(inputDate: Date, period: string): boolean {
  const today = new Date();
  const d = new Date(inputDate);

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const todayStart = startOfDay(today);
  const dateStart = startOfDay(d);

  switch (period) {
    case 'TODAY':
      return isToday(inputDate);

    case 'YESTERDAY': {
      const yesterday = new Date(todayStart);
      yesterday.setDate(yesterday.getDate() - 1);
      return dateStart.getTime() === yesterday.getTime();
    }

    case 'THIS_WEEK': {
      const startOfWeek = new Date(todayStart);
      startOfWeek.setDate(today.getDate() - today.getDay());
      return d >= startOfWeek && d <= today;
    }

    case 'LAST_WEEK': {
      const startOfLastWeek = new Date(todayStart);
      startOfLastWeek.setDate(today.getDate() - today.getDay() - 7);
      const endOfLastWeek = new Date(startOfLastWeek);
      endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
      return d >= startOfLastWeek && d <= endOfLastWeek;
    }

    case 'LAST_MONTH': {
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      return d >= startOfLastMonth && d <= endOfLastMonth;
    }

    case 'LAST_YEAR': {
      const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
      const endOfLastYear = new Date(today.getFullYear() - 1, 11, 31);
      return d >= startOfLastYear && d <= endOfLastYear;
    }

    default:
      return true;
  }
}