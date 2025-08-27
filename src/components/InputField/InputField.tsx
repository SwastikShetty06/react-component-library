/* InputField component
   - Purpose: Flexible input with variants, sizes, helper text, validation states, clear & password toggle.
   - Notes: 
     * Works controlled or uncontrolled (value vs defaultValue)
     * Accessible labels and aria-describedby for helper/error text
     * Internal showPassword state for passwordToggle
     * Comments added for readability and maintainability
   - Author: Swastik Shetty (polished for assignment)
*/

import React, { forwardRef, useId, useState, useEffect } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';
import type { BaseComponentProps, Size, Variant } from '@/types';
import { cn } from '@/lib/utils';

export interface InputFieldProps extends BaseComponentProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
  clearable?: boolean;
  passwordToggle?: boolean;
  type?: string;
  name?: string;
  theme?: 'light'|'dark'|'auto';
  leftIcon?: React.ReactNode;
  defaultValue?: string;
}

const sizeMap = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-sm',
  lg: 'px-4 py-3 text-base',
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  const {
    value: valueProp,
    defaultValue = '',
    onChange,
    onClear,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled = false,
    invalid = false,
    loading = false,
    variant = 'outlined',
    size = 'md',
    clearable = false,
    passwordToggle = false,
    type = 'text',
    id: providedId,
    'data-testid': testId,
    leftIcon,
    ...rest
  } = props;

  const generated = useId();
  const id = providedId || generated;

  // controlled if value prop is provided
  const isControlled = valueProp !== undefined;

  // internal state for uncontrolled usage
  const [internalValue, setInternalValue] = useState<string>(isControlled ? String(valueProp ?? '') : defaultValue);

  // keep internal in sync if valueProp becomes defined or changes when switching to controlled
  useEffect(() => {
    if (isControlled) {
      setInternalValue(String(valueProp ?? ''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp]);

  const value = isControlled ? (valueProp ?? '') : internalValue;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password' || passwordToggle;
  const inputType = isPassword && showPassword ? 'text' : type;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInternalValue(e.target.value);
    if (onChange) onChange(e);
  }

  function handleClear() {
    // clear internal value if uncontrolled
    if (!isControlled) {
      setInternalValue('');
    }
    // notify parent via onClear
    if (onClear) onClear();

    // also notify via onChange with a synthetic event (so parent forms/controllers know)
    if (onChange) {
      const synthetic = {
        target: { value: '' },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(synthetic);
    }
  }

  return (
    <div className={cn('w-full', props.className)}>
      {label && (
        <label htmlFor={id} className="label-sm">
          {label}
        </label>
      )}

      <div className={cn('relative flex items-center', invalid ? 'ring-0' : '')}>
        {leftIcon ? (
          <div className="absolute left-3 z-10 pointer-events-none text-gray-400">
            {leftIcon}
          </div>
        ) : null}

        <input
          id={id}
          ref={ref}
          role="textbox"
          data-testid={testId || id}
          aria-invalid={invalid || undefined}
          aria-describedby={errorMessage ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          type={inputType}
          className={cn(
            'input-field-base',
            sizeMap[size],
            leftIcon ? 'pl-10' : '',
            invalid ? 'border-red-400' : '',
            disabled ? 'opacity-60 cursor-not-allowed' : ''
          )}
          {...rest}
        />

        <div className="absolute right-3 flex items-center gap-2">
          {loading ? <Loader2 className="animate-spin" size={16} /> : null}
          {clearable && value && !disabled ? (
            <button aria-label="Clear input" onClick={handleClear} className="p-1 rounded hover:bg-gray-100" type="button">
              <X size={16} />
            </button>
          ) : null}
          {isPassword ? (
            <button
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((s) => !s)}
              className="p-1 rounded hover:bg-gray-100"
              type="button"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-1 text-sm">
        {errorMessage ? (
          <div id={`${id}-error`} data-testid="error-message" className="error-text">
            {errorMessage}
          </div>
        ) : helperText ? (
          <div id={`${id}-helper`} data-testid="helper-text" className="helper-text">
            {helperText}
          </div>
        ) : null}
      </div>
    </div>
  );
});

InputField.displayName = 'InputField';
export default InputField;
