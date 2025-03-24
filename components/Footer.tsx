import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-codeSecondary/80 to-codePrimary/80 text-white py-6 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-4">
        <p className="text-sm text-white/80">
          &copy; {new Date().getFullYear()} CodeJourney. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
