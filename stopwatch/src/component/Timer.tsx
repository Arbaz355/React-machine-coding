import { FunctionComponent, useState, useRef, useEffect } from 'react'
import "./timer.css";

/*
1) 60 seconds start
2) start, pause, reset -> initial value
*/

type Props = {
    startingTime: number;
}

const Timer: FunctionComponent<Props> = (props) => {
    const { startingTime = 60 } = props;
    const [timer, setTimer] = useState<number>(startingTime);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)

    // ref for keeping the interval track
    const intervalRef = useRef<number | null | undefined>(null);

    const handleStart = () => {
        if (!isTimerRunning) {
            setIsTimerRunning(true)
            intervalRef.current = setInterval(() => {
                setTimer((prev: number) => {
                    if (prev !== 0) {
                        return prev - 1;
                    }

                    return prev;
                })
            }, 1000)
        }
    }

    const handlePause = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        setIsTimerRunning(false)
    }

    const handleReset = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            setTimer(startingTime);
        }
        setIsTimerRunning(false)
    }

    // remove the time when component unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    return (
        <div className="timer-container">
            <div className="center">
                <h1 className="counter">{timer}</h1>
                <div className="btn-container">
                    <button onClick={handleStart} disabled={isTimerRunning}>Start Timer</button>
                    <button onClick={handlePause} disabled={!isTimerRunning}>Pause</button>
                    <button onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    )
}

export default Timer