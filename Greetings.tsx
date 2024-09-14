import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

const Greetings = ({ color = "" }) => {
  const greetings = useMemo(() => ["Hi,", "Bok,", "Grüezi,", "Ciao,"], []);
  const [greeting, setGreeting] = useState(
    () => greetings[Math.floor(Math.random() * greetings.length)]
  );
  const [key, setKey] = useState(0);

  const updateGreeting = useCallback(() => {
    setGreeting((prevGreeting) => {
      const currentIndex = greetings.indexOf(prevGreeting);
      const nextIndex = (currentIndex + 1) % greetings.length;
      return greetings[nextIndex];
    });
    setKey((prevKey) => prevKey + 1);
  }, [greetings]);

  useEffect(() => {
    const intervalId = setInterval(updateGreeting, 7000);
    return () => clearInterval(intervalId);
  }, [updateGreeting]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  };

  const item = {
    hidden: { y: "100%", opacity: 0 },
    show: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  };

  return (
    <div className="relative h-8 overflow-hidden mb-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
          className={`absolute top-0 left-0 text-2xl font-bold flex ${color}`}
        >
          {greeting.split("").map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              variants={item}
              transition={{
                duration: 0.3,
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Greetings), { ssr: false });
