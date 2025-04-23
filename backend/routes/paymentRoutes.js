import express from 'express';
import Stripe from 'stripe';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { Job } from '../models/job.model.js';
// import { Application } from '../models/application.model.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { job } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: job.title,
              description: job.description,
            },
            unit_amount: job.price * 100, // Stripe expects amount in paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/payment-success?jobId=${job._id}`,
      cancel_url: "http://localhost:5173/payment-cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Stripe session creation failed" });
  }
});

export default router;
