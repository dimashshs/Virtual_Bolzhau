"use client";

const Footer = () => (
  <footer className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-6">
    <div className="container mx-auto text-center">

      {/* Текстовые данные */}
      <p className="text-xs">
        Мекенжай: <a href="map">Астана, просп. Мәңгілік Ел, C2.4</a>
      </p>
      <p className="text-xs mt-1">
        © 2024 <b>V-Lab.</b> Барлық құқықтар қорғалған.
      </p>

      {/* Үстіне қайту */}
      <a href="#top" className="text-sm hover:text-white block mt-4">
        ↑ Жоғары
      </a>
    </div>
  </footer>
);

export default Footer;
