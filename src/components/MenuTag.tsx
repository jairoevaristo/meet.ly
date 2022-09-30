import { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/outline";

import { tagContext } from "../contexts/TagContext";

export function MenuTag() {
  const { onSelectTypeTag } = useContext(tagContext);

  return (
    <div className="shadow-lg">
      <Menu as="div" className="">
        <Menu.Button className="h-6 w-6 flex items-center justify-center">
          <PlusIcon className="h-4 w-4 text-gray-900" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-2 w-full items-center justify-center">
              <span className="text-center font-semibold">Adicionar tag</span>
            </div>
            <div className="p-2">
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => onSelectTypeTag("reminder")}
                      className={`${
                        active ? "bg-gray-900 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <span>Lembrete</span>
                    </button>
                  )}
                </Menu.Item>
              </div>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onSelectTypeTag("meet")}
                    className={`${
                      active ? "bg-gray-900 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <span>Reunião</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onSelectTypeTag("task")}
                    className={`${
                      active ? "bg-gray-900 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <span>Tarefa</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
