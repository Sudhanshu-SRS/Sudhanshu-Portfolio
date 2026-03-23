import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, KeyRound, Loader2, ArrowRight } from 'lucide-react';
import api from '../services/api';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters")
});

const otpSchema = z.object({
  otp: z.string().min(4, "OTP is required")
});

const AdminAuth = () => {
  const [step, setStep] = useState(1);
  const [emailCache, setEmailCache] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const { register: registerOtp, handleSubmit: handleOtpSubmit, formState: { errors: otpErrors } } = useForm({
    resolver: zodResolver(otpSchema)
  });

  const onLogin = async (data) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await api.post('/admin/login', data);
     if (res.data.success === true){
        setEmailCache(data.email);
        setStep(2);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

const onVerify = async (data) => {
  setIsLoading(true);
  setErrorMsg('');
  try {
    const res = await api.post('/admin/verify-otp', { email: emailCache, otp: data.otp });

    if (res.data.success || res.status === 200) {

     
      navigate('/dashboard');
    }
  } catch (err) {
    setErrorMsg(err.response?.data?.message || err.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-[#15151A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 flex flex-col items-center overflow-hidden"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-8 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] flex-shrink-0">
          <Lock className="text-white w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold text-center text-white tracking-wide mb-2 w-full">Admin Portal</h2>
        <p className="text-gray-400 text-center text-sm mb-6 w-full">
          {step === 1 ? 'Enter your credentials to securely access the dashboard.' : 'Enter the OTP sent to your email.'}
        </p>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium w-full break-words whitespace-pre-wrap max-h-32 overflow-y-auto">
            {typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg)}
          </div>
        )}

        <div className="w-full">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form 
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleLoginSubmit(onLogin)} 
                className="space-y-5"
              >
                <div className="w-full">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none z-10" />
                    <input 
                      {...registerLogin('email')}
                      type="email" 
                      placeholder="Admin Email"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-black/20 border border-white/5 text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all focus:bg-black/40 [&:-webkit-autofill]:[WebkitBoxShadow:0_0_0_30px_#15151A_inset] [&:-webkit-autofill]:[WebkitTextFillColor:white]"
                    />
                  </div>
                  {loginErrors.email && <p className="text-red-400 text-xs mt-2 ml-1">{loginErrors.email.message}</p>}
                </div>

                <div className="w-full">
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none z-10" />
                    <input 
                      {...registerLogin('password')}
                      type="password" 
                      placeholder="Password"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-black/20 border border-white/5 text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all focus:bg-black/40 [&:-webkit-autofill]:[WebkitBoxShadow:0_0_0_30px_#15151A_inset] [&:-webkit-autofill]:[WebkitTextFillColor:white]"
                    />
                  </div>
                  {loginErrors.password && <p className="text-red-400 text-xs mt-2 ml-1">{loginErrors.password.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Continue <ArrowRight className="w-5 h-5 ml-2" /></>}
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleOtpSubmit(onVerify)} 
                className="space-y-5"
              >
                <div className="w-full">
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10 pointer-events-none" />
                    <input 
                      {...registerOtp('otp')}
                      type="text" 
                      placeholder="Enter OTP"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-black/20 border border-white/5 text-white tracking-[0.5em] font-mono text-center placeholder:tracking-normal placeholder-gray-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all focus:bg-black/40"
                    />
                  </div>
                  {otpErrors.otp && <p className="text-red-400 text-xs mt-2 ml-1 text-center">{otpErrors.otp.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Verify & Access <ArrowRight className="w-5 h-5 ml-2" /></>}
                </button>
                
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Back to Login
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuth;