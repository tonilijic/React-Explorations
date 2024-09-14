import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckbox } from "react-icons/io5";
import { IoMdSquareOutline } from "react-icons/io";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface Person {
  name: string;
  url?: string;
  met: boolean;
}

const people: Person[] = [
  { name: "Merlin Rebrovic", url: "https://merlinrebrovic.com", met: true },
  { name: "Tin Kadoic", url: "https://blackduke.com/", met: false },
  { name: "Mihael Tomic", url: "https://x.com/tomic_mihael", met: false },
  { name: "Gavin Nelson", url: "https://nelson.co", met: false },
  { name: "Matt D. Smith", url: "https://mds.is", met: false },
  { name: "Raphael Schaad", url: "https://raphaelschaad.com/", met: false },
  {
    name: "Javier Andrés Bargas-Avila",
    url: "https://www.linkedin.com/in/javierbargas/",
    met: true,
  },
  { name: "Adrian Zumbrunnen", url: "https://azumbrunnen.me", met: false },
  { name: "Oliur Rahman", url: "https://oliur.com", met: false },
  { name: "Michael Sommer", url: "https://www.michael.fm/", met: false },
  { name: "Lauren LoPrete", url: "https://x.com/laurenloprete", met: false },
  { name: "Alex Widua", url: "https://alexwidua.com/", met: false },
  { name: "Rafael Conde", url: "https://rafa.design/", met: false },
  {
    name: "Paul Stamatiou",
    url: "https://paulstamatiou.com/",
    met: false,
  },
  { name: "Jordan Singer", url: "https://x.com/jsngr", met: false },
  { name: "Nate Parrott", url: "https://nateparrott.com/", met: false },
  {
    name: "Daniel Destefanis",
    url: "https://danield.design/",
    met: false,
  },

  {
    name: "Vincent van der Meulen",
    url: "https://x.com/vincentmvdm",
    met: false,
  },
  { name: "Rasmus Andersson", url: "https://rsms.me/", met: false },
  { name: "Ryo Lu", url: "https://ryo.lu/", met: false },
  { name: "Rauno Freiberg", url: "https://rauno.me/", met: false },
  {
    name: "Klemens Strasses",
    url: "https://x.com/klemensstrasser",
    met: false,
  },
  { name: "David Hoang", url: "https://www.davidhoang.com/now", met: false },
  { name: "Adam Whitcroft", url: "https://adamwhitcroft.com/", met: false },
  { name: "Mariana Castilho", url: "https://x.com/mrncst", met: false },
  { name: "Natko Hasic", url: "https://x.com/natkohasic", met: false },
  { name: "Logan Liffick", url: "https://loganliffick.com/", met: false },
  { name: "Christian Selig", url: "https://christianselig.com/", met: false },
  { name: "Janum Trivedi", url: "https://janum.co/", met: false },
  { name: "Dino Jelusic", url: "https://dino-jelusick.com/", met: false },
  {
    name: "Petar Radojcic Bizzo",
    url: "https://www.instagram.com/bizzogram/?hl=en",
    met: false,
  },
  {
    name: "Dominik Hofer",
    url: "https://dominikhofer.me/about",
    met: false,
  },
  {
    name: "Cosmin Anghel",
    url: "https://x.com/cosmincodes",
    met: true,
  },
  {
    name: "Jessy Barret",
    url: "https://x.com/barret_jessy",
    met: true,
  },
  {
    name: "Cedric Moore",
    url: "https://x.com/cedric_design",
    met: false,
  },
  {
    name: "Nico Prananta",
    url: "https://www.nico.fyi/about",
    met: true,
  },
  {
    name: "Rogie",
    url: "https://x.com/rogie",
    met: false,
  },
  {
    name: "Vijay Verma",
    url: "https://vjy.me/",
    met: false,
  },
  {
    name: "Gal Shir",
    url: "https://galshir.com/",
    met: false,
  },
  {
    name: "Davor Bruketa",
    url: "https://www.linkedin.com/in/davorbruketa/?originalSubdomain=hr",
    met: false,
  },
  { name: "Zack Ritchie", url: "https://michaelsommer.design", met: true },
];

export default function People2Meet() {
  const sortedPeople = [...people].sort((a) => {
    return a.met ? 1 : -1;
  });

  const columns = 2;
  const itemsPerColumn = Math.ceil(sortedPeople.length / columns);

  const [showPopup, setShowPopup] = useState(false);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <>
      <div className="my-12">
        <div className="grid grid-cols-2 gap-4">
          {[...Array(columns)].map((_, columnIndex) => (
            <ul key={columnIndex} className="space-y-2">
              {sortedPeople
                .slice(
                  columnIndex * itemsPerColumn,
                  (columnIndex + 1) * itemsPerColumn
                )
                .map((person, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3 py-2 rounded-md"
                  >
                    <div onClick={handleCheckboxClick}>
                      {person.met ? (
                        <IoCheckbox
                          className="text-toni-accent-light dark:text-toni-accent-dark cursor-pointer"
                          size={22}
                        />
                      ) : (
                        <IoMdSquareOutline
                          className="text-toni-text-light dark:text-toni-text-dark opacity-60 cursor-pointer"
                          size={22}
                        />
                      )}
                    </div>
                    {person.url ? (
                      <a
                        href={person.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={` block truncate underline underline-offset-4 decoration-1 transition-colors duration-400 ease-in-out hover:text-toni-accent-light dark:hover:text-toni-accent-dark hover:decoration-toni-accent-light dark:hover:decoration-toni-accent-dark text-base hover:underline ${person.met ? "text-toni-accent-light dark:text-toni-accent-dark decoration-toni-accent-light dark:decoration-toni-accent-dark" : " text-toni-text-light dark:text-toni-text-dark  decoration-toni-label-light dark:decoration-toni-label-dark"}`}
                      >
                        {person.name}
                      </a>
                    ) : (
                      <span className="block truncate">{person.name}</span>
                    )}
                  </li>
                ))}
            </ul>
          ))}
        </div>
      </div>
      {typeof window !== "undefined" &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-8 right-8  z-50 py-4 px-4 text-sm text-toni-text-light dark:text-toni-text-dark bg-toni-bg-light dark:bg-toni-bg-dark rounded-xl shadow-lg outline outline-2 outline-white dark:outline-toni-label-dark/20"
              >
                If only it worked that way 😅
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
