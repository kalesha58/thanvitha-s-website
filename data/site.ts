export const WHATSAPP_NUMBER = "917702285153";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const FREE_DELIVERY_MIN = 499;
export const DELIVERY_FEE = 40;

export const editorialImages = {
  hero: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1200",
  salad: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800",
  meal: "https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=800",
};

export const howItWorks = [
  ["01", "Pick your meal", "Browse protein salads, weekly bowls, and dressing add-ons built for your goals."],
  ["02", "Order on WhatsApp", "Message us directly — quick, easy, no app needed. We confirm fast."],
  ["03", "Fresh to your door", "We prep fresh daily in Mangalagiri. Just open the box and fuel up."],
] as const;

export const trainingLanes = [
  ["Protein Salads", "6 variants · ₹129 onwards", "Protein Salads"],
  ["Weekly Bowls", "Fresh daily · Mon–Sat", "Weekly Bowls"],
  ["100% Veg Options", "Paneer · Soya · Tofu", "Protein Salads"],
  ["Dressing Add-ons", "4 flavours · from ₹29", "Dressing Add-ons"],
] as const;

export const whyFitFuel = [
  ["01", "Flavour first", "We start with a dish worth craving, then engineer the macros around it."],
  ["02", "Fresh ingredients daily", "Purchased fresh every morning. No food storage. No compromise on quality."],
  ["03", "Built for Mangalagiri", "Hygienic, eco-friendly packaging and quick delivery from our kitchen to your door."],
] as const;

export const testimonials = [
  ["“The chicken tikka salad tastes like someone actually cared. The macros are a massive bonus.”", "Ravi K.", "Strength Training, Mangalagiri"],
  ["“Finally a lunch that doesn’t kill my evening workout. The paneer bowl is my go-to every week!”", "Priya S.", "Fitness Enthusiast, Guntur"],
  ["“The weekly bowl subscription changed my meal prep game. Fresh food, real results.”", "Aditya M.", "Runner, Vijayawada"],
] as const;

export const faqs = [
  [
    "Where do you deliver?",
    "We currently deliver across Mangalagiri and nearby areas. Message us on WhatsApp at 7702285153 to confirm delivery to your location.",
  ],
  [
    "How fresh are the meals?",
    "Ingredients are purchased fresh daily. Every meal is freshly prepared — no food storage, no reheating. Just clean, real food.",
  ],
  [
    "Can I subscribe to the weekly meal plan?",
    "Yes! We offer weekly and monthly subscription plans for the Lunch & Dinner bowls (Mon–Sat). Message us on WhatsApp to set up your plan and save 10%.",
  ],
  [
    "Do you have vegetarian options?",
    "Absolutely. We have Paneer Protein Salad, Soya Protein Salad, and daily Veg bowls (Paneer Tikka, Soya Chunks, Tofu) in our weekly menu.",
  ],
] as const;

export const trackStages = [
  { label: "Order received", detail: "Your order is in the kitchen queue.", time: "10:42" },
  { label: "Being prepared", detail: "Our crew is assembling your meal fresh.", time: "10:45" },
  { label: "On the way", detail: "A rider will pick it up shortly.", time: "—" },
  { label: "At your door", detail: "Almost time to eat.", time: "—" },
] as const;

export const adminOrders = [
  { id: "FFK-2841", customer: "Nicha S.", meal: "Green Goddess Bowl × 2", status: "Preparing", total: "฿628" },
  { id: "FFK-2840", customer: "Tom W.", meal: "Miso Salmon Stack × 1", status: "Ready", total: "฿399" },
  { id: "FFK-2839", customer: "Maya K.", meal: "Chimichurri Steak Plate × 2", status: "Delivered", total: "฿808" },
] as const;

export const siteMetadata = {
  title: "Thanvita's FitFuel Kitchen | Protein Salads & Weekly Bowls | Mangalagiri",
  description:
    "High-protein salads & fresh weekly bowls from Thanvita's FitFuel Kitchen, Mangalagiri. Clean ingredients, real macros, freshly prepared daily. Eat healthy, stay fit.",
};
