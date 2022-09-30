import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { format } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";

import { useCalendar } from "../hooks/useCalendar";

import { CardDay } from "./CardDay";

export const Calendar = () => {
  const { dates, nextMonth, prevMonth, firtsDay } = useCalendar();

  return (
    <div className="w-full px-6 overflow-auto h-screen">
      <header className="flex items-center justify-between">
        <p className="font-bold text-gray-900 uppercase">
          {format(firtsDay, "LLLL yyyy", { locale: ptBr })}
        </p>
        <div className="flex items-center space-x-6">
          <button onClick={prevMonth}>
            <ChevronLeftIcon className="h-4 w-4 text-gray-400 hover:text-gray-900 transition-colors" />
          </button>
          <button onClick={nextMonth}>
            <ChevronRightIcon className="h-4 w-4 text-gray-400 hover:text-gray-900 transition-colors" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-gray-500 border-b divide-x-2">
        <div className="px-5">D</div>
        <div className="px-5">S</div>
        <div className="px-5">T</div>
        <div className="px-5">Q</div>
        <div className="px-5">Q</div>
        <div className="px-5">S</div>
        <div className="px-5">S</div>
      </div>

      <div className="grid grid-cols-7 w-full pb-52 2xl:pb-30 overflow-y-auto">
        {dates.map((day, index) => {
          return <CardDay day={day} index={index} key={index} />;
        })}
      </div>
    </div>
  );
};
