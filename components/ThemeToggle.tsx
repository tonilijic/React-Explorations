import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      <div className="size-[44px] flex items-center justify-center bg-toni-label-light bg-opacity-10 dark:bg-toni-label-dark dark:bg-opacity-20 rounded-full overflow-hidden">
        <motion.button
          aria-label="toggle theme"
          className="flex items-center justify-center p-2 rounded-full hover:text-toni-accent-light dark:hover:text-toni-accent-dark transition-colors duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={resolvedTheme}
              initial={{ y: 4, filter: "blur(1px)", opacity: 0 }}
              animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
              exit={{ y: 4, filter: "blur(1px)", opacity: 0 }}
              transition={{ type: "easeOut", duration: 0.2 }}
            >
              {resolvedTheme === "dark" ? (
                <FiSun size={20} aria-hidden="true" />
              ) : (
                <FiMoon size={20} aria-hidden="true" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
