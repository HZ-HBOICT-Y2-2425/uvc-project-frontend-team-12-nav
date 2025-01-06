// src/lib/stores/timerStore.js
import { writable, get } from 'svelte/store';
import { browser } from '$app/environment'; // SvelteKit environment variable to detect browser

function createTimerStore() {
    const { subscribe, set, update } = writable({
        showerTime: 5,
        remainingTime: 5 * 60,
        isRunning: false,
        isPaused: false,
        totalShowerTime: 0,
        hasPlayedAlarm: false,
    });

    let timer = null;
    let alarm = null; // Will initialize in the browser only

    // Initialize alarm only in the browser
    function initializeAlarm() {
        if (!browser) return; // If not in the browser, don't do anything

        alarm = new Audio('/alarm.mp3');
        alarm.preload = 'auto';
        alarm.volume = 0.7;

        alarm.addEventListener('canplaythrough', () => {
            console.log('Alarm audio is ready to play.');
        });

        alarm.addEventListener('error', (e) => {
            console.error('Error loading alarm audio:', e);
        });
    }

    // Format time (unchanged)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
    };

    // Start the timer
    const startTimer = () => {
        update(state => {
            if (!state.isRunning) {
                return { ...state, isRunning: true, isPaused: false };
            }
            return state;
        });

        timer = setInterval(() => {
            update(state => {
                if (state.remainingTime > 0) {
                    const newTime = state.remainingTime - 1;

                    if (newTime === 60 && !state.hasPlayedAlarm && alarm) {
                        alarm.play().then(() => {
                            console.log('Alarm played successfully.');
                        }).catch((error) => {
                            console.error('Error playing alarm sound:', error);
                        });
                        return { ...state, remainingTime: newTime, hasPlayedAlarm: true };
                    }
                    return { ...state, remainingTime: newTime };
                } else {
                    clearInterval(timer);
                    timer = null;
                    alert("Shower time's up!");
                    return {
                        ...state,
                        isRunning: false,
                        totalShowerTime: state.totalShowerTime + state.showerTime * 60,
                        remainingTime: state.showerTime * 60,
                        hasPlayedAlarm: false,
                    };
                }
            });
        }, 1000);
    };

    // Pause the timer
    const pauseTimer = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
            update(state => ({
                ...state,
                isRunning: false,
                isPaused: true
            }));
            console.log('Timer paused.');
        }
    };

    // Resume the timer
    const resumeTimer = () => {
        if (!timer) {
            update(state => ({
                ...state,
                isRunning: true,
                isPaused: false
            }));
            startTimer();
        }
    };

    // Update shower time
    const updateShowerTime = (newTime) => {
        update(state => ({
            ...state,
            showerTime: newTime,
            remainingTime: newTime * 60,
            hasPlayedAlarm: false,
        }));
        console.log(`Timer updated: ${formatTime(newTime * 60)}`);
    };

    // End the timer and log usage
    const endTimer = async () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        const state = get(timerStore);
        const timeSpent = state.showerTime * 60 - state.remainingTime;
        update(state => ({
            ...state,
            isRunning: false,
            isPaused: false,
            totalShowerTime: state.totalShowerTime + timeSpent,
            remainingTime: state.showerTime * 60,
            hasPlayedAlarm: false,
        }));
        console.log(`Timer ended. Time spent: ${formatTime(timeSpent)}`);

        try {
            const response = await fetch('http://localhost:3011/api/water-usage/shower', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 1, // Replace with actual userId
                    duration: timeSpent / 60,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Shower usage logged:', data);
                alert('Shower usage logged successfully!');
            } else {
                console.error('Error logging shower usage:', data);
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error occurred while logging shower usage.');
        }
    };

    const resetTimer = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        set({
            showerTime: 5,
            remainingTime: 5 * 60,
            isRunning: false,
            isPaused: false,
            totalShowerTime: 0,
            hasPlayedAlarm: false,
        });
    };

    const destroy = () => {
        if (timer) {
            clearInterval(timer);
        }
        if (alarm) {
            alarm.pause();
            alarm.currentTime = 0;
        }
    };

    return {
        subscribe,
        startTimer,
        pauseTimer,
        resumeTimer,
        updateShowerTime,
        endTimer,
        resetTimer,
        destroy,
        formatTime,
        initializeAlarm
    };
}

export const timerStore = createTimerStore();
