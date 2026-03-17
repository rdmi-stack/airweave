"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Review {
  id: string;
  productId: number;
  userName: string;
  rating: number; // 1-5
  text: string;
  date: string;
  verified: boolean;
}

interface ReviewStore {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date">) => void;
  getReviewsForProduct: (productId: number) => Review[];
}

const seedReviews: Review[] = [
  // Product 1 — Beige Linen Shirt
  { id: "rev_seed_01", productId: 1, userName: "Vikram Sharma", rating: 5, text: "Absolutely love this shirt. The linen is soft right out of the box and the beige tone goes with everything. Wore it to a weekend brunch in Mumbai and got compliments all day.", date: "2025-12-02", verified: true },
  { id: "rev_seed_02", productId: 1, userName: "Priya Nair", rating: 4, text: "Beautiful fabric and great stitching. Runs slightly loose which I actually prefer for summer. The mandarin collar is a nice touch. Took off one star because it wrinkles easily, but that's linen for you.", date: "2025-11-18", verified: true },
  { id: "rev_seed_03", productId: 1, userName: "Arjun Mehta", rating: 5, text: "Third Airweave shirt I've bought and still impressed every time. The breathability is unmatched — perfect for Bangalore weather. Already eyeing the olive one next.", date: "2026-01-05", verified: true },

  // Product 2 — Olive Linen Shirt
  { id: "rev_seed_04", productId: 2, userName: "Sneha Kulkarni", rating: 5, text: "The olive colour is gorgeous in person — much richer than photos show. Paired it with white linen trousers and felt like a million bucks. Fabric quality is top-notch.", date: "2025-12-20", verified: true },
  { id: "rev_seed_05", productId: 2, userName: "Rahul Desai", rating: 4, text: "Solid everyday shirt. Comfortable even in the 35-degree Pune heat. The fit is relaxed without looking sloppy. Would love to see more earth tones from Airweave.", date: "2026-01-12", verified: true },
  { id: "rev_seed_06", productId: 2, userName: "Kavitha Iyer", rating: 5, text: "Bought this for my husband and he practically lives in it now. The linen softens beautifully after each wash. We're both converted to Airweave fans.", date: "2025-11-28", verified: false },

  // Product 3 — White Linen Shirt
  { id: "rev_seed_07", productId: 3, userName: "Aditya Rao", rating: 5, text: "A white linen shirt is a wardrobe essential and this one nails it. The fabric has a nice weight to it — not too sheer. Perfect for both casual and semi-formal occasions.", date: "2026-02-01", verified: true },
  { id: "rev_seed_08", productId: 3, userName: "Meera Joshi", rating: 5, text: "The quality of this white shirt is remarkable at this price point. No see-through issues, beautiful drape, and the fit is flattering. Ordered two more as backups.", date: "2025-12-15", verified: true },
  { id: "rev_seed_09", productId: 3, userName: "Rohan Gupta", rating: 4, text: "Clean, minimal, exactly what I wanted. The hidden placket gives it a sleek look. Only minor gripe is the shipping took a couple extra days, but the product itself is flawless.", date: "2026-01-22", verified: true },

  // Product 4 — Charcoal Linen Trousers
  { id: "rev_seed_10", productId: 4, userName: "Deepika Menon", rating: 5, text: "Finally, linen trousers that don't look frumpy. The charcoal shade is versatile and the elastic waistband is surprisingly elegant. Wore them to office and got asked where I bought them.", date: "2026-01-08", verified: true },
  { id: "rev_seed_11", productId: 4, userName: "Siddharth Patil", rating: 4, text: "Great trousers for the Indian summer. Light and airy but still look put-together. The charcoal colour hides minor stains well which is a practical bonus.", date: "2025-12-28", verified: true },
  { id: "rev_seed_12", productId: 4, userName: "Ananya Reddy", rating: 5, text: "These are my go-to work trousers now. The linen is pre-washed so there's no shrinkage surprise. Comfortable from morning meetings to evening dinners.", date: "2026-02-10", verified: false },

  // Product 5 — Sand Linen Shorts
  { id: "rev_seed_13", productId: 5, userName: "Karthik Subramaniam", rating: 5, text: "Perfect beach holiday shorts. Took these to Goa and they were incredibly comfortable in the humidity. The sand colour looked great and the length is just right above the knee.", date: "2025-12-10", verified: true },
  { id: "rev_seed_14", productId: 5, userName: "Pooja Bhatia", rating: 4, text: "Bought for my boyfriend. The fit is excellent and the fabric feels premium. He says they're the most comfortable shorts he owns. Pockets could be a bit deeper though.", date: "2026-01-15", verified: true },

  // Product 6 — Navy Linen Blazer
  { id: "rev_seed_15", productId: 6, userName: "Rajesh Krishnan", rating: 5, text: "This blazer is a game-changer. Linen blazers often look too casual but this one has structure. Wore it to a client meeting in Chennai and felt completely at ease despite the heat.", date: "2025-11-25", verified: true },
  { id: "rev_seed_16", productId: 6, userName: "Ishita Sen", rating: 5, text: "Stunning piece. The navy is deep and rich, and the half-lining means it doesn't feel heavy. I've worn it over a plain tee and over a shirt — works both ways beautifully.", date: "2026-02-05", verified: true },
  { id: "rev_seed_17", productId: 6, userName: "Manish Agarwal", rating: 4, text: "Excellent blazer for Indian weddings and formal events in summer. The construction is solid and the lapels sit nicely. A bit pricey but worth the investment.", date: "2026-01-20", verified: true },

  // Product 7 — Ivory Linen Kurta
  { id: "rev_seed_18", productId: 7, userName: "Neha Pandey", rating: 5, text: "This kurta is everything. The ivory linen has such a luxurious feel and the embroidery details are subtle yet elegant. Perfect for festive occasions. Got so many compliments at Diwali.", date: "2025-11-10", verified: true },
  { id: "rev_seed_19", productId: 7, userName: "Amit Chatterjee", rating: 5, text: "Finally a modern kurta that doesn't compromise on tradition. The fit is contemporary, the fabric breathes well, and the ivory shade looks refined. Airweave has nailed it.", date: "2026-01-30", verified: true },

  // Product 8 — Rust Linen Overshirt
  { id: "rev_seed_20", productId: 8, userName: "Tanvi Kapoor", rating: 4, text: "Love the rust colour — it's unique and adds character to any outfit. The overshirt is great for layering during Bangalore evenings. Fabric is sturdy yet breathable.", date: "2026-02-14", verified: true },
  { id: "rev_seed_21", productId: 8, userName: "Varun Malik", rating: 5, text: "This overshirt has become my favourite layering piece. Threw it over a white tee with jeans and it looked effortlessly stylish. The linen texture adds so much dimension.", date: "2025-12-22", verified: true },
  { id: "rev_seed_22", productId: 8, userName: "Shreya Dutta", rating: 5, text: "Bought this on a whim and it's now the most-worn item in my closet. The rust shade is warm and flattering. Works as a light jacket too. Highly recommend.", date: "2026-01-18", verified: false },
];

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set, get) => ({
      reviews: seedReviews,

      addReview: (review) => {
        const newReview: Review = {
          ...review,
          id: "rev_" + Math.random().toString(36).slice(2, 10),
          date: new Date().toISOString().split("T")[0],
        };
        set((state) => ({
          reviews: [newReview, ...state.reviews],
        }));
      },

      getReviewsForProduct: (productId) => {
        return get().reviews.filter((r) => r.productId === productId);
      },
    }),
    { name: "airweave-reviews" }
  )
);
