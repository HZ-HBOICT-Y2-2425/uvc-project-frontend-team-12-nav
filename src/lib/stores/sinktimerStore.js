import { writable, get, derived } from 'svelte/store';

function createSinkStore() {
    const initialState = {
        elapsedTime: 0,
        isRunning: false,
        dayTotalTime: 0,
        userId: '1', // Placeholder, replace with actual user auth logic if needed
    };

    const { subscribe, update } = writable(initialState);
    let timer = null;

    // Since we're not using localStorage anymore, we don't need loadFromStorage or saveElapsedTime.

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
    };

    const startTimer = () => {
        const current = get({ subscribe });
        if (!current.isRunning) {
            update(state => ({ ...state, isRunning: true }));
            timer = setInterval(() => {
                update(state => {
                    const newElapsed = state.elapsedTime + 1;
                    return { ...state, elapsedTime: newElapsed };
                });
            }, 1000);
        }
    };

    const pauseTimer = () => {
        if (timer) clearInterval(timer);
        timer = null;
        update(state => ({ ...state, isRunning: false }));
    };

    const resetTimer = () => {
        if (timer) clearInterval(timer);
        timer = null;
        update(state => ({ ...state, isRunning: false, elapsedTime: 0 }));
    };

    const logUsage = async () => {
        const current = get({ subscribe });
        const durationMinutes = current.elapsedTime / 60;
        try {
            const response = await fetch('http://localhost:3011/waterlog/sink', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: current.userId,
                    duration: durationMinutes,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error logging sink usage:', errorData);
                alert('Failed to log sink usage.');
                return false;
            } else {
                console.log('Sink usage logged successfully.');
                return true;
            }
        } catch (error) {
            console.error('Error logging sink usage:', error);
            alert('Failed to log sink usage due to network error.');
            return false;
        }
    };

    const endTimer = async () => {
        const success = await logUsage();
        if (success) {
            resetTimer();
        
        }
    };

    const waterHeight = derived(subscribe, ($store) => {
        return Math.min(($store.elapsedTime / 300) * 100, 100);
    });

    return {
        subscribe,
        startTimer,
        pauseTimer,
        resetTimer,
        logUsage,
        endTimer,
        formatTime,
        waterHeight
    };
}

export const sinkStore = createSinkStore();
export const waterHeight = derived(sinkStore, $sinkStore => {
    return Math.min(($sinkStore.elapsedTime / 300) * 100, 100);
});
