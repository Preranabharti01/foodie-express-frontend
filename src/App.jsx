import React, { useState, useMemo } from "react";
import {
  Search, MapPin, Star, Clock, ShoppingCart, Plus, Minus, Trash2,
  Menu as MenuIcon, X, Eye, EyeOff, Facebook, Instagram, Twitter,
  Youtube, Mail, Phone, Send, ChevronRight, Flame, Smartphone,
  CheckCircle2, User, Lock, ArrowRight, Quote, LogOut, ShieldAlert
} from "lucide-react";

/* ============================== DESIGN TOKENS ==============================
   Palette: Turmeric #F2A93B (primary), Chili #C1442E (primary-dark/accent),
   Maroon-Ink #3B1F1F (text), Papad Cream #FFF6E9 (bg), Mango #FFD166 (highlight),
   Curry Leaf #4C7A4C (veg/fresh), Kraft #EADFC9 (borders/cards)
   Type: Fredoka (display, chunky & hand-drawn feel) + Work Sans (body).
   Signature: flat "sticker" cards with a solid ink border + offset hard
   shadow (like a hand-cut paper cutout), a wobbly marker underline instead
   of a soft gradient blob, and a taped-on offer strip.
=============================================================================*/

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap');";

const COLORS = {
  primary: "#F2A93B",
  primaryDark: "#C1442E",
  ink: "#3B1F1F",
  cream: "#FFF6E9",
  gold: "#C1442E",
  leaf: "#4C7A4C",
  sand: "#EADFC9",
};

const HEAD = "Fredoka, sans-serif";
const BODY = "'Work Sans', sans-serif";
const HARD_SHADOW = "4px 4px 0px #3B1F1F";
const HARD_BORDER = "2.5px solid #3B1F1F";

/* ============================== DUMMY DATA ============================== */

const CATEGORIES = [
  { name: "Pizza", emoji: "🍕" },
  { name: "Burger", emoji: "🍔" },
  { name: "Biryani", emoji: "🍛" },
  { name: "Chinese", emoji: "🥡" },
  { name: "Pasta", emoji: "🍝" },
  { name: "Desserts", emoji: "🍰" },
  { name: "Drinks", emoji: "🥤" },
  { name: "Salads", emoji: "🥗" },
];

const FOOD_ITEMS = [
  { id: 1, name: "Margherita Pizza", category: "Pizza", price: 249, rating: 4.5, time: "25-30 min", veg: true, desc: "Classic delight with 100% real mozzarella cheese.", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&q=80" },
  { id: 2, name: "Peppy Paneer Pizza", category: "Pizza", price: 299, rating: 4.4, time: "25-30 min", veg: true, desc: "Loaded with paneer, capsicum, red pepper & onion.", img: "https://images.unsplash.com/photo-1548365328-9f547fb0953c?w=500&q=80" },
  { id: 3, name: "Classic Cheese Burger", category: "Burger", price: 149, rating: 4.3, time: "15-20 min", veg: false, desc: "Juicy grilled patty with melted cheddar cheese.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
  { id: 4, name: "Crispy Veg Burger", category: "Burger", price: 119, rating: 4.1, time: "15-20 min", veg: true, desc: "Crunchy veg patty with fresh lettuce & mayo.", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80" },
  { id: 5, name: "Hyderabadi Chicken Biryani", category: "Biryani", price: 279, rating: 4.7, time: "35-40 min", veg: false, desc: "Fragrant basmati rice slow-cooked with spiced chicken.", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80" },
  { id: 6, name: "Veg Dum Biryani", category: "Biryani", price: 219, rating: 4.4, time: "30-35 min", veg: true, desc: "Aromatic rice layered with garden vegetables.", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80" },
  { id: 7, name: "Chilli Garlic Noodles", category: "Chinese", price: 169, rating: 4.2, time: "20-25 min", veg: true, desc: "Wok-tossed noodles in spicy garlic sauce.", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80" },
  { id: 8, name: "Chicken Manchurian", category: "Chinese", price: 229, rating: 4.5, time: "25-30 min", veg: false, desc: "Crispy chicken tossed in tangy Indo-Chinese sauce.", img: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500&q=80" },
  { id: 9, name: "Creamy Alfredo Pasta", category: "Pasta", price: 239, rating: 4.4, time: "20-25 min", veg: true, desc: "Penne pasta in rich creamy white sauce.", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&q=80" },
  { id: 10, name: "Arrabbiata Pasta", category: "Pasta", price: 219, rating: 4.3, time: "20-25 min", veg: true, desc: "Spicy red sauce pasta with fresh basil.", img: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=500&q=80" },
  { id: 11, name: "Chocolate Lava Cake", category: "Desserts", price: 129, rating: 4.8, time: "10-15 min", veg: true, desc: "Warm molten chocolate cake with a gooey center.", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&q=80" },
  { id: 12, name: "Blueberry Cheesecake", category: "Desserts", price: 159, rating: 4.6, time: "10-15 min", veg: true, desc: "Creamy cheesecake topped with blueberry compote.", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80" },
  { id: 13, name: "Classic Cold Coffee", category: "Drinks", price: 99, rating: 4.3, time: "10 min", veg: true, desc: "Chilled coffee blended with rich ice cream.", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80" },
  { id: 14, name: "Fresh Mango Mojito", category: "Drinks", price: 89, rating: 4.2, time: "10 min", veg: true, desc: "Refreshing mint & mango cooler.", img: "https://images.unsplash.com/photo-1544158914-4e46e4693b6b?w=500&q=80" },
  { id: 15, name: "Greek Salad", category: "Salads", price: 179, rating: 4.4, time: "10-15 min", veg: true, desc: "Crisp veggies tossed with feta & olive oil.", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80" },
  { id: 16, name: "Peri Peri Chicken Salad", category: "Salads", price: 219, rating: 4.5, time: "15 min", veg: false, desc: "Grilled peri peri chicken over fresh greens.", img: "https://images.unsplash.com/photo-1512852939750-1305098529bf?w=500&q=80" },
];

const RESTAURANTS = [
  { id: 1, name: "Spice Symphony", cuisine: "North Indian • Mughlai", rating: 4.6, time: "30-35 min", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80" },
  { id: 2, name: "Bella Italia", cuisine: "Italian • Continental", rating: 4.5, time: "25-30 min", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80" },
  { id: 3, name: "Dragon Wok", cuisine: "Chinese • Thai", rating: 4.4, time: "20-25 min", img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&q=80" },
  { id: 4, name: "The Burger Yard", cuisine: "American • Fast Food", rating: 4.3, time: "15-20 min", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80" },
];

const TESTIMONIALS = [
  { id: 1, name: "Ananya Sharma", role: "Regular Customer", text: "Foodie Express never disappoints — hot food, quick delivery, and the biryani is unbeatable!", rating: 5, initial: "A" },
  { id: 2, name: "Rohan Verma", role: "Food Blogger", text: "The variety of restaurants and dishes here is incredible. My go-to app for every craving.", rating: 5, initial: "R" },
  { id: 3, name: "Priya Nair", role: "Working Professional", text: "Super reliable delivery windows, great offers, and the app itself is a joy to use.", rating: 4, initial: "P" },
];

const currency = (n) => `₹${n.toFixed(0)}`;

/* ============================== SMALL UI BITS ============================== */

function Rating({ value }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: COLORS.ink }}>
      <Star size={13} fill={COLORS.gold} stroke={COLORS.gold} />
      {value}
    </span>
  );
}

function VegDot({ veg }) {
  return (
    <span
      className="inline-flex items-center justify-center w-4 h-4 rounded-sm border-2 shrink-0"
      style={{ borderColor: veg ? COLORS.leaf : "#C1272D" }}
      title={veg ? "Veg" : "Non-Veg"}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: veg ? COLORS.leaf : "#C1272D" }} />
    </span>
  );
}

function PrimaryButton({ children, onClick, className = "", type = "button", full = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${full ? "w-full" : ""} px-6 py-3 rounded-xl font-semibold text-white transition-all duration-100 hover:-translate-y-0.5 hover:translate-x-[-1px] active:translate-y-1 active:translate-x-1 active:shadow-none ${className}`}
      style={{ background: COLORS.primary, border: HARD_BORDER, boxShadow: HARD_SHADOW, fontFamily: HEAD, color: COLORS.ink }}
    >
      {children}
    </button>
  );
}

/* ============================== NAVBAR ============================== */

function Navbar({ page, setPage, cartCount, isLoggedIn, user, onLogout }) {
  const [open, setOpen] = useState(false);
  const links = [
    { key: "home", label: "Home" },
    { key: "menu", label: "Menu" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
  ];

  const go = (p) => {
    setPage(p);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50" style={{ background: COLORS.cream, borderBottom: HARD_BORDER }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={() => go("home")} className="flex items-center gap-2 shrink-0">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-lg" style={{ background: COLORS.primary, border: HARD_BORDER }}>🍔</span>
          <span style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-xl font-extrabold tracking-tight">
            Foodie<span style={{ color: COLORS.primary }}>Express</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.key}
              onClick={() => go(l.key)}
              className="relative text-sm font-semibold transition-colors"
              style={{ fontFamily: BODY, color: page === l.key ? COLORS.primary : COLORS.ink }}
            >
              {l.label}
              {page === l.key && <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full" style={{ background: COLORS.primary }} />}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <span className="flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full" style={{ background: COLORS.sand, color: COLORS.ink, fontFamily: BODY }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold" style={{ background: COLORS.primary, border: HARD_BORDER }}>
                  {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                </span>
                Hi, {user?.name || user?.email?.split("@")[0]}
              </span>
              <button onClick={onLogout} title="Logout" className="w-9 h-9 rounded-full flex items-center justify-center transition hover:bg-orange-50" style={{ color: COLORS.ink }}>
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => go("login")} className="text-sm font-semibold px-4 py-2 rounded-full transition" style={{ color: COLORS.ink, fontFamily: BODY }}>
                Login
              </button>
              <button onClick={() => go("signup")} className="text-sm font-semibold px-4 py-2 rounded-full border-2 transition hover:bg-orange-50" style={{ borderColor: COLORS.primary, color: COLORS.primary, fontFamily: BODY }}>
                Sign Up
              </button>
            </>
          )}
          <button onClick={() => go("cart")} className="relative w-10 h-10 rounded-full flex items-center justify-center" style={{ background: COLORS.sand }}>
            <ShoppingCart size={18} color={COLORS.ink} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] font-bold text-white rounded-full w-[18px] h-[18px] px-1 flex items-center justify-center" style={{ background: COLORS.primary }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button onClick={() => go("cart")} className="relative w-9 h-9 rounded-full flex items-center justify-center" style={{ background: COLORS.sand }}>
            <ShoppingCart size={16} color={COLORS.ink} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[9px] font-bold text-white rounded-full w-4 h-4 flex items-center justify-center" style={{ background: COLORS.primary }}>
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setOpen(!open)} className="w-9 h-9 flex items-center justify-center">
            {open ? <X size={22} color={COLORS.ink} /> : <MenuIcon size={22} color={COLORS.ink} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-1" style={{ background: COLORS.cream, borderTop: `1px solid ${COLORS.sand}` }}>
          {links.map((l) => (
            <button key={l.key} onClick={() => go(l.key)} className="text-left py-2.5 text-sm font-semibold" style={{ color: page === l.key ? COLORS.primary : COLORS.ink, fontFamily: BODY }}>
              {l.label}
            </button>
          ))}
          {isLoggedIn ? (
            <>
              <span className="py-2.5 text-sm font-semibold" style={{ color: COLORS.ink, fontFamily: BODY }}>Hi, {user?.name || user?.email?.split("@")[0]}</span>
              <button onClick={() => { onLogout(); setOpen(false); }} className="text-left py-2.5 text-sm font-semibold flex items-center gap-2" style={{ color: COLORS.ink }}>
                <LogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => go("login")} className="text-left py-2.5 text-sm font-semibold" style={{ color: page === "login" ? COLORS.primary : COLORS.ink, fontFamily: BODY }}>Login</button>
              <button onClick={() => go("signup")} className="text-left py-2.5 text-sm font-semibold" style={{ color: page === "signup" ? COLORS.primary : COLORS.ink, fontFamily: BODY }}>Sign Up</button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

/* ============================== FOOTER ============================== */

function Footer({ setPage }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer style={{ background: COLORS.ink, fontFamily: BODY }} className="text-white pt-16 pb-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: COLORS.primary, border: HARD_BORDER }}>🍔</span>
            <span style={{ fontFamily: HEAD }} className="text-xl font-extrabold">Foodie Express</span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">Hot, fresh, and delivered fast. Your favorite meals from the best local kitchens, right to your door.</p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition hover:-translate-y-0.5" style={{ background: "rgba(255,255,255,0.08)" }}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontFamily: HEAD }} className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            {[["Home", "home"], ["Menu", "menu"], ["About Us", "about"], ["Contact", "contact"]].map(([label, key]) => (
              <li key={key}><button onClick={() => setPage(key)} className="hover:text-white transition">{label}</button></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: HEAD }} className="font-bold mb-4">Contact Us</h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li className="flex items-center gap-2"><MapPin size={14} /> Hazratganj, Lucknow, UP 226001</li>
            <li className="flex items-center gap-2"><Phone size={14} /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail size={14} /> hello@foodieexpress.com</li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: HEAD }} className="font-bold mb-4">Stay Updated</h4>
          <p className="text-sm text-white/60 mb-3">Subscribe for exclusive offers & new dish drops.</p>
          {subscribed ? (
            <p className="text-sm flex items-center gap-2" style={{ color: COLORS.primary }}><CheckCircle2 size={16} /> Subscribed! Get ready for tasty deals.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }} className="flex gap-2">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Your email" className="flex-1 min-w-0 px-3 py-2 rounded-full text-sm outline-none" style={{ background: "rgba(255,255,255,0.1)", color: "white" }} />
              <button type="submit" className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center" style={{ background: COLORS.primary }}>
                <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 text-xs text-white/40 flex flex-col sm:flex-row justify-between gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <span>© 2026 Foodie Express. All rights reserved.</span>
        <span>Made with ❤️ for food lovers everywhere.</span>
      </div>
    </footer>
  );
}

/* ============================== FOOD CARD ============================== */

function FoodCard({ item, onAdd }) {
  const [qty, setQty] = useState(1);
  const tilt = item.id % 2 === 0 ? "hover:rotate-1" : "hover:-rotate-1";
  return (
    <div className={`group rounded-xl overflow-hidden bg-white transition-all duration-200 hover:-translate-y-1 ${tilt}`} style={{ border: HARD_BORDER, boxShadow: HARD_SHADOW }}>
      <div className="relative h-44 overflow-hidden" style={{ borderBottom: HARD_BORDER }}>
        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <span className="absolute top-3 left-3 bg-white rounded-md px-1.5 py-1" style={{ border: `1.5px solid ${COLORS.ink}` }}><VegDot veg={item.veg} /></span>
        <span className="absolute top-3 right-3 bg-white rounded-md px-2 py-1 text-xs font-bold flex items-center gap-1" style={{ color: COLORS.ink, border: `1.5px solid ${COLORS.ink}` }}>
          <Star size={12} fill={COLORS.gold} stroke={COLORS.gold} /> {item.rating}
        </span>
      </div>
      <div className="p-4">
        <h3 style={{ fontFamily: HEAD, color: COLORS.ink }} className="font-semibold text-base leading-tight">{item.name}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2 h-8">{item.desc}</p>
        <div className="flex items-center justify-between mt-3">
          <span style={{ fontFamily: HEAD, color: COLORS.primaryDark }} className="font-semibold text-lg">{currency(item.price)}</span>
          <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> {item.time}</span>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="flex items-center rounded-lg" style={{ border: `1.5px solid ${COLORS.ink}` }}>
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 flex items-center justify-center"><Minus size={14} /></button>
            <span className="w-6 text-center text-sm font-bold">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="w-8 h-8 flex items-center justify-center"><Plus size={14} /></button>
          </div>
          <button onClick={() => { onAdd(item, qty); setQty(1); }} className="flex-1 text-sm font-semibold rounded-lg py-2 transition active:translate-y-0.5" style={{ background: COLORS.primary, border: `1.5px solid ${COLORS.ink}`, color: COLORS.ink, fontFamily: BODY }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================== HOME PAGE ============================== */

function Home({ setPage, search, setSearch, addToCart }) {
  const [activeCat, setActiveCat] = useState("All");
  const featured = useMemo(() => {
    let list = FOOD_ITEMS;
    if (activeCat !== "All") list = list.filter((f) => f.category === activeCat);
    if (search.trim()) list = list.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));
    return list.slice(0, 8);
  }, [activeCat, search]);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: COLORS.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-5" style={{ background: "#FFE3B8", color: COLORS.primaryDark, border: `1.5px solid ${COLORS.ink}`, fontFamily: BODY }}>
              <Flame size={13} /> Fast delivery in under 30 minutes
            </span>
            <h1 style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              Cravings, meet<br />
              <span className="relative inline-block" style={{ color: COLORS.primaryDark }}>
                your doorstep.
                <svg className="absolute left-0 -bottom-2 w-full" height="10" viewBox="0 0 220 10" preserveAspectRatio="none">
                  <path d="M2 6 C 40 -2, 80 10, 120 4 S 190 -2, 218 6" fill="none" stroke={COLORS.primary} strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p style={{ fontFamily: BODY }} className="mt-6 text-gray-600 text-base sm:text-lg max-w-md">
              Order from hundreds of local restaurants — piping hot meals, honest prices, and tracked delivery every step of the way.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryButton onClick={() => setPage("menu")}>
                <span className="flex items-center gap-2">Order Now <ArrowRight size={16} /></span>
              </PrimaryButton>
              <button onClick={() => setPage("about")} className="text-sm font-semibold underline decoration-2 underline-offset-4" style={{ color: COLORS.ink, fontFamily: BODY }}>
                Learn our story
              </button>
            </div>
            <div className="flex gap-8 mt-10">
              <div><p style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-2xl font-semibold" >500+</p><p className="text-xs text-gray-500">Restaurants</p></div>
              <div><p style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-2xl font-semibold">2M+</p><p className="text-xs text-gray-500">Orders Delivered</p></div>
              <div><p style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-2xl font-semibold">4.7★</p><p className="text-xs text-gray-500">Avg. Rating</p></div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden -rotate-2 transition-transform hover:rotate-0 duration-300" style={{ border: HARD_BORDER, boxShadow: "8px 8px 0px #3B1F1F" }}>
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80" alt="Delicious food" className="w-full h-80 sm:h-96 object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-xl px-4 py-3 flex items-center gap-3 rotate-3" style={{ fontFamily: BODY, border: HARD_BORDER, boxShadow: HARD_SHADOW }}>
              <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#FFE3B8", border: `1.5px solid ${COLORS.ink}` }}>⏱️</span>
              <div>
                <p className="text-sm font-bold" style={{ color: COLORS.ink }}>25 min</p>
                <p className="text-[11px] text-gray-500">Avg. delivery time</p>
              </div>
            </div>
            <div className="absolute -top-5 -right-4 w-24 h-24 rounded-full flex flex-col items-center justify-center text-center rotate-6" style={{ background: COLORS.primary, border: HARD_BORDER, boxShadow: HARD_SHADOW, fontFamily: HEAD, color: COLORS.ink }}>
              <span className="text-[10px] font-bold leading-none">HOT &</span>
              <span className="text-[10px] font-bold leading-none">FRESH</span>
              <span className="text-lg leading-none mt-1">🔥</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-14 -mt-2">
          <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-3.5" style={{ border: HARD_BORDER }}>
            <Search size={18} color="#999" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for pizza, biryani, burgers..."
              className="flex-1 outline-none text-sm bg-transparent"
              style={{ fontFamily: BODY }}
            />
            <button onClick={() => setPage("menu")} className="hidden sm:block text-xs font-bold text-white px-4 py-2 rounded-full" style={{ background: COLORS.ink, fontFamily: BODY }}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* OFFERS TICKER */}
      <div className="py-3 overflow-hidden" style={{ background: COLORS.primaryDark, borderTop: HARD_BORDER, borderBottom: HARD_BORDER }}>
        <div className="flex gap-10 whitespace-nowrap animate-marquee text-sm font-semibold text-white/90" style={{ fontFamily: BODY }}>
          {[...Array(2)].flatMap((_, r) => [
            "🔥 50% OFF up to ₹100 on your first order",
            "🍕 Buy 1 Get 1 Free on all Pizzas today",
            "🚚 Free delivery on orders above ₹299",
            "🎉 Flat ₹75 off with code FOODIE75",
          ].map((t, i) => <span key={r + "-" + i} className="mx-4">{t}</span>))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-2xl sm:text-3xl font-extrabold text-center">Explore Categories</h2>
        <p className="text-center text-gray-500 text-sm mt-2">Handpicked cuisines for every mood</p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mt-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.name}
              onClick={() => { setActiveCat(c.name === activeCat ? "All" : c.name); }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 hover:-translate-y-1"
              style={{ background: activeCat === c.name ? "#FFE3B8" : "white", border: `1.5px solid ${COLORS.ink}` }}
            >
              <span className="text-2xl">{c.emoji}</span>
              <span className="text-xs font-semibold" style={{ color: COLORS.ink, fontFamily: BODY }}>{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-2xl sm:text-3xl font-extrabold">Featured Dishes</h2>
            <p className="text-gray-500 text-sm mt-1">{activeCat === "All" ? "Our most-loved picks" : `Showing ${activeCat}`}</p>
          </div>
          <button onClick={() => setPage("menu")} className="text-sm font-bold flex items-center gap-1" style={{ color: COLORS.primary, fontFamily: BODY }}>
            View Full Menu <ChevronRight size={15} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((item) => <FoodCard key={item.id} item={item} onAdd={addToCart} />)}
        </div>
        {featured.length === 0 && <p className="text-center text-gray-400 py-10">No dishes match your search.</p>}
      </section>

      {/* RESTAURANTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-2xl sm:text-3xl font-extrabold mb-8">Popular Restaurants</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RESTAURANTS.map((r) => (
            <div key={r.id} className="rounded-xl overflow-hidden bg-white transition hover:-translate-y-1" style={{ border: HARD_BORDER, boxShadow: HARD_SHADOW }}>
              <img src={r.img} alt={r.name} className="w-full h-32 object-cover" style={{ borderBottom: HARD_BORDER }} />
              <div className="p-4">
                <h3 style={{ fontFamily: HEAD, color: COLORS.ink }} className="font-semibold text-sm">{r.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{r.cuisine}</p>
                <div className="flex items-center justify-between mt-3 text-xs">
                  <Rating value={r.rating} />
                  <span className="text-gray-500 flex items-center gap-1"><Clock size={12} /> {r.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative" style={{ background: COLORS.primaryDark, border: HARD_BORDER, boxShadow: "8px 8px 0px #3B1F1F" }}>
          <div className="absolute -right-8 -bottom-14 w-48 h-48 rounded-full" style={{ border: "3px dashed rgba(255,255,255,0.35)" }} />
          <div className="relative">
            <h3 style={{ fontFamily: HEAD }} className="text-2xl sm:text-3xl font-semibold text-white">Weekend Feast Offer</h3>
            <p className="text-white/90 mt-2 text-sm max-w-md">Get flat 50% off up to ₹150 on orders above ₹399. Valid on all restaurants, this weekend only.</p>
          </div>
          <button onClick={() => setPage("menu")} className="relative bg-white text-sm font-bold px-6 py-3 rounded-xl shrink-0" style={{ color: COLORS.primaryDark, border: HARD_BORDER, fontFamily: BODY }}>
            Grab the Deal
          </button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-2xl sm:text-3xl font-extrabold text-center mb-10">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="rounded-xl p-6 bg-white relative" style={{ border: HARD_BORDER, boxShadow: HARD_SHADOW }}>
              <Quote size={28} color={COLORS.sand} className="absolute top-4 right-5" />
              <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < t.rating ? COLORS.gold : "none"} stroke={COLORS.gold} />)}</div>
              <p className="text-sm text-gray-600 leading-relaxed">{t.text}</p>
              <div className="flex items-center gap-3 mt-5">
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: COLORS.primary, border: HARD_BORDER }}>{t.initial}</span>
                <div>
                  <p style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* APP PROMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl grid md:grid-cols-2 items-center gap-8 p-8 md:p-12" style={{ background: COLORS.ink, border: HARD_BORDER }}>
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-4" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
              <Smartphone size={13} /> Get the App
            </span>
            <h3 style={{ fontFamily: HEAD }} className="text-2xl sm:text-3xl font-extrabold text-white">Order faster with the Foodie Express app</h3>
            <p className="text-white/60 text-sm mt-3 max-w-md">Exclusive app-only offers, live order tracking, and one-tap reordering of your favorites.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2" style={{ color: COLORS.ink }}>📱 App Store</button>
              <button className="bg-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2" style={{ color: COLORS.ink }}>▶️ Google Play</button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-40 h-72 rounded-2xl border-4 border-dashed border-white/25 flex items-center justify-center text-5xl" style={{ background: "rgba(255,255,255,0.05)" }}>📲</div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 22s linear infinite; }
      `}</style>
    </div>
  );
}

/* ============================== MENU PAGE ============================== */

function MenuPage({ search, setSearch, addToCart }) {
  const [activeCat, setActiveCat] = useState("All");
  const filtered = useMemo(() => {
    let list = FOOD_ITEMS;
    if (activeCat !== "All") list = list.filter((f) => f.category === activeCat);
    if (search.trim()) list = list.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.category.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [activeCat, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-3xl sm:text-4xl font-extrabold">Our Full Menu</h1>
        <p className="text-gray-500 mt-2 text-sm">{filtered.length} delicious dishes, freshly prepared</p>
      </div>

      <div className="flex items-center gap-3 bg-white rounded-full shadow-md px-5 py-3 max-w-xl mx-auto mb-6" style={{ border: `1.5px solid ${COLORS.ink}` }}>
        <Search size={18} color="#999" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search dishes or category..." className="flex-1 outline-none text-sm bg-transparent" style={{ fontFamily: BODY }} />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button onClick={() => setActiveCat("All")} className="px-4 py-2 rounded-full text-xs font-bold transition" style={{ background: activeCat === "All" ? COLORS.primary : "white", color: COLORS.ink, border: `1.5px solid ${COLORS.ink}` }}>All</button>
        {CATEGORIES.map((c) => (
          <button key={c.name} onClick={() => setActiveCat(c.name)} className="px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5" style={{ background: activeCat === c.name ? COLORS.primary : "white", color: COLORS.ink, border: `1.5px solid ${COLORS.ink}` }}>
            <span>{c.emoji}</span>{c.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((item) => <FoodCard key={item.id} item={item} onAdd={addToCart} />)}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-gray-500">No dishes found. Try a different search or category.</p>
        </div>
      )}
    </div>
  );
}

/* ============================== CART PAGE ============================== */

function CartPage({ cart, updateQty, removeItem, setPage, isLoggedIn, onRequireLogin }) {
  const [checkedOut, setCheckedOut] = useState(false);
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const deliveryFee = cart.length === 0 ? 0 : subtotal > 299 ? 0 : 40;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      onRequireLogin();
      return;
    }
    setCheckedOut(true);
  };

  if (checkedOut) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-2xl font-extrabold">Order placed successfully!</h2>
        <p className="text-gray-500 mt-2 text-sm">This is a demo checkout — no real order or payment was processed. Your food would be arriving in 30-35 minutes.</p>
        <PrimaryButton onClick={() => setPage("home")} className="mt-8">Back to Home</PrimaryButton>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-3xl font-extrabold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🛒</p>
          <p className="text-gray-500 mb-6">Your cart is empty. Let's fix that!</p>
          <PrimaryButton onClick={() => setPage("menu")}>Browse Menu</PrimaryButton>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white rounded-xl p-4" style={{ border: HARD_BORDER }}>
                <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 style={{ fontFamily: HEAD, color: COLORS.ink }} className="font-bold text-sm truncate">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{currency(item.price)} each</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center rounded-full" style={{ background: COLORS.sand }}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center"><Minus size={12} /></button>
                      <span className="w-6 text-center text-xs font-bold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center"><Plus size={12} /></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1">
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                </div>
                <p style={{ fontFamily: HEAD, color: COLORS.primaryDark }} className="font-extrabold text-sm shrink-0">{currency(item.price * item.qty)}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-6 h-fit sticky top-24 bg-white" style={{ border: HARD_BORDER, boxShadow: HARD_SHADOW }}>
            <h3 style={{ fontFamily: HEAD, color: COLORS.ink }} className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2.5 text-sm text-gray-600">
              <div className="flex justify-between"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
              <div className="flex justify-between"><span>Delivery Fee</span><span>{deliveryFee === 0 ? "FREE" : currency(deliveryFee)}</span></div>
              <div className="flex justify-between"><span>Tax (5%)</span><span>{currency(tax)}</span></div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 font-bold text-base" style={{ borderTop: `1px dashed ${COLORS.sand}`, color: COLORS.ink, fontFamily: HEAD }}>
              <span>Total</span><span>{currency(total)}</span>
            </div>
            <PrimaryButton onClick={handleCheckout} full className="mt-6">Proceed to Checkout</PrimaryButton>
            {!isLoggedIn && (
              <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center gap-1.5">
                <ShieldAlert size={13} /> You'll need to log in to place the order
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================== ABOUT PAGE ============================== */

function AboutPage() {
  const team = [
    { name: "Aarav Kapoor", role: "Founder & CEO", initial: "A" },
    { name: "Ishita Rao", role: "Head of Operations", initial: "I" },
    { name: "Vikram Sen", role: "Head Chef Partner", initial: "V" },
    { name: "Neha Kulkarni", role: "Head of Product", initial: "N" },
  ];
  return (
    <div>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-3xl sm:text-4xl font-extrabold">Our Story</h1>
        <p className="text-gray-600 mt-5 leading-relaxed max-w-2xl mx-auto">
          Foodie Express started in 2019 with a simple idea: everyone deserves a great meal without leaving home. What began as three delivery riders and a handful of partner kitchens in Lucknow has grown into a platform connecting thousands of hungry customers with the restaurants they love — every single day.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl p-8" style={{ background: COLORS.cream, border: HARD_BORDER }}>
          <h3 style={{ fontFamily: HEAD, color: COLORS.primaryDark }} className="text-xl font-extrabold mb-3">🎯 Our Mission</h3>
          <p className="text-sm text-gray-600 leading-relaxed">To make great food accessible to everyone, everywhere — by empowering local restaurants and delivering happiness, one order at a time.</p>
        </div>
        <div className="rounded-xl p-8" style={{ background: COLORS.cream, border: HARD_BORDER }}>
          <h3 style={{ fontFamily: HEAD, color: COLORS.primaryDark }} className="text-xl font-extrabold mb-3">🔭 Our Vision</h3>
          <p className="text-sm text-gray-600 leading-relaxed">To become the most trusted food delivery experience in India, known for reliability, variety, and genuine care for our customers and partners.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <h2 style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-2xl font-extrabold text-center mb-10">Why Choose Us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            ["⚡", "Lightning Fast", "Average delivery in under 30 minutes, tracked live."],
            ["🍽️", "500+ Restaurants", "From street food to fine dining, all in one app."],
            ["💰", "Best Prices", "Regular offers and no hidden charges, ever."],
            ["🛡️", "Quality Assured", "Every partner kitchen is hygiene-verified."],
          ].map(([emoji, title, desc], i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-white" style={{ border: HARD_BORDER, boxShadow: HARD_SHADOW }}>
              <div className="text-3xl mb-3">{emoji}</div>
              <h4 style={{ fontFamily: HEAD, color: COLORS.ink }} className="font-bold text-sm mb-1.5">{title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <h2 style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-2xl font-extrabold text-center mb-10">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <div key={i} className="text-center">
              <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-2xl font-extrabold text-white mb-3" style={{ background: COLORS.primary, border: HARD_BORDER, fontFamily: HEAD }}>{m.initial}</div>
              <h4 style={{ fontFamily: HEAD, color: COLORS.ink }} className="font-bold text-sm">{m.name}</h4>
              <p className="text-xs text-gray-500">{m.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ============================== CONTACT PAGE ============================== */

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-3xl sm:text-4xl font-extrabold">Get in Touch</h1>
        <p className="text-gray-500 mt-2 text-sm">We'd love to hear from you — questions, feedback, or partnership ideas.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          {sent ? (
            <div className="rounded-xl p-8 text-center" style={{ background: COLORS.cream, border: HARD_BORDER }}>
              <CheckCircle2 size={36} color={COLORS.leaf} className="mx-auto mb-3" />
              <h3 style={{ fontFamily: HEAD, color: COLORS.ink }} className="font-bold text-lg">Message sent!</h3>
              <p className="text-sm text-gray-500 mt-1">Thanks {form.name}, our team will reach out to {form.email} soon.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold" style={{ color: COLORS.ink }}>Full Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full mt-1.5 px-4 py-3 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${COLORS.ink}` }} placeholder="Your name" />
              </div>
              <div>
                <label className="text-xs font-semibold" style={{ color: COLORS.ink }}>Email Address</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full mt-1.5 px-4 py-3 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${COLORS.ink}` }} placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-xs font-semibold" style={{ color: COLORS.ink }}>Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} className="w-full mt-1.5 px-4 py-3 rounded-xl text-sm outline-none resize-none" style={{ border: `1.5px solid ${COLORS.ink}` }} placeholder="How can we help?" />
              </div>
              <PrimaryButton type="submit" full>Send Message</PrimaryButton>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl h-56 flex items-center justify-center text-gray-400 text-sm" style={{ background: COLORS.sand }}>
            📍 Google Map Placeholder
          </div>
          <div className="rounded-xl p-6 space-y-4" style={{ background: COLORS.cream, border: HARD_BORDER }}>
            <div className="flex items-center gap-3 text-sm" style={{ color: COLORS.ink }}><MapPin size={16} color={COLORS.primary} /> Hazratganj, Lucknow, Uttar Pradesh 226001</div>
            <div className="flex items-center gap-3 text-sm" style={{ color: COLORS.ink }}><Phone size={16} color={COLORS.primary} /> +91 98765 43210</div>
            <div className="flex items-center gap-3 text-sm" style={{ color: COLORS.ink }}><Mail size={16} color={COLORS.primary} /> hello@foodieexpress.com</div>
            <div className="flex gap-3 pt-2">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition hover:-translate-y-0.5" style={{ background: "white", border: `1.5px solid ${COLORS.ink}` }}>
                  <Icon size={15} color={COLORS.ink} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================== AUTH PAGES ============================== */

function AuthShell({ children, title, subtitle }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16" style={{ background: `linear-gradient(180deg, ${COLORS.cream}, #FFF)` }}>
      <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10" style={{ border: HARD_BORDER, boxShadow: "8px 8px 0px #3B1F1F" }}>
        <div className="text-center mb-8">
          <span className="w-12 h-12 rounded-2xl inline-flex items-center justify-center text-xl mb-3" style={{ background: COLORS.primary, border: HARD_BORDER }}>🍔</span>
          <h1 style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-2xl font-extrabold">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        {children}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ background: COLORS.sand }} />
          <span className="text-xs text-gray-400">or continue with</span>
          <div className="flex-1 h-px" style={{ background: COLORS.sand }} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold" style={{ border: `1.5px solid ${COLORS.ink}`, color: COLORS.ink }}>
            <span className="text-base">G</span> Google
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold" style={{ border: `1.5px solid ${COLORS.ink}`, color: COLORS.ink }}>
            <Facebook size={15} /> Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

function TextField({ icon: Icon, label, type = "text", value, onChange, error, placeholder, toggle }) {
  return (
    <div className="mb-4">
      <label className="text-xs font-semibold" style={{ color: COLORS.ink }}>{label}</label>
      <div className="relative mt-1.5">
        <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none"
          style={{ border: `1px solid ${error ? "#E8551E" : COLORS.sand}` }}
        />
        {toggle}
      </div>
      {error && <p className="text-xs mt-1" style={{ color: "#E8551E" }}>{error}</p>}
    </div>
  );
}

function LoginPage({ setPage, onAuthSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (validate()) {
      setSuccess(true);
      onAuthSuccess({ email: form.email });
    }
  };

  if (success) {
    return (
      <AuthShell title="Welcome back! 👋" subtitle="You're logged in (demo only)">
        <div className="text-center py-4">
          <CheckCircle2 size={40} color={COLORS.leaf} className="mx-auto mb-3" />
          <p className="text-sm text-gray-500">Logged in as <b>{form.email}</b></p>
          <PrimaryButton onClick={() => setPage("home")} className="mt-6" full>Continue to Home</PrimaryButton>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Welcome back" subtitle="Login to order your favorite food">
      <form onSubmit={submit}>
        <TextField icon={Mail} label="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} placeholder="you@example.com" />
        <TextField
          icon={Lock} label="Password" type={showPass ? "text" : "password"} value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} placeholder="••••••••"
          toggle={<button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>}
        />
        <div className="flex items-center justify-between mb-6 text-xs">
          <label className="flex items-center gap-2" style={{ color: COLORS.ink }}>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-orange-500" /> Remember Me
          </label>
          <button type="button" className="font-semibold" style={{ color: COLORS.primary }}>Forgot Password?</button>
        </div>
        <PrimaryButton type="submit" full>Login</PrimaryButton>
      </form>
      <p className="text-center text-xs text-gray-500 mt-6">
        Don't have an account? <button onClick={() => setPage("signup")} className="font-bold" style={{ color: COLORS.primary }}>Sign Up</button>
      </p>
    </AuthShell>
  );
}

function SignupPage({ setPage, onAuthSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.confirm !== form.password) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (validate()) {
      setSuccess(true);
      onAuthSuccess({ name: form.name, email: form.email });
    }
  };

  if (success) {
    return (
      <AuthShell title="Account created! 🎉" subtitle="Welcome to Foodie Express">
        <div className="text-center py-4">
          <CheckCircle2 size={40} color={COLORS.leaf} className="mx-auto mb-3" />
          <p className="text-sm text-gray-500">Hi <b>{form.name}</b>, your account is ready (demo only).</p>
          <PrimaryButton onClick={() => setPage("login")} className="mt-6" full>Go to Login</PrimaryButton>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Create your account" subtitle="Join Foodie Express and start ordering">
      <form onSubmit={submit}>
        <TextField icon={User} label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} placeholder="Jane Doe" />
        <TextField icon={Mail} label="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} placeholder="you@example.com" />
        <TextField
          icon={Lock} label="Password" type={showPass ? "text" : "password"} value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} placeholder="••••••••"
          toggle={<button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>}
        />
        <TextField icon={Lock} label="Confirm Password" type={showPass ? "text" : "password"} value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} error={errors.confirm} placeholder="••••••••" />
        <PrimaryButton type="submit" full>Create Account</PrimaryButton>
      </form>
      <p className="text-center text-xs text-gray-500 mt-6">
        Already have an account? <button onClick={() => setPage("login")} className="font-bold" style={{ color: COLORS.primary }}>Login</button>
      </p>
    </AuthShell>
  );
}

/* ============================== LOGIN REQUIRED MODAL ============================== */

function LoginRequiredModal({ variant, onClose, onLogin, onContinueAnyway }) {
  const isCheckout = variant === "checkout";
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4" style={{ background: "rgba(59,31,31,0.55)" }} onClick={isCheckout ? undefined : onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-white rounded-2xl p-7 text-center relative" style={{ border: HARD_BORDER, boxShadow: "8px 8px 0px #3B1F1F" }}>
        {!isCheckout && (
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        )}
        <div className="w-14 h-14 rounded-xl mx-auto flex items-center justify-center mb-4" style={{ background: "#FFE3B8", border: `1.5px solid ${COLORS.ink}` }}>
          <ShieldAlert size={26} color={COLORS.primaryDark} />
        </div>
        <h3 style={{ fontFamily: HEAD, color: COLORS.ink }} className="text-lg font-semibold">
          {isCheckout ? "Login to place your order" : "Quick heads up"}
        </h3>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          {isCheckout
            ? "We just need you logged in before we can confirm and place your order — your cart is saved, this'll only take a second."
            : "You can keep browsing and adding to your cart as a guest, but you'll need to log in before your order can be placed."}
        </p>
        <div className="flex flex-col gap-2.5 mt-6">
          <PrimaryButton onClick={onLogin} full>Login to Continue</PrimaryButton>
          {isCheckout ? (
            <button onClick={onClose} className="text-sm font-semibold py-2" style={{ color: COLORS.ink }}>Cancel</button>
          ) : (
            <button onClick={onContinueAnyway} className="text-sm font-semibold py-2" style={{ color: COLORS.ink }}>Maybe later</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================== APP ROOT ============================== */

export default function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginGate, setLoginGate] = useState(null); // null | "cart" | "checkout"
  const [cartNudgeShown, setCartNudgeShown] = useState(false);

  const addToCart = (item, qty = 1) => {
    // Guests can still add items — we just give them a friendly one-time nudge
    // to log in. Logging in only becomes required later, at checkout.
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + qty } : c));
      return [...prev, { ...item, qty }];
    });

    if (!isLoggedIn && !cartNudgeShown) {
      setLoginGate("cart");
      setCartNudgeShown(true);
    } else {
      setToast(`${item.name} added to cart!`);
      setTimeout(() => setToast(null), 2000);
    }
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty } : c)));
  };

  const removeItem = (id) => setCart((prev) => prev.filter((c) => c.id !== id));
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCart([]);
    setPage("home");
  };

  const requireLoginForCheckout = () => setLoginGate("checkout");

  const pages = {
    home: <Home setPage={setPage} search={search} setSearch={setSearch} addToCart={addToCart} />,
    menu: <MenuPage search={search} setSearch={setSearch} addToCart={addToCart} />,
    cart: <CartPage cart={cart} updateQty={updateQty} removeItem={removeItem} setPage={setPage} isLoggedIn={isLoggedIn} onRequireLogin={requireLoginForCheckout} />,
    about: <AboutPage />,
    contact: <ContactPage />,
    login: <LoginPage setPage={setPage} onAuthSuccess={handleAuthSuccess} />,
    signup: <SignupPage setPage={setPage} onAuthSuccess={handleAuthSuccess} />,
  };

  return (
    <div style={{ fontFamily: BODY, background: COLORS.cream, minHeight: "100vh" }}>
      <style>{`${FONT_IMPORT} html { scroll-behavior: smooth; }`}</style>
      <Navbar page={page} setPage={setPage} cartCount={cartCount} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      {pages[page] || pages.home}
      <Footer setPage={setPage} />

      {loginGate && (
        <LoginRequiredModal
          variant={loginGate}
          onClose={() => setLoginGate(null)}
          onLogin={() => { setLoginGate(null); setPage("login"); }}
          onContinueAnyway={() => {
            setLoginGate(null);
            setToast("Added to cart — log in anytime before checkout.");
            setTimeout(() => setToast(null), 2500);
          }}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-xl flex items-center gap-2 z-50" style={{ background: COLORS.ink, fontFamily: BODY }}>
          <CheckCircle2 size={16} color={COLORS.leaf} /> {toast}
        </div>
      )}
    </div>
  );
}
