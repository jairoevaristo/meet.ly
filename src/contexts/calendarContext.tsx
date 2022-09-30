import { ReactNode, createContext, useState, useMemo, useCallback, SetStateAction } from "react";
import { format, startOfToday, add, parse, eachDayOfInterval, endOfWeek, endOfMonth } from 'date-fns';

type ContextData = {
  nextMonth: () => void;
  prevMonth: () => void;
  selectDay: Date;
  dates: Date[];
  today: Date;
  firtsDay: Date;
  clickAddMeet: boolean;
  onDate: (date: Date) => void;
  onClickAddMeet: (value: boolean) => void;
};

export const contextCalendar = createContext({} as ContextData);


export function CalenderProvider({ children }: { children: ReactNode }) {
  const today = startOfToday();

  const [selectDay, setSelectDay] = useState<Date>();
  const [clickAddMeet, setClickAddMeet] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  
  const firtsDay = parse(currentMonth, 'MMM-yyyy', new Date());

  const dates = eachDayOfInterval({
    start: firtsDay,
    end: endOfWeek(endOfMonth(firtsDay))
  });

  const nextMonth = useCallback(() => {
    setCurrentMonth(format(add(firtsDay, { months: 1 }), 'MMM-yyyy'))
  }, [firtsDay]);

  const onClickAddMeet = useCallback((value: boolean) => {
    setClickAddMeet(value)
  }, []);

  const prevMonth = useCallback(() => {
    setCurrentMonth(format(add(firtsDay, { months: -1 }), 'MMM-yyyy'))
  }, [firtsDay]);

  const onDate = useCallback((date: Date) => {
    setSelectDay(date);
  }, []);

  const value = useMemo(() => ({
    selectDay,
    dates,
    onDate,
    prevMonth,
    firtsDay,
    today,
    clickAddMeet,
    onClickAddMeet,
    nextMonth,
  }), [
    selectDay,
    dates,
    onDate,
    prevMonth,
    clickAddMeet,
    firtsDay,
    onClickAddMeet,
    today,
    nextMonth,
  ]);

  return (
    <contextCalendar.Provider value={value}>
      {children}
    </contextCalendar.Provider>
  )
}