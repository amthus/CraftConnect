# THUS ARTISAN Marketplace

Professional digital gallery dedicated to the promotion and international exportation of Beninese artisan excellence.

## Project Overview

THUS ARTISAN Marketplace is a high-end digital platform that connects master artisans from Bénin with international collectors. The application focuses on three core pillars: authenticity, transparency, and logistical efficiency. Each product listed is more than an object; it is a piece of cultural heritage accompanied by a digital certificate of authenticity.

## Key Features

### ✨ AI Concierge (Conciergerie Inteligente)
A next-generation support experience powered by **Google Gemini AI**. Our virtual concierge is an expert on Beninese history and craftsmanship, helping collectors:
- Understand the technicalities of specific crafts (Kanvô weaving, bronze casting).
- Inquire about bespoke (Sur Mesure) creation possibilities.
- Navigate the grouped logistical export system.
- Authenticate pieces and learn about their cultural origins.

### 🏺 Immersive Marketplace
A curated gallery featuring rare artisan creations. Users can explore categories such as ceramics, textiles, and sculptures, each presented with high-definition visuals, macro-textural visualizers, and contextual storytelling.

### 🎥 Soul of the Object
A unique immersive feature that provides a glimpse into the artisan's workshop through video narratives, allowing collectors to witness the "geste" and ancestral techniques behind every piece.

### 📜 Digital Authenticity & History
Every acquisition is secured with a digital certificate of authenticity. The platform also features a rich **History Section** detailing the kings of Dahomey and the evolution of Beninese art forms like the royal cloth.

### 🚢 Optimized Logistics
A specialized logistics module manages grouped exports to Europe and the USA. This system reduces environmental impact and costs for the collectors. A real-time tracker allows users to see the filling status of the next export container.

## Technical Architecture

### Frontend
- **React 19** with **TypeScript** for robust typing.
- **Vite** for optimized build cycles.
- **Framer Motion** for sophisticated parallax effects and glassmorphism UI transitions.

### Styling
- **Tailwind CSS** using a bespoke "Modern African Luxury" design system.
- Responsive design optimized for **Mobile & Tablet** (Desktop-first precision with fluid mobile adaptations).

### AI Integration
- **Google GenAI SDK (@google/genai)** integrating the **Gemini 3 Flash** model.
- Custom state-managed chat interface with context preservation.

## Installation and Development

To run the project locally:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Credits

This platform is a tribute to the master artisans of Bénin—from Abomey to Ouidah and Porto-Novo—whose skill and dedication preserve the cultural soul of the nation.
