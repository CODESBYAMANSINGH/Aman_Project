import { NavLink } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Introduction", path: "/introduction" },
  { name: "Objectives", path: "/objectives" },
  { name: "Methodology", path: "/methodology" },
  { name: "Climatic Zones", path: "/climatic-zones" },
];

const Navbar = () => {
  return (
    <nav className="sticky top-5 z-50 bg-white/5 backdrop-blur-xl p-5 rounded-2xl mb-8 shadow-lg border border-white/10 animate-fade-in-up">
      <ul className="flex justify-center items-center gap-5 flex-wrap">
        {navLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `text-[#a8b3ff] font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-white/20 hover:text-white hover:-translate-y-0.5 ${
                  isActive ? "bg-white/20 text-white" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;