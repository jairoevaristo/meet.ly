import { useState, useContext } from "react";
import { format, getDay, isEqual, isSameMonth, isToday } from "date-fns";

import { useCalendar } from "../hooks/useCalendar";

import { tagContext } from "../contexts/TagContext";

import { MenuTag } from "./MenuTag";

type CardDayProsp = {
  day: Date;
  index: number;
};

let getGridCols = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export function CardDay({ day, index }: CardDayProsp) {
  const { onDate, selectDay, firtsDay, today, onClickAddMeet } = useCalendar();
  const { onSelectTypeTag } = useContext(tagContext);

  const [showAddMeet, setShowAddMeet] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowAddMeet(true)}
      onMouseLeave={() => setShowAddMeet(false)}
      className={`h-36 w-full relative bg-gray-50 px-4 py-2 border border-gray-100 cursor-pointer hover:border-gray-400 transition-colors ${
        index === 0 && getGridCols[getDay(day)]
      }`}
      key={index}
      onClick={() => onDate(day)}
    >
      {showAddMeet && (
        <div
          onClick={(e) => {
            onClickAddMeet(true);
          }}
          className="absolute right-1 z-20 top-3 bg-gray-200 rounded-md hover:-translate-y-[2px] duration-150 hover:bg-gray-300"
        >
          <MenuTag />
        </div>
      )}

      <button
        className={`rounded-full w-8 h-8 flex items-center justify-center ${
          isEqual(day, selectDay || today) &&
          isToday(day) &&
          "bg-green-500 font-bold text-white shadow-md "
        } ${!isSameMonth(day, firtsDay) && "text-gray-400 "} font-semibold ${
          isEqual(day, selectDay || 0) && "text-white"
        } ${
          isEqual(day, selectDay || 0) &&
          !isToday(day) &&
          "bg-gray-900 text-white shadow-md"
        }`}
      >
        <time dateTime={day.toString()}>{format(day, "d")}</time>
      </button>
    </div>
  );
}
