# 🔄 FoodLoop — Smart Surplus Food Rescue & Sharing Platform

> *"Rescue the surplus. Break the waste cycle."*

FoodLoop is a mobile-first web and native Android platform connecting surplus food donors (hotels, banquet halls, corporate canteens, bakeries) with nearby recipients, charities, and community members in real time.

---

## 🌟 Key Features

### 1. 🍽 Recipient & Neighbour View
- **Smart Rescue Match Algorithm**: Listings prioritized dynamically by urgency and distance score: `(1 / hours_remaining) * (1 / distance_km)`.
- **Live Urgency Timers**: Color-coded countdown badges:
  - 🟢 **Normal** (> 2h left)
  - 🟡 **High** (1h–2h left)
  - 🔴 **Urgent** (< 1h left with pulse animation)
- **Interactive Claim Flow**: Claim portions with live stock decrements.
- **QR Code Pickup Verification**: Dynamic QR code generation for instant hand-off verification at pickup.
- **Radius & Category Filters**: Filter by Cooked Meals, Baked Goods, Packaged Foods, and customizable distance radius (1.5 km – 10 km).

### 2. 🏢 Donor View (Events, Hotels & Canteens)
- **Surplus Food Publisher**: Instant listing creation with photo presets, pickup deadlines, dietary tags, and temperature safety notes.
- **Active Listings Manager**: Track claimed vs remaining servings in real time.
- **Built-in QR Scanner Simulator**: Verify recipient QR codes on-site and mark claims as collected.

### 3. 🔐 Authentication & Session Persistence
- Dual-role authentication (Recipient vs Donor).
- Local storage state persistence across refreshes.
- Preloaded demo accounts for instant testing.

---

## 📱 Cross-Platform Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Mobile Runtime**: Capacitor 8 (Android Native Wrapper with Java 24 & Gradle 8.14.3)
- **QR Engine**: `qrcode.react` (SVG QR generation & simulation)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/hmumarcse/foodloop.git

# Navigate into the project folder
cd foodloop

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

### Production Build

```bash
npm run build
```

---

## 🤖 Android Native App Build (Capacitor)

```bash
# Sync web build to Android assets
npm run build
npx cap sync android

# Open in Android Studio
npx cap open android
```

In **Android Studio**, select **Build > Build Bundle(s) / APK(s) > Build APK(s)** to generate the `app-debug.apk`.

---

## 🧪 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Recipient** | `recipient@foodloop.app` | `rescue123` |
| **Donor** | `donor@foodloop.app` | `surplus123` |
| **Chef / Donor** | `chef@rosewood.com` | `kitchen123` |
| **Community Recipient** | `sarah@community.org` | `community123` |

---

## 📄 License
MIT License
