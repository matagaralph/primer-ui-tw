'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button, Checkbox, FormControl, TextInput } from '@primer/react';

export default function AuthForm() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: '' });

    const res = await signIn('credentials', {
      email: user.email.toLowerCase(),
      password: user.password,
      redirect: false,
      callbackUrl: searchParams?.get('from') || '/',
    });

    setStatus({
      loading: false,
      error: res?.ok ? '' : res?.error || 'Login failed',
    });

    if (res?.ok) {
      router.replace(searchParams?.get('from') || '/');
    }
  };

  return (
    <form className='tw:flex tw:flex-col tw:gap-6' onSubmit={handleSubmit}>
      <div className='tw:grid tw:gap-6'>
        <div className='tw:grid tw:gap-2'>
          <FormControl required>
            <FormControl.Label>Email address</FormControl.Label>
            <TextInput
              block
              type='email'
              tabIndex={1}
              autoComplete='email'
              placeholder='someone@example.com'
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              validationStatus={status.error ? 'error' : undefined}
            />
          </FormControl>
        </div>
        <div className='tw:grid tw:gap-2'>
          <FormControl required>
            <FormControl.Label>Password</FormControl.Label>
            <TextInput
              block
              type='password'
              tabIndex={2}
              autoComplete='current-password'
              placeholder='Password'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              validationStatus={status.error ? 'error' : undefined}
            />
          </FormControl>
        </div>
        {status.error && (
          <div className='tw:mt-[-16px] tw:text-sm tw:text-red-600'>
            {status.error}
          </div>
        )}
        <div className='tw:flex tw:items-center tw:space-x-3'>
          <FormControl>
            <Checkbox value='default' tabIndex={3} />
            <FormControl.Label>Remember me</FormControl.Label>
          </FormControl>
        </div>
        <Button variant='primary' type='submit' disabled={status.loading}>
          {status.loading ? 'Signing in...' : 'Continue with email'}
        </Button>
      </div>
    </form>
  );
}
