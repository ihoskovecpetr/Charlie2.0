import React, { useState, useEffect, useMemo } from "react";

export function useLogicPlusMinusValue(idPlus, idMinus, startValue ) {
  const [value, setValue] = useState(startValue ? startValue : 10);


  let timerPlus
  let timerMinus

  const plusClickValue = () => {
    setValue(prev => (prev + 1 ));
  };

  const holdingPlus = () => {
    timerPlus = setInterval(function() {
      setValue(prev => (prev + 1));
    }, 100);
  }

  const resetTimerPlus = () => {
    clearTimeout(timerPlus)
  }

  const minusClickValue = () => {
    setValue(prev => (prev - 1));
  };

  const holdingMinus = () => {
    timerMinus = setInterval(function() {
      setValue(prev => (prev - 1));
    }, 100);
  }

  const resetTimerMinus = () => {
    clearTimeout(timerMinus)
  }

  useEffect(() => {
    document.getElementById(idPlus).addEventListener('click', plusClickValue);
    document.getElementById(idPlus).addEventListener('mousedown', holdingPlus);
    document.getElementById(idPlus).addEventListener('touchstart', holdingPlus);

    document.getElementById(idMinus).addEventListener('click', minusClickValue);
    document.getElementById(idMinus).addEventListener('mousedown', holdingMinus);
    document.getElementById(idMinus).addEventListener('touchstart', holdingMinus);

    document.getElementById(idPlus).addEventListener('mouseup', resetTimerPlus);
    document.getElementById(idPlus).addEventListener('touchend', resetTimerPlus);

    document.getElementById(idMinus).addEventListener('mouseup', resetTimerMinus);
    document.getElementById(idMinus).addEventListener('touchend', resetTimerMinus);

    return () =>{
    } 
  }, []);

  // const xs_size_memo = useMemo(() => {
  //   return xs_size;
  // }, [xs_size]);

  let Package = { value, plusClickValue, minusClickValue }

  return Package;
}
