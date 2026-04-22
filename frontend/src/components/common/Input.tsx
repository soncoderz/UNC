"use client";

import {
  forwardRef,
  type ChangeEventHandler,
  type ForwardedRef,
  type HTMLInputTypeAttribute,
} from "react";

interface InputProps {
  label?: string;
  error?: string;
  type?: HTMLInputTypeAttribute | "textarea";
  className?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

/**
 * Input component - Styled form input
 */
const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(function Input(
  { label, error, type = "text", className = "", ...props }: InputProps,
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark mb-1.5">
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          ref={ref as ForwardedRef<HTMLTextAreaElement>}
          className={`w-full px-4 py-3 rounded-xl border border-gray-light bg-white text-dark placeholder:text-gray/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-y min-h-[120px] ${
            error ? "border-danger focus:ring-danger/30 focus:border-danger" : ""
          } ${className}`}
          {...props}
        />
      ) : (
        <input
          ref={ref as ForwardedRef<HTMLInputElement>}
          type={type}
          className={`w-full px-4 py-3 rounded-xl border border-gray-light bg-white text-dark placeholder:text-gray/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 ${
            error ? "border-danger focus:ring-danger/30 focus:border-danger" : ""
          } ${className}`}
          {...props}
        />
      )}
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
});

export default Input;
