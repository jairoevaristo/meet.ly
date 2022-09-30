import { Dialog, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react';
import { Fragment } from 'react'

type Modal = {
  isOpen: boolean;
  closeModal: () => void;
  onSuccess: () => void;
}

export default function Modal({ isOpen, closeModal, onSuccess }: Modal) {

  return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h2"
                    className="text-xl font-medium leading-6 text-gray-900 text-center"
                  >
                    Você já vai 😥?
                  </Dialog.Title>
                  <div className="mt-5">
                    <p className="text-md text-gray-500 font-medium text-center">
                      Desejar realmentar sair de sua conta?
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-center">
                  <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Não, quero continuar.
                    </button>

                    <button
                      type="button"
                      className="inline-flex ml-4 justify-center rounded-md border-transparent ring-1 px-4 py-2 text-sm font-medium ring-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onSuccess}
                    >
                      Sim, desejo sair
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}