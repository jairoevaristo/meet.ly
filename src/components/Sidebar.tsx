import { useCallback, useContext, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { CalendarIcon, CheckCircleIcon, ChevronDoubleLeftIcon } from "@heroicons/react/outline";
import { Power } from "phosphor-react";
import Modal from "./Modal";
import { AuthContext } from "../contexts/authContext";

export function Sidebar() {
  const [test, setTest] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();
  const { isAuthenticated, handleLogout } = useContext(AuthContext);

  const onLogout = useCallback(() => {
    if (!session && isAuthenticated) {
      handleLogout()
    } else {
      signOut()
    }
  }, [handleLogout, session, isAuthenticated]);

  return (
    <>
      <div className={`${test ? 'w-16' : 'w-60 xl:w-56'} px-2 h-screen bg-black border-t border-t-gray-700 duration-200`}>
        <div className={`flex items-center w-full ${!test ? 'justify-end' : 'justify-center'}`}>
          <div
            onClick={() => setTest(!test)}
            className="flex items-center justify-center cursor-pointer mt-2 p-2 h-10 w-10 rounded bg-neutral-900"
          >
            <ChevronDoubleLeftIcon className={`text-white h-6 w-6 ${test && 'rotate-180'} duration-500`} />
          </div>
        </div>

        <ul className="mt-8">
          <li
            className={`text-white text-md flex items-center gap-x-1 mb-5 cursor-pointer p-2 hover:bg-green-500 rounded transition-colors ${test && 'justify-center'}`}
          >
            <span className="text-2xl block float-left">
              <CalendarIcon className="text-white h-6 w-6 duration-300 flex-1 text-center" />
            </span>
              <span className={`${test && 'hidden'} whitespace-pre duration-500 text-white text-md font-semibold ml-2`}>Reuniões de hoje</span>
          </li>
          <li
            className={`text-white text-md flex items-center gap-x-1 cursor-pointer p-2 hover:bg-green-500 rounded transition-colors ${test && 'justify-center'}`}
          >
            <span className="text-2xl block float-left">
              <CheckCircleIcon className="text-white h-6 w-6 duration-300 flex-1 text-center" />
            </span>
            <span className={`${test && 'hidden'} whitespace-pre duration-500 text-white text-md font-semibold ml-2`}>Reuniões concluídas</span>
          </li>
        </ul>

        <div className="absolute bottom-6">          
          <button 
            onClick={() => setIsOpen(true)}
            className="py-2 px-3 text-white font-semibold rounded flex items-center hover:bg-red-600 transition-colors"
          >
            <span className="text-2xl block float-left">
              <Power className="text-white h-6 w-6" />
            </span>
            <span className={`${test && 'hidden'} duration-500 whitespace-pre text-b text-md font-semibold ml-2`}>
              Logout
            </span>
          </button>
        </div>
      </div>
      <Modal 
        closeModal={() => setIsOpen(false)} 
        isOpen={isOpen} 
        onSuccess={onLogout} 
      />
    </>
  )
}