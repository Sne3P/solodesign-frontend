/* cSpell:disable */ // disable code-spell checker for French labels
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const MENU_ITEMS = [
  { text: "Accueil", path: "/" },
  { text: "Projets", path: "/projects" },
  { text: "Services", path: "/services" },
  { text: "À Propos", path: "/about-us" },
  { text: "Contact", path: "/contact" },
];

// Hook pour obtenir la position du bouton
function useClientRect(ref: React.RefObject<HTMLElement>) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useLayoutEffect(() => {
    const update = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect)
        setPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [ref]);
  return pos;
}

const MenuToggleButton: React.FC<{
  open: boolean;
  onClick: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}> = ({ open, onClick, buttonRef }) => (
  <motion.div
    className="fixed top-1/2 right-0 -translate-y-1/2 z-50"
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
  >
    <motion.button
      ref={buttonRef}
      className="bg-white text-black w-12 h-24 sm:w-16 sm:h-32 rounded-l-full flex items-center justify-start pl-2 sm:pl-4 group z-[10000]"
      onClick={onClick}
      aria-expanded={open}
      aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div animate={{ x: open ? -5 : 0 }}>
        <motion.div whileHover={{ rotate: 90 }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </motion.div>
    </motion.button>
    <div
      className="absolute top-0 right-0 w-12 h-24 sm:w-16 sm:h-32 bg-white rounded-l-full"
      style={{ transform: "translateX(70%)" }}
    />
  </motion.div>
);

const MenuNav: React.FC<{
  items: typeof MENU_ITEMS;
  onNavigate: (path: string) => void;
}> = ({ items, onNavigate }) => (
  <nav className="text-center">
    {items.map((item, i) => (
      <motion.div
        key={item.text}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold my-4 sm:my-6 group"
        initial={{ opacity: 0, y: 50, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{
          delay: 0.1 * i,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
      >
        <motion.a
          href={item.path}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.path);
          }}
          className="inline-block relative"
          whileHover={{ scale: 1.1, x: 20 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.text}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-black"
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.2 }}
          />
        </motion.a>
      </motion.div>
    ))}
  </nav>
);

const MenuButton: React.FC<{ initialMenuOpen?: boolean }> = ({
  initialMenuOpen = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(initialMenuOpen);
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const buttonPos = useClientRect(buttonRef);

  const handleNav = useCallback(
    (path: string) => {
      setMenuOpen(false);
      setTimeout(() => {
        if (path.startsWith("/#")) {
          const id = path.slice(2);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
          else window.location.href = path;
        } else {
          if (typeof window !== "undefined" && router) {
            router.push(path);
          } else {
            window.location.href = path;
          }
        }
      }, 0);
    },
    [router]
  );

  // Calcul du rayon du cercle pour l'animation
  const circleRadius = useMemo(
    () => Math.hypot(window.innerWidth, window.innerHeight) * 1.5,
    []
  );

  return (
    <>
      <MenuToggleButton
        open={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        buttonRef={buttonRef}
      />
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-white text-black z-40 flex items-center justify-center"
            initial={{
              clipPath: `circle(0px at ${buttonPos.x}px ${buttonPos.y}px)`,
            }}
            animate={{
              clipPath: `circle(${circleRadius}px at ${buttonPos.x}px ${buttonPos.y}px)`,
            }}
            exit={{
              clipPath: `circle(0px at ${buttonPos.x}px ${buttonPos.y}px)`,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <MenuNav items={MENU_ITEMS} onNavigate={handleNav} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuButton;
