"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Popover } from "@headlessui/react";

export default function NavBar() {
  return (
    <div className="">
      <SlideTabs />
    </div>
  );
}

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [activeTab, setActiveTab] = useState("");
  const pathname = usePathname();
  const activeTabRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setActiveTab(pathname);
    if (activeTabRef.current) {
      const { width } = activeTabRef.current.getBoundingClientRect();
      setPosition({
        width,
        left: activeTabRef.current.offsetLeft,
        opacity: 1,
      });
    }
  }, [pathname]);

  return (
    <ul className="relative mx-auto flex w-fit rounded-full bg-toni-label-light/10 dark:bg-toni-label-dark/20 p-1 gap-1">
      <Link href="/">
        <Tab
          setPosition={setPosition}
          isActive={activeTab === "/"}
          ref={activeTab === "/" ? activeTabRef : null}
        >
          Home
        </Tab>
      </Link>
      <Link href="/blog">
        <Tab
          setPosition={setPosition}
          isActive={activeTab === "/blog"}
          ref={activeTab === "/blog" ? activeTabRef : null}
        >
          Blog
        </Tab>
      </Link>

      <Link href="/about">
        <Tab
          setPosition={setPosition}
          isActive={activeTab === "/about"}
          ref={activeTab === "/about" ? activeTabRef : null}
        >
          About
        </Tab>
      </Link>

      <Cursor position={position} />
    </ul>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
  isActive: boolean;
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, setPosition, isActive }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const tabRef = useRef<HTMLLIElement>(null);

    const updatePosition = () => {
      if (tabRef.current) {
        const { width } = tabRef.current.getBoundingClientRect();
        setPosition({
          width,
          left: tabRef.current.offsetLeft,
          opacity: 1,
        });
      }
    };

    return (
      <li
        ref={tabRef}
        onMouseLeave={() => {
          setIsHovered(false);
          setPosition((prev) => ({ ...prev, opacity: 0 }));
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          updatePosition();
        }}
        className={`relative z-10 block cursor-pointer rounded-full px-3 py-1.5 text-base transition-all duration-200 ${
          isActive
            ? "text-toni-accent-light font-medium dark:text-toni-accent-dark"
            : "text-toni-text-light font-normal dark:text-toni-text-dark"
        }`}
        style={{
          fontWeight: isActive ? 500 : 400,
          transition: "font-weight 0.2s ease-in-out, color 0.2s ease-in-out",
        }}
      >
        {children}
      </li>
    );
  }
);

Tab.displayName = "Tab";

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-9 rounded-full bg-white dark:bg-toni-accent-dark/20  transition-opacity duration-200"
    />
  );
};
