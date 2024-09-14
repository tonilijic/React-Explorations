import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

interface CardProps {
  imageSrc: string;
  alt: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, alt }) => (
  <div className="card relative size-56 sm:size-52 rounded-lg overflow-hidden shadow-lg  right-0 outline outline-2 outline-white dark:outline-toni-label-dark/40">
    <Image src={imageSrc} alt={alt} layout="fill" objectFit="cover" />
  </div>
);

const initialCards = [
  {
    id: 1,
    imageSrc: "/assets/images/cycling.jpg",
    alt: "",
    title: "Cycling",
    description: (
      <>
        Started wearing tight jerseys, lost few kilos, and made some{" "}
        <Link
          href="https://www.strava.com/"
          className=" hover:text-toni-accent-light dark:hover:text-toni-accent-dark  text-toni-text-light dark:text-toni-text-dark underline underline-offset-4 decoration-1 decoration-toni-label-light dark:decoration-toni-label-dark transition-colors duration-400 ease-in-out hover:decoration-toni-accent-light dark:hover:decoration-toni-accent-dark"
        >
          Strava
        </Link>{" "}
        friends along the way.
      </>
    ),
  },
  {
    id: 2,
    imageSrc: "/assets/images/tcg.JPG",
    alt: "",
    title: "TCG",
    description:
      "Passionately collecting Yu-Gi-Oh cards. Especially ultimate rares from GX and 5Ds era.",
  },
  {
    id: 3,
    imageSrc: "/assets/images/hiking.JPG",
    alt: "",
    title: "Hiking",
    description:
      "'Wandern' as Swiss say, is my favorite summer activity. Especially if there's a mountain lake on top.",
  },
  {
    id: 4,
    imageSrc: "/assets/images/coding.jpg",
    alt: "",
    title: "Coding",
    description:
      "I pretend that I know how to code. Love experimenting with SwiftUI and React in my free time.",
  },
  {
    id: 5,
    imageSrc: "/assets/images/guitar.jpg",
    alt: "",
    title: "Guitar",
    description:
      "Parents didn't let me play drumms so I picked up guitar. Still dreaming of joining a metal band.",
  },
  {
    id: 6,
    imageSrc: "/assets/images/illustration.jpg",
    alt: "",
    title: "Drawing",
    description: (
      <>
        Like many, I started drawing as a kid, but haven’t stopped. I used to
        post my work on{" "}
        <Link
          href="https://www.youtube.com/@tonilijic"
          className=" hover:text-toni-accent-light dark:hover:text-toni-accent-dark  text-toni-text-light dark:text-toni-text-dark underline underline-offset-4 decoration-1 decoration-toni-label-light dark:decoration-toni-label-dark transition-colors duration-400 ease-in-out hover:decoration-toni-accent-light dark:hover:decoration-toni-accent-dark"
        >
          Youtube
        </Link>{" "}
        .
      </>
    ),
  },
].sort((a, b) => b.id - a.id);

// Move the card with id=1 to the front of the array
const cardWithIdOne = initialCards.find((card) => card.id === 1);
if (cardWithIdOne) {
  initialCards.splice(initialCards.indexOf(cardWithIdOne), 1);
  initialCards.unshift(cardWithIdOne);
}

export default function StackedCards() {
  const [cards, setCards] = useState(initialCards);
  const [isAnimating, setIsAnimating] = useState(false);
  const [movingCardId, setMovingCardId] = useState<number | null>(null);
  const [direction, setDirection] = useState<"putFront" | "putBehind" | null>(
    null
  );
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);

  const moveCard = (moveDirection: "putFront" | "putBehind") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(moveDirection);

    setCards((prevCards) => {
      const newCards = [...prevCards];

      if (moveDirection === "putBehind") {
        const [firstCard] = newCards.splice(0, 1);
        setMovingCardId(firstCard.id);
        return [...newCards, firstCard];
      } else {
        const lastCard = newCards.pop();
        if (lastCard) {
          setMovingCardId(lastCard.id);
          return [lastCard, ...newCards];
        }
        return prevCards;
      }
    });
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setMovingCardId(null);
        setDirection(null);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-16 space-y-20 sm:space-y-0  mt-24 sm:mt-20 mb-10 ">
      {/* CARDS */}
      <div ref={containerRef} className="relative size-56 sm:mb-4 mx-auto">
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="absolute top-0 left-0 right-0 bottom-0 m-auto"
              style={{
                zIndex:
                  movingCardId === card.id
                    ? direction === "putBehind"
                      ? cards.length + 1
                      : -1
                    : cards.length - index,
              }}
              animate={{
                rotate: [
                  0,
                  isInView
                    ? Math.sin(index * 1.5) * 10 + Math.cos(index * 0.7) * 10
                    : 0,
                ],
                x:
                  movingCardId === card.id
                    ? direction === "putBehind"
                      ? index === 0
                        ? 255
                        : -255
                      : index === 0
                        ? -255
                        : 255
                    : 0,
              }}
              transition={{
                rotate: {
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  delay: movingCardId === card.id ? 0.3 : isInView ? 0.2 : 0,
                  duration: 0.4,
                },
                x: {
                  type: "spring",
                  stiffness: 170,
                  damping: 17,
                  duration: 0.4,
                },
              }}
            >
              <Card imageSrc={card.imageSrc} alt={card.alt} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-col w-80 sm:w-64">
        <div className="flex flex-col items-center md:items-start  space-y-6 sm:space-y-4">
          <div className="text-sm text-toni-text-light/60 dark:text-toni-text-dark/60">
            {cards.length > 0 ? `${cards[0].id}/${initialCards.length}` : "0/0"}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={cards[0].id}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={textVariants}
              transition={{ duration: 0.2 }}
              className=" h-32 sm:h-40 text-center md:text-left"
            >
              <h2 className="font-semibold mb-2">{cards[0].title}</h2>
              <p className="text-toni-text-light/60 dark:text-toni-text-dark/60 text-pretty">
                {cards[0].description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center sm:justify-start space-x-24 sm:space-x-12">
            <button
              onClick={() => moveCard("putBehind")}
              className="p-2 bg-toni-label-light/20 dark:bg-toni-label-dark/20 rounded-full transition-colors ease duration-200 focus:outline-none hover:bg-white dark:hover:bg-toni-accent-dark/20 hover:text-toni-accent-light dark:hover:text-toni-accent-dark"
              disabled={isAnimating}
            >
              <IoIosArrowBack size={20} />
            </button>
            <button
              onClick={() => moveCard("putFront")}
              className="p-2 bg-toni-label-light/20 dark:bg-toni-label-dark/20 rounded-full transition-colors ease duration-200 focus:outline-none hover:bg-white dark:hover:bg-toni-accent-dark/20 hover:text-toni-accent-light dark:hover:text-toni-accent-dark"
              disabled={isAnimating}
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
