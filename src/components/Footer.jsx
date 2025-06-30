import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300 pb-2 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-6">
        {/* Brand and Tagline */}
        <div>
          <h1 className="text-xl font-bold text-primary">Skitty</h1>
          <p className="text-sm mt-1 text-base-content/60">
            Helping you connect and grow effortlessly.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <Link to={"/about"}>
              <h2 className="font-semibold mb-2">About</h2>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-base-300 text-center text-xs py-4 px-4 text-accent">
        © {new Date().getFullYear()} Skitty. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
