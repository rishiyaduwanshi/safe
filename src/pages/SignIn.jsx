import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES, MOD_ROUTES, ROUTES } from '../constants/routes.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signin, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.DASHBOARD);
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    await signin(data);
  };

  return (
    <div className="flex items-center justify-center px-4 py-12 min-h-[calc(100vh-180px)]">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Global Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                <p className="font-medium">{error.message}</p>
                {error.errors?.length > 0 && (
                  <ul className="mt-1 list-disc list-inside space-y-0.5">
                    {error.errors.map((e, i) => (
                      <li key={i}>{e.field ? `${e.field}: ${e.message}` : e.message}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor='email'>
                Email
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                placeholder="your@email.com"
                disabled={isLoading}
                name='email'
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    },
                    validate: {
                      hasUppercase: v => /[A-Z]/.test(v) || 'Must contain at least one uppercase letter',
                      hasNumber: v => /[0-9]/.test(v) || 'Must contain at least one number',
                      hasSpecial: v => /[^A-Za-z0-9]/.test(v) || 'Must contain at least one special character',
                    }
                  })}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 pr-11 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link to={ROUTES.REGISTER} className="text-purple-400 hover:text-purple-300 font-medium transition">
              Sign up
            </Link>
          </p>

          <div className="mt-5 pt-5 border-t border-white/10">
            <p className="text-center text-gray-400 text-xs uppercase tracking-wide mb-3">Staff Portals</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Link
                to={MOD_ROUTES.LOGIN}
                className="text-center px-4 py-2.5 bg-white/6 border border-white/12 rounded-lg text-sm font-medium text-slate-200 no-underline hover:bg-white/10 transition-colors"
              >
                Moderator Login
              </Link>
              <Link
                to={ADMIN_ROUTES.LOGIN}
                className="text-center px-4 py-2.5 bg-cyan-500/12 border border-cyan-500/25 rounded-lg text-sm font-semibold text-cyan-100 no-underline hover:bg-cyan-500/18 transition-colors"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;