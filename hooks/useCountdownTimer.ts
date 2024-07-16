import { useState, useEffect } from 'react';

export const useCountdownTimer = ({
  initialMinute = 0,
  initialSeconds = 0,
  start = false,
}: {
  initialMinute: number;
  initialSeconds: number;
  start: boolean;
}) => {
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (start)
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return { minutes, seconds };
};
