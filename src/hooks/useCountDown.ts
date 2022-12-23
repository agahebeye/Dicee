import React from "react";

export type Status = 'RUNNING' | 'PAUSED' | 'STOPPED';

export type Config = {
    initialStatus: Status;
    initialTime: number;
    onTimeOver?: () => void;
    onTimeUpdate?: (time: number) => void;
};

export type ReturnValue = {
    pause: () => void;
    reset: () => void;
    start: () => void;
    status: Status;
    time: number;
};

export interface State {
    status: Status;
    time: number;
}

export function useCountDown({
    initialStatus = 'STOPPED',
    initialTime = 0,
    onTimeOver,
}: Partial<Config>): ReturnValue {
    const interval = 1000; // 1s
    const [counter, setCounter] = React.useState({
        status: initialStatus,
        time: initialTime
    });

    const pause = () => {
        setCounter(counter => ({ ...counter, status: 'PAUSED' }))
    }

    const reset = () => {
        setCounter({
            status: 'STOPPED',
            time: initialTime
        })
    }

    const start = () => {
        setCounter((counter) => ({
            status: 'RUNNING',
            time: counter.status === 'STOPPED' ? initialTime : counter.time
        }))
    }

    React.useEffect(() => {
        if (counter.status !== 'STOPPED' && counter.time === 0) {
            setCounter(counter => ({ ...counter, status: 'STOPPED' }))

            if (typeof onTimeOver === 'function') {
                onTimeOver()
            }
        }
    }, [onTimeOver, counter.time, counter.status])

    React.useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (counter.status === 'RUNNING') {
            intervalId = setInterval(() => {
                setCounter(counter => ({ ...counter, time: counter.time - 1 }))
            }, interval);
        } else if (intervalId) {
            clearInterval(intervalId);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [counter.status, counter.time])

    return {
        pause, reset, start,
        status: counter.status,
        time: counter.time
    };
}