<<<<<<< HEAD
import { useEffect, useState } from 'react'

export const useWindowWidth = () => {
  const [width, setWidth] = useState(() => document.body.clientWidth)

  useEffect(() => {
    const handleResize = () => setWidth(document.body.clientWidth)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { width }
}
=======
import { useEffect, useState } from "react";

export const useWindowWidth = () => {
  const [width, setWidth] = useState(() => document.body.clientWidth);

  useEffect(() => {
    const handleResize = () => setWidth(document.body.clientWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width };
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
