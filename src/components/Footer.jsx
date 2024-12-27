import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Shivsundar Wakle. All Rights Reserved.
        </p>
        <p className="text-xs mt-2">
          Built with 💻 and ❤️ using React and Redux.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
