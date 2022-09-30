import { forwardRef, HtmlHTMLAttributes, ReactNode, useRef, useState } from "react";

export type TextInputProps = HtmlHTMLAttributes<HTMLInputElement> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  type?: string;
  name: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  error?: string;
  defaultValue?: string | number | readonly string[];
  onClickRightIcon?: () => void;
  onClickLeftIcon?: () => void;
}

export const TextInput: React.ForwardRefExoticComponent<TextInputProps> = forwardRef(({ defaultValue, name, value, error, type = 'text', leftIcon, rightIcon, onClickLeftIcon, onClickRightIcon, label, disabled, ...rest }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  function handleInputFocus() {
    if (type === 'time' || type === 'date') {
      inputRef.current.showPicker();  
    }

    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  return (
    <div className="flex flex-col justify-start w-full">
      {label && <label className="font-medium text-gray-500 text-lg mt-8">{label}</label>}
      <div onBlur={handleInputBlur} className={`w-full flex border-b border-gray-400 items-center ${!error && isFocused && 'border-gray-700'} ${error && 'border-2 border-red-600'} transition duration-200 ease-in-out`}>
        <div className="" onClick={onClickLeftIcon}>
          {leftIcon}
        </div>
        <input 
          type={type || 'text'}
          ref={inputRef}
          autoComplete={null}
          name={name}
          disabled={disabled}
          onFocus={handleInputFocus}
          className="block py-2 px-2 w-full text-gray-900 bg-transparent appearance-none peer outline-none" 
          required
          value={value}
          defaultValue={defaultValue}
          {...rest}
        />
        <div className="cursor-pointer" onClick={onClickRightIcon}>
          {rightIcon}
        </div>
      </div>

    </div>
  )
})