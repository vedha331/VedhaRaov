# Birthday Surprise

An interactive birthday celebration built with React, Vite, Tailwind CSS, Framer Motion, `react-confetti`, `canvas-confetti`, and the Web Audio API.

## Run locally

1. Install [Node.js 18+](https://nodejs.org/).
2. In this project folder, install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local address shown in the terminal (normally `http://localhost:5173`).

## Build for production

```bash
npm run build
```

The optimized application is placed in `dist/`.

## Add the birthday photo

Place the birthday boy's image at `public/birthday-boy.jpg`. After the countdown and fireworks, this photo appears as a card; tapping it flips the card to reveal the birthday greeting.

## Microphone note

The cake page asks for microphone permission only after the user chooses **Light the candles**. It listens to the live sound level and extinguishes the candles after a sustained blow. For the best experience, use a browser on `localhost` or HTTPS and allow microphone access.
