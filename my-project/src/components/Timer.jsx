import { useEffect, useState } from 'react';
export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-sm text-gray-600 py-2">
      Time Spent on this site: {seconds} seconds
    </div>
  );
}