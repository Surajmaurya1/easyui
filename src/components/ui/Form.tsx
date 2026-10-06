'use client';

import React, { forwardRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';

/* ==========================================================================
   1. Form Root & Layout Items
   ========================================================================== */

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, onSubmit, ...props }, ref) => (
    <form
      ref={ref}
      onSubmit={onSubmit}
      className={cn('space-y-4 w-full', className)}
      noValidate
      {...props}
    />
  )
);
Form.displayName = 'Form';

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string;
}

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-1.5 w-full', className)} {...props} />
  )
);
FormItem.displayName = 'FormItem';

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'block text-xs font-medium text-[#FAFAFA] select-none tracking-tight',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-[#FF7A7A] ml-1" aria-hidden="true">*</span>}
    </label>
  )
);
FormLabel.displayName = 'FormLabel';

export const FormControl = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('relative', className)} {...props} />
  )
);
FormControl.displayName = 'FormControl';

export const FormDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-[11px] text-[#6B6B6B] leading-relaxed', className)}
      {...props}
    />
  )
);
FormDescription.displayName = 'FormDescription';

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: string | null;
}

export const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, error, children, ...props }, ref) => {
    const message = error || children;
    return (
      <AnimatePresence>
        {message ? (
          <motion.div
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={motionTransitions.springSnappy}
            className="overflow-hidden"
          >
            <p
              ref={ref}
              role="alert"
              className={cn(
                'text-[11px] text-[#FF7A7A] flex items-center gap-1.5 pt-0.5 font-medium',
                className
              )}
              {...props}
            >
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{message}</span>
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    );
  }
);
FormMessage.displayName = 'FormMessage';

/* ==========================================================================
   2. Input Component
   ========================================================================== */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional icon rendered at the start of input */
  leftIcon?: React.ReactNode;
  /** Optional icon rendered at the end of input */
  rightIcon?: React.ReactNode;
  /** Pass an error message or boolean to trigger danger styling */
  error?: string | boolean;
  /** For type="password", automatically provide a show/hide toggle icon */
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      leftIcon,
      rightIcon,
      error,
      showPasswordToggle = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password';
    const computedType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="relative w-full flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-[#525252] pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          type={computedType}
          disabled={disabled}
          className={cn(
            'w-full h-10 px-3.5 text-xs text-[#FAFAFA] placeholder:text-[#6B6B6B] bg-[#141414] rounded-lg border transition-all duration-150',
            'border-[#1F1F1F] hover:border-[#4A4A4A]',
            'focus:bg-[#141414] focus:border-[#4A4A4A] focus:outline-none focus-ring',
            leftIcon && 'pl-9',
            (rightIcon || (isPassword && showPasswordToggle)) && 'pr-9',
            error && 'border-rose-500/50 focus:border-rose-500',
            disabled && 'opacity-30 cursor-not-allowed bg-[#0E0E0E]',
            className
          )}
          {...props}
        />

        {isPassword && showPasswordToggle ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 text-[#525252] hover:text-[#FAFAFA] transition-colors focus-ring rounded cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
          </button>
        ) : (
          rightIcon && (
            <div className="absolute right-3 text-[#525252] pointer-events-none flex items-center justify-center">
              {rightIcon}
            </div>
          )
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

/* ==========================================================================
   3. Textarea Component
   ========================================================================== */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          'w-full min-h-[90px] p-3 text-xs text-[#FAFAFA] placeholder:text-[#6B6B6B] bg-[#141414] rounded-lg border transition-all duration-150 resize-y',
          'border-[#1F1F1F] hover:border-[#4A4A4A]',
          'focus:bg-[#141414] focus:border-[#4A4A4A] focus:outline-none focus-ring leading-relaxed',
          error && 'border-rose-500/50 focus:border-rose-500',
          disabled && 'opacity-30 cursor-not-allowed bg-[#0E0E0E]',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

/* ==========================================================================
   4. Select Component
   ========================================================================== */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  error?: string | boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options = [], children, error, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full flex items-center">
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full h-10 pl-3.5 pr-8 text-xs text-[#FAFAFA] bg-[#141414] rounded-lg border appearance-none transition-all duration-150 cursor-pointer',
            'border-[#1F1F1F] hover:border-[#4A4A4A]',
            'focus:bg-[#141414] focus:border-[#4A4A4A] focus:outline-none focus-ring',
            error && 'border-rose-500/50 focus:border-rose-500',
            disabled && 'opacity-30 cursor-not-allowed bg-[#0E0E0E]',
            className
          )}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className="bg-[#141414] text-[#FAFAFA]"
                >
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="absolute right-3 text-[#525252] pointer-events-none flex items-center justify-center">
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  }
);
Select.displayName = 'Select';

/* ==========================================================================
   5. Checkbox Component
   ========================================================================== */

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, checked, defaultChecked, disabled, id, onChange, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [isChecked, setIsChecked] = React.useState(defaultChecked || false);

    const isControlled = checked !== undefined;
    const currentChecked = isControlled ? checked : isChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setIsChecked(e.target.checked);
      }
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={cn('flex items-start gap-2.5 select-none', disabled && 'opacity-30 cursor-not-allowed', className)}>
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            checked={currentChecked}
            disabled={disabled}
            onChange={handleChange}
            className="peer sr-only"
            {...props}
          />
          <div
            onClick={(e) => {
              if (!disabled) {
                const input = document.getElementById(inputId) as HTMLInputElement;
                if (input) input.click();
              }
              e.preventDefault();
            }}
            className={cn(
              'w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all duration-150 cursor-pointer focus-ring',
              currentChecked
                ? 'bg-[#FAFAFA] border-[#FAFAFA] text-[#050505]'
                : 'bg-[#141414] border-[#1F1F1F] hover:border-[#4A4A4A]',
              disabled && 'cursor-not-allowed'
            )}
          >
            {currentChecked && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={motionTransitions.springSnappy}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </motion.div>
            )}
          </div>
        </div>

        {(label || description) && (
          <label htmlFor={inputId} className="cursor-pointer text-left">
            {label && (
              <div className="text-xs font-medium text-[#FAFAFA] leading-tight">
                {label}
              </div>
            )}
            {description && (
              <div className="text-[11px] text-[#6B6B6B] mt-0.5 leading-relaxed">
                {description}
              </div>
            )}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

/* ==========================================================================
   6. RadioGroup & RadioGroupItem
   ========================================================================== */

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  options?: RadioOption[];
  onChange?: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  defaultValue,
  options = [],
  onChange,
  className,
  children,
}) => {
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || '');
  const isControlled = value !== undefined;
  const current = isControlled ? value : selectedValue;

  const handleSelect = (val: string) => {
    if (!isControlled) {
      setSelectedValue(val);
    }
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div role="radiogroup" className={cn('space-y-2', className)}>
      {options.length > 0
        ? options.map((opt) => (
            <RadioGroupItem
              key={opt.value}
              name={name}
              value={opt.value}
              checked={current === opt.value}
              disabled={opt.disabled}
              onChange={() => handleSelect(opt.value)}
              label={opt.label}
              description={opt.description}
            />
          ))
        : children}
    </div>
  );
};

export interface RadioGroupItemProps {
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  label?: React.ReactNode;
  description?: string;
  className?: string;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  name,
  value,
  checked = false,
  disabled = false,
  onChange,
  label,
  description,
  className,
}) => {
  const id = useId();

  return (
    <div className={cn('flex items-start gap-2.5 select-none', disabled && 'opacity-30 cursor-not-allowed', className)}>
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="peer sr-only"
        />
        <div
          onClick={() => {
            if (!disabled && onChange) onChange();
          }}
          className={cn(
            'w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-150 cursor-pointer focus-ring',
            checked
              ? 'border-[#FAFAFA] bg-[#141414]'
              : 'border-[#1F1F1F] bg-[#141414] hover:border-[#4A4A4A]',
            disabled && 'cursor-not-allowed'
          )}
        >
          {checked && (
            <motion.div
              layoutId={`radio-dot-${name}`}
              className="w-2 h-2 rounded-full bg-[#FAFAFA]"
              transition={motionTransitions.springSnappy}
            />
          )}
        </div>
      </div>

      {(label || description) && (
        <label htmlFor={id} className="cursor-pointer text-left">
          {label && (
            <div className="text-xs font-medium text-[#FAFAFA] leading-tight">
              {label}
            </div>
          )}
          {description && (
            <div className="text-[11px] text-[#6B6B6B] mt-0.5 leading-relaxed">
              {description}
            </div>
          )}
        </label>
      )}
    </div>
  );
};

/* ==========================================================================
   7. Switch / Toggle Component
   ========================================================================== */

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: string;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  label,
  description,
  className,
}) => {
  const [isOn, setIsOn] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const current = isControlled ? checked : isOn;

  const handleToggle = () => {
    if (disabled) return;
    const next = !current;
    if (!isControlled) {
      setIsOn(next);
    }
    if (onChange) {
      onChange(next);
    }
  };

  return (
    <div className={cn('flex items-center justify-between gap-4 select-none', disabled && 'opacity-30 cursor-not-allowed', className)}>
      {(label || description) && (
        <div className="text-left cursor-pointer" onClick={handleToggle}>
          {label && (
            <div className="text-xs font-medium text-[#FAFAFA] leading-tight">
              {label}
            </div>
          )}
          {description && (
            <div className="text-[11px] text-[#6B6B6B] mt-0.5 leading-relaxed">
              {description}
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={current}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border transition-colors duration-200 focus-ring',
          current
            ? 'bg-[#FAFAFA] border-[#FAFAFA]'
            : 'bg-[#141414] border-[#1F1F1F]',
          disabled && 'cursor-not-allowed'
        )}
      >
        <motion.span
          animate={{ x: current ? 16 : 2 }}
          transition={motionTransitions.springSnappy}
          className={cn(
            'pointer-events-none block h-3.5 w-3.5 my-auto top-0 bottom-0 rounded-full shadow-xs',
            current ? 'bg-[#050505]' : 'bg-[#6B6B6B]'
          )}
        />
      </button>
    </div>
  );
};
