import { forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal({result, targetTime, remainingTime, onReset}, ref){
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const score = Math.round((1-remainingTime/(targetTime*1000))*100)
    useImperativeHandle(ref, ()=>{
        return {
            open(){
                dialog.current.showModal()
            }
        };
    })
        return createPortal(<dialog ref={dialog} className="result-modal">
            {userLost && <h2>You lost</h2>}
            {!userLost && <h2>your score {score}</h2>}
            <p>The target time was <strong>{targetTime}</strong></p>
            <p>You stopped the time with <strong>{(remainingTime/1000).toFixed(2)} seconds left</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>, 
        document.getElementById('modal')
        )
    }
)

export default ResultModal;