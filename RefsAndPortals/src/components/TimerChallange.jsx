import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallange({title, targetTime}) {
    const [timerExpired, setTimerExpired] = useState(false);
    //const [timerStarted, setTimerStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000);

    const timer = useRef();
    const dialog = useRef();
    const timerIsActive = timeRemaining > 0 && timeRemaining <= targetTime*1000;

    if(timeRemaining<=0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime*1000);
    }

    function handleStart(){
        timer.current = setInterval(()=>{
            setTimeRemaining((time) => time - 10)
        }, 10)
    }

    function handleStop(){
        dialog.current.open()
        clearInterval(timer.current)
       
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime = {timeRemaining} onReset={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                {timerExpired && <p>You lost</p>}
                <p className="challenge-time">
                    {targetTime} seconds
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop':'Start'}
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'The timer is running' : 'The timer is stopped'}
                </p>
            </section>
        </>
    );
}