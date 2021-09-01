import { useReducer, useRef, useEffect } from "react";

function reducer(currentState, newState) {
  return {...currentState, ...newState}
}

function Stopwatch({handleInputChange}) {
  const [{running, lapse}, setState] = useReducer(reducer, {
    running: false,
    lapse: 0,
  })
  const intervalRef = useRef(null)

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  function handleRunClick() {
    if (running) {
      handleInputChange({"target": {"name": "time", "value": lapse}})
      clearInterval(intervalRef.current)
    } else {
      const startTime = Date.now() - lapse
      intervalRef.current = setInterval(() => {
        setState({lapse: Number.parseFloat((Date.now() - startTime) / 1000).toFixed(2)})
      }, 0)
    }
    setState({running: !running})
  }

  function handleClearClick() {
    clearInterval(intervalRef.current)
    setState({lapse: 0, running: false})
  }

  return (
    <div className="text-center">
        <p className="fs-2">
            {lapse} s
        </p>
        <div className="btn-group" role="group" aria-label="Basic example">
            <button onClick={handleRunClick} className="btn btn-outline-success">
                {running ? 'Stop' : 'Start'}
            </button>
            <button onClick={handleClearClick} className="btn btn-outline-danger">
                Clear
            </button>
        </div>
    </div>
  )
};

export default Stopwatch