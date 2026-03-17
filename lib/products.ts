export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  desc: string;
  details: string[];
  category: string;
  colors: string[];
  sizes: string[];
  images: string[];
  badge?: string;
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Beige Linen Shirt",
    price: 3499,
    originalPrice: 4999,
    desc: "Premium breathable linen in a timeless beige. Relaxed fit with a mandarin collar for effortless summer style.",
    details: [
      "100% European Flax Linen",
      "Mandarin collar with hidden placket",
      "Relaxed fit — size up for oversized look",
      "Pre-washed for softness",
      "Machine washable",
    ],
    category: "Shirts",
    colors: ["Beige", "Sand", "Ivory"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=800&q=80",
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80",
    ],
    badge: "Best Seller",
    stock: 25,
  },
  {
    id: 2,
    name: "White Linen Shirt",
    price: 3199,
    desc: "Clean, minimal, luxurious. A crisp white linen shirt that pairs with everything from chinos to shorts.",
    details: [
      "100% European Flax Linen",
      "Classic spread collar",
      "Regular fit",
      "Mother-of-pearl buttons",
      "Machine washable",
    ],
    category: "Shirts",
    colors: ["White", "Off-White"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80",
    ],
    stock: 18,
  },
  {
    id: 3,
    name: "Olive Linen Shirt",
    price: 3799,
    originalPrice: 4499,
    desc: "A modern earthy tone that stands out. Enzyme-washed for that perfectly lived-in texture from day one.",
    details: [
      "100% European Flax Linen",
      "Band collar with button-down",
      "Slim fit",
      "Enzyme-washed finish",
      "Machine washable",
    ],
    category: "Shirts",
    colors: ["Olive", "Sage", "Forest"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    ],
    badge: "New Arrival",
    stock: 32,
  },
  {
    id: 4,
    name: "Navy Linen Trousers",
    price: 4299,
    desc: "Tailored linen trousers in deep navy. Elastic waistband with drawstring for the perfect balance of structure and comfort.",
    details: [
      "100% European Flax Linen",
      "Elastic waist with drawstring",
      "Tapered fit",
      "Side and back pockets",
      "Machine washable",
    ],
    category: "Trousers",
    colors: ["Navy", "Charcoal", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    ],
    stock: 15,
  },
  {
    id: 5,
    name: "Sand Linen Co-ord Set",
    price: 5999,
    originalPrice: 7499,
    desc: "The complete summer look. Matching linen shirt and shorts set in warm sand — vacation-ready, city-approved.",
    details: [
      "100% European Flax Linen",
      "Matching shirt + shorts set",
      "Camp collar shirt, elastic waist shorts",
      "Relaxed fit throughout",
      "Machine washable",
    ],
    category: "Co-ords",
    colors: ["Sand", "Cream", "Tan"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    ],
    badge: "Best Seller",
    stock: 8,
  },
  {
    id: 6,
    name: "Charcoal Linen Overshirt",
    price: 4499,
    desc: "Layer up in style. A structured linen overshirt that works as a light jacket for breezy evenings and AC offices.",
    details: [
      "100% European Flax Linen",
      "Structured overshirt cut",
      "Two chest patch pockets",
      "Regular fit — layer over tees",
      "Machine washable",
    ],
    category: "Shirts",
    colors: ["Charcoal", "Slate", "Graphite"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    ],
    stock: 22,
  },
  {
    id: 7,
    name: "Ivory Linen Kurta",
    price: 3999,
    desc: "Traditional meets contemporary. A clean-cut linen kurta with minimal detailing — perfect for festivals and formal gatherings.",
    details: [
      "100% European Flax Linen",
      "Straight-cut kurta silhouette",
      "Side slits with contrast stitch",
      "Regular fit",
      "Machine washable",
    ],
    category: "Ethnic",
    colors: ["Ivory", "White", "Pearl"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    ],
    badge: "Festive Pick",
    stock: 12,
  },
  {
    id: 8,
    name: "Rust Linen Shorts",
    price: 2499,
    desc: "Weekend essential. Relaxed linen shorts in a rich rust tone — pair with a white tee and you're set.",
    details: [
      "100% European Flax Linen",
      "7-inch inseam",
      "Elastic waist with drawstring",
      "Side pockets + back welt pocket",
      "Machine washable",
    ],
    category: "Shorts",
    colors: ["Rust", "Terracotta", "Burnt Orange"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    ],
    stock: 30,
  },
];

export const categories = [
  {
    name: "Shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    count: 4,
  },
  {
    name: "Trousers",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    count: 1,
  },
  {
    name: "Co-ords",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
    count: 1,
  },
  {
    name: "Ethnic",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    count: 1,
  },
  {
    name: "Shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
    count: 1,
  },
];
