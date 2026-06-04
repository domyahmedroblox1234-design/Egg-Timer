# Egg Timer Mobile App

A beautiful, functional egg timer mobile application built with React Native and Expo.

## Features

✨ **Sound Effects**
- 🔊 Tick-tock sound plays every second
- 🔔 Bell sound plays when timer completes

⏱️ **Timer Functions**
- Quick preset buttons (1, 3, 5, 10 minutes)
- Start/Pause functionality
- Stop button
- Reset to clear timer
- Large, easy-to-read display

🎨 **User Interface**
- Clean, egg-themed design
- Smooth animations
- Touch-friendly buttons
- Works on iOS and Android

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/egg-timer.git
cd egg-timer
```

2. Install dependencies:
```bash
npm install
```

3. Add sound files to your project:
   - Create directories: `assets/sounds/`
   - Add `tick.wav` (short tick sound, ~100-200ms)
   - Add `bell.wav` (bell chime sound)

4. Start the app:
```bash
expo start
```

5. Run on your device:
   - **iOS**: Press `i` to open in iOS Simulator
   - **Android**: Press `a` to open in Android Emulator
   - **Mobile**: Scan QR code with Expo app on your device

## How to Use

1. **Set Timer**: Tap one of the quick preset buttons (1, 3, 5, or 10 minutes)
2. **Start**: Tap the "Start" button to begin the countdown
3. **Pause**: Tap "Start" again to pause the timer
4. **Stop**: Tap "Stop" to halt the timer
5. **Reset**: Tap "Reset" to clear the timer back to 00:00

When the timer reaches zero, you'll hear a bell sound and see a completion alert!

## Project Structure

```
egg-timer/
├── App.js                 # Main timer component
├── package.json          # Dependencies and scripts
├── app.json              # Expo configuration
├── assets/
│   └── sounds/
│       ├── tick.wav      # Tick-tock sound
│       └── bell.wav      # Bell completion sound
└── README.md             # This file
```

## Technologies Used

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform for React Native
- **Expo AV**: Audio playback library

## Sound Files

You'll need to provide your own sound files or generate them:

### Quick Sound Generation (Free Options)
- Use [Zapsplat](https://www.zapsplat.com/)
- Use [Freesound](https://freesound.org/)
- Use [SoundBible](https://soundbible.com/)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Feel free to fork this repository and submit pull requests for any improvements!

## Support

If you encounter any issues:
1. Check that all dependencies are installed: `npm install`
2. Ensure sound files are in the correct directory
3. Try clearing Expo cache: `expo start -c`
4. Check the Expo documentation: https://docs.expo.dev/
