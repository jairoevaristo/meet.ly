import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { useCalendar } from "../hooks/useCalendar"

export const Meet = () => {
  const { selectDay } = useCalendar();

  return (
    <div className="pl-10">
      <div className='flex items-center space-x-4'>
        <h1 className="font-semibold">Agendado para {format(selectDay, 'MMMM dd, yyyy', { locale: ptBr })}</h1>
        <button className='px-4 py-2 bg-gray-900 rounded text-white shadow-lg'>
          Nova reunião
        </button>
      </div>

      <div className='flex items-center mt-6'>
        <img src='https://github.com/jairoevaristo.png' className='w-12 h-12 rounded-full mr-3' />
        <div className='flex flex-col'>
          <span className='text-gray-800 font-medium'>
            Jairo Evaristo
          </span>
          <div className='flex items-center space-x-1 uppercase text-sm text-gray-500'>
            <span>1:00 am</span>
            <span>-</span>
            <span>2:00 am</span>
          </div>
        </div>
      </div>
    </div>
  )
}