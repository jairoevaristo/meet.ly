import { useContext } from "react"
import { contextCalendar } from "../contexts/calendarContext"

export const useCalendar = () => {
  return useContext(contextCalendar);
}