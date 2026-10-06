'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motionTransitions } from '../../lib/motion-tokens';
import { Button } from './Button';
import { Form, FormItem, FormLabel, FormControl, FormMessage, Input, Checkbox } from './Form';

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  agreeToTerms: boolean;
}

export interface SignUpProps {
  /** Card header title */
  title?: string;
  /** Card header description / subtitle */
  description?: string;
  /** Custom logo or icon displayed above title */
  logo?: React.ReactNode;
  /** Server error message */
  error?: string | null;
  /** Submission loading state */
  isLoading?: boolean;
  /** Form submission callback */
  onSubmit?: (data: SignUpFormData) => void | Promise<void>;
  /** Callback when "Sign in" redirect link is clicked */
  onSignInClick?: () => void;
  /** Show social sign-up SSO buttons */
  showSocialSignUp?: boolean;
  /** Callback when social login provider is clicked */
  onSocialSignUp?: (provider: 'github' | 'google') => void;
  /** Require password confirmation field */
  requireConfirmPassword?: boolean;
  /** Custom terms of service link URL or text */
  termsText?: React.ReactNode;
  /** Custom text for switch to sign in */
  signInText?: string;
  /** Additional container styling */
  className?: string;
}

export const SignUp: React.FC<SignUpProps> = ({
  title = 'Create an account',
  description = 'Join EasyUI to access components and templates',
  logo = (
    <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#1F1F1F] flex items-center justify-center text-[#FAFAFA] shadow-xs">
      <Sparkles className="w-5 h-5 text-[#FAFAFA]" />
    </div>
  ),
  error,
  isLoading = false,
  onSubmit,
  onSignInClick,
  showSocialSignUp = true,
  onSocialSignUp,
  requireConfirmPassword = true,
  termsText = (
    <span>
      I agree to the{' '}
      <a href="#terms" className="text-[#FAFAFA] underline underline-offset-2 hover:text-white">
        Terms of Service
      </a>{' '}
      and{' '}
      <a href="#privacy" className="text-[#FAFAFA] underline underline-offset-2 hover:text-white">
        Privacy Policy
      </a>
    </span>
  ),
  signInText = 'Already have an account? Sign in',
  className,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // 0 to 4
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (requireConfirmPassword) {
      if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (confirmPassword !== password) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    if (!agreeToTerms) {
      errors.terms = 'You must accept the terms and conditions';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (onSubmit) {
      onSubmit({ name, email, password, confirmPassword, agreeToTerms });
    }
  };

  return (
    <div
      className={cn(
        'w-full max-w-md mx-auto rounded-2xl border border-[#1F1F1F] bg-[#0E0E0E] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden transition-all duration-300',
        className
      )}
    >
      {/* Top subtle atmospheric glow */}
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

      {/* Social Sign Up Options */}
      {showSocialSignUp && (
        <div className="space-y-3 mb-5">
          <div className="grid grid-cols-2 gap-2.5">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onSocialSignUp?.('github')}
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
              onClick={() => onSocialSignUp?.('google')}
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
              Or sign up with email
            </span>
          </div>
        </div>
      )}

      {/* Main Sign-Up Form */}
      <Form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Full Name */}
        <FormItem>
          <FormLabel required>Full Name</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Jane Doe"
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (validationErrors.name) {
                  setValidationErrors((prev) => ({ ...prev, name: undefined }));
                }
              }}
              leftIcon={<User className="w-3.5 h-3.5" />}
              error={!!validationErrors.name}
            />
          </FormControl>
          <FormMessage error={validationErrors.name} />
        </FormItem>

        {/* Email Address */}
        <FormItem>
          <FormLabel required>Email Address</FormLabel>
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

        {/* Password */}
        <FormItem>
          <FormLabel required>Password</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
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

          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <div className="pt-1.5 space-y-1">
              <div className="flex gap-1 h-1">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={cn(
                      'flex-1 rounded-full transition-colors duration-200',
                      strength >= step
                        ? step === 1
                          ? 'bg-[#FF7A7A]'
                          : step === 2
                          ? 'bg-[#F59E0B]'
                          : step === 3
                          ? 'bg-[#38BDF8]'
                          : 'bg-[#6EE7B7]'
                        : 'bg-[#1F1F1F]'
                    )}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#6B6B6B]">
                <span>Strength</span>
                <span className="text-[#A1A1A1]">{strengthLabels[strength - 1] || 'Weak'}</span>
              </div>
            </div>
          )}
          <FormMessage error={validationErrors.password} />
        </FormItem>

        {/* Confirm Password */}
        {requireConfirmPassword && (
          <FormItem>
            <FormLabel required>Confirm Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Re-enter your password"
                autoComplete="new-password"
                showPasswordToggle
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (validationErrors.confirmPassword) {
                    setValidationErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }
                }}
                leftIcon={<Lock className="w-3.5 h-3.5" />}
                error={!!validationErrors.confirmPassword}
              />
            </FormControl>
            <FormMessage error={validationErrors.confirmPassword} />
          </FormItem>
        )}

        {/* Terms Agreement Checkbox */}
        <div className="pt-1">
          <Checkbox
            label={termsText}
            checked={agreeToTerms}
            onChange={(e) => {
              setAgreeToTerms(e.target.checked);
              if (validationErrors.terms) {
                setValidationErrors((prev) => ({ ...prev, terms: undefined }));
              }
            }}
          />
          <FormMessage error={validationErrors.terms} />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          isLoading={isLoading}
          loadingText="Creating account..."
          rightIcon={!isLoading ? <ArrowRight className="w-4 h-4" /> : undefined}
          className="mt-3"
        >
          Create Account
        </Button>
      </Form>

      {/* Secondary Action */}
      {onSignInClick && (
        <div className="mt-6 text-center pt-4 border-t border-[#1F1F1F]">
          <button
            type="button"
            onClick={onSignInClick}
            className="text-xs text-[#A1A1A1] hover:text-[#FAFAFA] transition-colors focus-ring rounded cursor-pointer"
          >
            {signInText}
          </button>
        </div>
      )}
    </div>
  );
};
