'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';
import { Button } from './Button';
import { Form, FormItem, FormLabel, FormControl, FormMessage, Input, Checkbox } from './Form';

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginProps {
  /** Card header title */
  title?: string;
  /** Card header description / subtitle */
  description?: string;
  /** Custom logo or icon displayed above title */
  logo?: React.ReactNode;
  /** Error message displayed at top of card */
  error?: string | null;
  /** Submission loading state */
  isLoading?: boolean;
  /** Form submission callback */
  onSubmit?: (data: LoginFormData) => void | Promise<void>;
  /** Callback when "Forgot password?" is clicked */
  onForgotPassword?: () => void;
  /** Callback when secondary "Sign up" action is clicked */
  onSignUpClick?: () => void;
  /** Show social login SSO buttons (GitHub, Google, Apple) */
  showSocialLogins?: boolean;
  /** Callback when a social login provider is clicked */
  onSocialLogin?: (provider: 'github' | 'google' | 'apple') => void;
  /** Custom text for sign up link */
  signUpText?: string;
  /** Additional container styling */
  className?: string;
}

export const Login: React.FC<LoginProps> = ({
  title = 'Welcome back',
  description = 'Sign in to access your EasyUI workspace',
  logo = (
    <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#1F1F1F] flex items-center justify-center text-[#FAFAFA] shadow-xs">
      <Sparkles className="w-5 h-5 text-[#FAFAFA]" />
    </div>
  ),
  error,
  isLoading = false,
  onSubmit,
  onForgotPassword,
  onSignUpClick,
  showSocialLogins = true,
  onSocialLogin,
  signUpText = "Don't have an account? Sign up",
  className,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (onSubmit) {
      onSubmit({ email, password, rememberMe });
    }
  };

  return (
    <div
      className={cn(
        'w-full max-w-md mx-auto rounded-2xl border border-[#1F1F1F] bg-[#0E0E0E] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden transition-all duration-300',
        className
      )}
    >
      {/* Subtle top atmospheric glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-white/5 to-transparent blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6 relative z-10">
        {logo && <div className="mb-3.5">{logo}</div>}
        <h2 className="text-xl sm:text-2xl font-semibold text-[#FAFAFA] tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-[#A1A1A1] mt-1.5 leading-relaxed max-w-xs">
            {description}
          </p>
        )}
      </div>

      {/* Top Error Alert Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={motionTransitions.springSnappy}
            className="mb-5 overflow-hidden"
          >
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Login Options */}
      {showSocialLogins && (
        <div className="space-y-3 mb-5">
          <div className="grid grid-cols-2 gap-2.5">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onSocialLogin?.('github')}
              className="w-full text-xs font-normal"
              leftIcon={
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              }
            >
              GitHub
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onSocialLogin?.('google')}
              className="w-full text-xs font-normal"
              leftIcon={
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                </svg>
              }
            >
              Google
            </Button>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-[#1F1F1F] w-full" />
            <span className="bg-[#0E0E0E] px-3 text-[10px] uppercase font-mono tracking-widest text-[#6B6B6B] absolute">
              Or continue with
            </span>
          </div>
        </div>
      )}

      {/* Main Login Form */}
      <Form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <FormItem>
          <FormLabel required>Email</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="name@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (validationErrors.email) {
                  setValidationErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              leftIcon={<Mail className="w-3.5 h-3.5" />}
              error={!!validationErrors.email}
            />
          </FormControl>
          <FormMessage error={validationErrors.email} />
        </FormItem>

        {/* Password Field */}
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel required>Password</FormLabel>
            {onForgotPassword && (
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-[11px] text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors focus-ring rounded cursor-pointer"
              >
                Forgot password?
              </button>
            )}
          </div>
          <FormControl>
            <Input
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              showPasswordToggle
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (validationErrors.password) {
                  setValidationErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
              leftIcon={<Lock className="w-3.5 h-3.5" />}
              error={!!validationErrors.password}
            />
          </FormControl>
          <FormMessage error={validationErrors.password} />
        </FormItem>

        {/* Remember Me */}
        <div className="pt-1">
          <Checkbox
            label="Remember this device"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          isLoading={isLoading}
          loadingText="Authenticating..."
          rightIcon={!isLoading ? <ArrowRight className="w-4 h-4" /> : undefined}
          className="mt-2"
        >
          Sign In
        </Button>
      </Form>

      {/* Secondary Action */}
      {onSignUpClick && (
        <div className="mt-6 text-center pt-4 border-t border-[#1F1F1F]">
          <button
            type="button"
            onClick={onSignUpClick}
            className="text-xs text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors focus-ring rounded cursor-pointer"
          >
            {signUpText}
          </button>
        </div>
      )}
    </div>
  );
};
