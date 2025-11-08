import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Introduction", path: "/introduction" },
  { name: "Objectives", path: "/objectives" },
  { name: "Methodology", path: "/methodology" },
  { name: "Climatic Zones", path: "/climatic-zones" },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-white/50 backdrop-blur-lg p-2 rounded-full shadow-md border">
      <ul className="flex items-center gap-2">
        {navLinks.map((link) => (
          <li key={link.path} className="relative">
            <NavLink
              to={link.path}
              className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {link.name}
            </NavLink>
            {location.pathname === link.path && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;