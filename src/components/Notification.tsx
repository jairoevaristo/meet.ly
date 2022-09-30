import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { BellIcon, XIcon } from "@heroicons/react/outline";

export function Notification() {
  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            className={`text-opacity-90 group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none`}
          >
            <BellIcon className="text-white h-6 w-6 ml-1 cursor-pointer" />
            <div className="absolute top-[-2px] right-0 bg-red-600 h-5 w-5 rounded-full text-center text-sm">
              <span className="text-white font-semibold">
                3
              </span>
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute -right-36 2xl:-right-44 py-4 z-10 max-h-xl h-[72vh] 2xl:h-[70vh] overflow-auto w-screen max-w-xs 2xl:max-w-sm -translate-x-1/2 transform px-4 overflow-x-hidden bg-white rounded-sm shadow-md">
            {({ close }) => (
              <div className="flex items-center justify-center border-b pb-2">
                <span className="font-semibold text-md text-gray-600 flex-1 text-center">Reuniões que iniciaram em 30min.</span>
                <button
                  onClick={() => close()}
                >
                  <XIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
                </button>
              </div>
            )}
                
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}