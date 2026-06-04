import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

const EggTimer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const tickSound = useRef(null);
  const bellSound = useRef(null);

  // Load sounds
  useEffect(() => {
    loadSounds();
    return () => {
      if (tickSound.current) tickSound.current.unloadAsync();
      if (bellSound.current) bellSound.current.unloadAsync();
    };
  }, []);

  const loadSounds = async () => {
    try {
      const { sound: tick } = await Audio.Sound.createAsync(
        require('./assets/sounds/tick.wav')
      );
      const { sound: bell } = await Audio.Sound.createAsync(
        require('./assets/sounds/bell.wav')
      );
      tickSound.current = tick;
      bellSound.current = bell;
    } catch (error) {
      console.log('Error loading sounds:', error);
    }
  };

  // Timer countdown logic
  useEffect(() => {
    let interval;

    if (isRunning && totalSeconds > 0) {
      interval = setInterval(async () => {
        setTotalSeconds((prev) => {
          const newTotal = prev - 1;

          // Play tick sound every second
          if (tickSound.current) {
            tickSound.current.replayAsync();
          }

          // Convert to minutes and seconds
          const mins = Math.floor(newTotal / 60);
          const secs = newTotal % 60;
          setMinutes(mins);
          setSeconds(secs);

          // Timer finished
          if (newTotal === 0) {
            setIsRunning(false);
            playBellSound();
            Alert.alert('Timer Complete!', 'Your egg is ready!', [
              { text: 'OK', onPress: () => resetTimer() },
            ]);
          }

          return newTotal;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, totalSeconds]);

  const playBellSound = async () => {
    try {
      if (bellSound.current) {
        await bellSound.current.replayAsync();
      }
    } catch (error) {
      console.log('Error playing bell sound:', error);
    }
  };

  const handleStart = () => {
    if (totalSeconds > 0) {
      setIsRunning(!isRunning);
    } else {
      Alert.alert('Error', 'Please set a time first');
    }
  };

  const handleSetTime = (mins, secs) => {
    if (!isRunning) {
      const total = mins * 60 + secs;
      setMinutes(mins);
      setSeconds(secs);
      setTotalSeconds(total);
    }
  };

  const resetTimer = () => {
    setMinutes(0);
    setSeconds(0);
    setTotalSeconds(0);
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Egg Timer</Text>

      {/* Timer Display */}
      <View style={styles.timerDisplay}>
        <Text style={styles.timerText}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </Text>
      </View>

      {/* Quick Time Buttons */}
      <View style={styles.quickButtonsContainer}>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => handleSetTime(1, 0)}
          disabled={isRunning}
        >
          <Text style={styles.quickButtonText}>1 min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => handleSetTime(3, 0)}
          disabled={isRunning}
        >
          <Text style={styles.quickButtonText}>3 min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => handleSetTime(5, 0)}
          disabled={isRunning}
        >
          <Text style={styles.quickButtonText}>5 min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => handleSetTime(10, 0)}
          disabled={isRunning}
        >
          <Text style={styles.quickButtonText}>10 min</Text>
        </TouchableOpacity>
      </View>

      {/* Control Buttons */}
      <View style={styles.controlButtonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.startButton]}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>
            {isRunning ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.stopButton]}
          onPress={handleStop}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetTimer}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#d9534f',
    marginBottom: 40,
    marginTop: 20,
  },
  timerDisplay: {
    width: width - 40,
    height: 250,
    borderRadius: 150,
    backgroundColor: '#ffe6cc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  timerText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#d9534f',
  },
  quickButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  quickButton: {
    width: '22%',
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#ffd9b3',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickButtonText: {
    color: '#d9534f',
    fontWeight: '600',
    fontSize: 12,
  },
  controlButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: '#5cb85c',
  },
  stopButton: {
    backgroundColor: '#f0ad4e',
  },
  resetButton: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EggTimer;
expo start
