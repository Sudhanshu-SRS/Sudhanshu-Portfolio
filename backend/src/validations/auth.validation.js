const { z } = require('zod');

const login = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(5, 'Password must be at least 5 characters')
  })
});

const verifyOtp = z.object({
  body: z.object({
    email: z.string().email(),
    otp: z.string() // length could vary depending on the generator, assuming minimum 4
  })
});

const forgetPassword = z.object({
  body: z.object({
    email: z.string().email()
  })
});

const resetPassword = z.object({
  body: z.object({
    email: z.string().email(),
    otp: z.string(),
    newPassword: z.string().min(5)
  })
});

module.exports = {
  login,
  verifyOtp,
  forgetPassword,
  resetPassword
};
