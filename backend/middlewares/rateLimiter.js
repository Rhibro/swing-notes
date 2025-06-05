import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests, please try again later.',
  handler: (req, res) => {
    console.warn(
      `[RATE LIMIT] ${req.ip} exceeded the limit of 100 requests in 10 minutes.`
    );
    res.status(429).send('Too many requests, please try again later.');
  },
});

export default limiter;
