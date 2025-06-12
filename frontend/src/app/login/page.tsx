"use client"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setAuthError('');

    // Mock authentication logic
    if (data.email === 'user@example.com' && data.password === 'password123') {
      router.push('/dashboard'); // Redirect to dashboard or homepage
    } else {
      setAuthError('Invalid email or password');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
        
        {authError && (
          <div className="text-red-500 text-sm mb-4 text-center">{authError}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}
