import { useCallback, useEffect, useContext, useMemo } from "react";
import {
  CalendarIcon,
  ClockIcon,
  PhoneIcon,
  XIcon,
} from "@heroicons/react/outline";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";

import { useCalendar } from "../hooks/useCalendar";

import { tagContext } from "../contexts/TagContext";

import { typeTag } from "../contants/tag";

import { TextInput } from "./TextInput";

export function ModalAddEvent() {
  const { onDate, selectDay, clickAddMeet, onClickAddMeet } = useCalendar();
  const { tag, onSelectTypeTag } = useContext(tagContext);

  const isVisibleAddEvent = useMemo(() => {
    return selectDay && clickAddMeet && tag;
  }, [selectDay, clickAddMeet, tag]);

  const handlePressCloseGallery = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClickAddMeet(false);
        onSelectTypeTag("");
      }
    },
    [onClickAddMeet]
  );

  useEffect(() => {
    document.addEventListener("keydown", handlePressCloseGallery, false);

    return () => {
      document.removeEventListener("keydown", handlePressCloseGallery, false);
    };
  }, [handlePressCloseGallery]);

  return (
    <AnimatePresence>
      {isVisibleAddEvent && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, trantypeTagslateX: 500 }}
          animate={{ opacity: 1, translateX: 1 }}
          transition={{ duration: 0.15 }}
          exit={{ x: 300, translateX: 500 }}
          className={`w-96 2xl:w-[22vw] duration-300 z-50 absolute right-0 px-2 h-screen bg-white shadow-xl`}
        >
          <div className="w-full flex items-center px-3 my-4 border-b border-gray-200 pb-3">
            <div className="flex-1 flex items-center">
              <span
                className="text-md p-1 rounded-md font-semibold uppercase"
                style={{
                  background: typeTag[tag].color,
                  color: typeTag[tag].textColor,
                }}
              >
                {typeTag[tag].text}
              </span>
            </div>
            <button
              onClick={() => {
                onDate(null);
                onClickAddMeet(false);
                onSelectTypeTag("");
              }}
              className="flex justify-end"
            >
              <XIcon className="h-6 w-6 text-gray-900" />
            </button>
          </div>

          <div className="px-4">
            <div className="flex-1">
              <TextInput
                name="name_meet"
                value=""
                label="Assunto da reunião"
                leftIcon={<PhoneIcon className="h-4 w-4 text-gray-900" />}
              />

              <TextInput
                name="name_meet"
                value={format(selectDay, "dd/MM/yyyy")}
                type="text"
                disabled
                label="Data da reunião"
                leftIcon={<CalendarIcon className="h-4 w-4 text-gray-900" />}
              />

              <div className="flex w-full items-center justify-between space-x-10">
                <TextInput
                  name="name_meet"
                  defaultValue={format(new Date(), "KK:mm")}
                  type="time"
                  label="Inicio da reunião"
                  leftIcon={<ClockIcon className="h-4 w-4 text-gray-900" />}
                />

                <TextInput
                  name="name_meet"
                  type="time"
                  value=""
                  label="Fim da reunião"
                  leftIcon={<ClockIcon className="h-4 w-4 text-gray-900" />}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
