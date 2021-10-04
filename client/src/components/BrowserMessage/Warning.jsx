import { useRef, useState, useMemo, useEffect } from 'react'
import { useTransition, animated } from 'react-spring';
import "./Warning.scss"

export default function WarningMessage({ config = { tension: 125, friction: 20, precision: 0.1 }, timeout = 3000, children, }) {
  
  let id = 0;
  const refMap = useMemo(() => new WeakMap(), []);
  const cancelMap = useMemo(() => new WeakMap(), []);
  const [items, setItems] = useState([]);

  const transitions = useTransition(items, {
      from: { opacity: 0, height: 0, life: '100%' },
      keys: item => item.key,
      enter: item => async (next, cancel) => {
          cancelMap.set(item, cancel);
          await next({ opacity: 1, height: refMap.get(item).offsetHeight });
          await next({ life: '0%' });
      },
      leave: [{ opacity: 0 }, { height: 0 }],
      onRest: (result, ctrl, item) => {
          setItems(state => state.filter(i => {
              return i.key !== item.key;
          }));
      },
      config: (item, index, phase) => key => phase === 'enter' && key === 'life' ? { duration: timeout } : config,
  });

  useEffect(() => {
      children((msg) => {
          setItems(state => [...state, { key: id++, msg }]);
      });
  }, []);

  return (
    <div className="warning-container">
      {transitions(({ life, ...style }, item) =>
        (<animated.div style={style} className="warning-message">
          <div className="warning-content" ref={(ref) => ref && refMap.set(item, ref)}>
            <div className="warning-actual-message">Your Application Was Submitted!</div>
            <animated.div style={{ right: life }} className="warning-life">
              <p>{item.msg}</p>
            </animated.div>
          </div>
        </animated.div>))}
    </div>
  );
}

// How to use this in a button click:

// export default function Warning() {
//   const ref = useRef(null);

//   const handleClick = () => {
//     ref.current?.("Passed")
//   }

//   return (
//     <div>
//       <button onClick={handleClick}>TRY THIS ONE</button>
//       <WarningMessage 
//         children={(add) => {
//           ref.current = add;
//         }}/>
//     </div>
//   )
// }