// controllers/payment.controller.js
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Create Stripe Checkout Session and return URL
 */
export const createCheckoutSession = async (req, res) => {
  try {
    const { amount, currency = "pkr", productName = "Test Product" } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: productName,
            },
            unit_amount: amount, // smallest currency unit
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Session Error:", err);
    res.status(500).json({ error: err.message });
  }
};


// success or fail

// // controllers/payment.controller.js
// import Stripe from "stripe";
// // import { Cart } from "../models/cart.model.js"; // adjust path
// // import { User } from "../models/user.model.js"; // adjust path
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// /**
//  * Create Stripe Checkout Session for full cart
//  */
// export const createCheckoutSession = async (req, res) => {
//   try {
//     const userId = req.user?.id; // assuming you have auth middleware
//     if (!userId) return res.status(401).json({ error: "Unauthorized" });

//     // Fetch user's cart
//     const cartItems = await Cart.findAll({ where: { userId }, include: ["Product"] });
//     if (!cartItems || cartItems.length === 0) {
//       return res.status(400).json({ error: "Cart is empty" });
//     }

//     // Prepare line items for Stripe
//     const line_items = cartItems.map((item) => ({
//       price_data: {
//         currency: "pkr",
//         product_data: { name: item.Product?.name || "Product" },
//         unit_amount: Math.round((item.Product?.price ?? 0) * 100), // in paise
//       },
//       quantity: item.quantity || 1,
//     }));

//     // Total amount (optional if you want to send)
//     const amount = line_items.reduce(
//       (sum, item) => sum + item.price_data.unit_amount * item.quantity,
//       0
//     );

//     // Create Stripe Checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       client_reference_id: userId, // link session to user
//       success_url: `${process.env.CLIENT_URL}/user/payment-success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.CLIENT_URL}/user/payment-failed`,
//     });

//     res.status(200).json({ url: session.url });
//   } catch (err) {
//     console.error("Stripe Checkout Session Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };
