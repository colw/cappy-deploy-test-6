/* 
 Implementation by Dan Abramov
 https://overreacted.io/making-setinterval-declarative-with-react-hooks

 With one addition: Execute callback when initialised.
*/

import { useEffect, useRef } from "react";

function useIntervalWithInitial(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    tick();
    let id = window.setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export { useIntervalWithInitial };
