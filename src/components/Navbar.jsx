import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  const [waktuIndonesia, setWaktuIndonesia] = useState("");
  const [waktuUTC, setWaktuUTC] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const waktuWIB = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      });

      const waktuUTC = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
      });

      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = now.toLocaleDateString("id-ID", options);

      setWaktuIndonesia(`${formattedDate} / ${waktuWIB} WIB`);
      setWaktuUTC(`${waktuUTC} UTC`);
    };

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-[999]">
        <div className="bg-[#111214] text-white px-8 py-2 flex justify-between text-[9px] md:text-sm">
          <p>STANDAR WAKTU INDONESIA</p>
          <div className="flex space-x-2">
            <p>{waktuIndonesia}</p>
            <p>{waktuUTC}</p>
          </div>
        </div>
        <nav className="md:py-4 py-2 px-8 shadow-lg bg-white flex justify-between items-center">
          <h1 className="text-sm md:text-lg w-[150px] md:w-full">
            Data Cuaca & Gempa di Indonesia
          </h1>
          <div className="flex items-center gap-3">
            <Link
              to="/gempa"
              className="bg-blue-500 py-2 px-4 rounded-md text-white text-sm md:text-md"
            >
              GEMPA
            </Link>
            <a href="https://github.com/lainonz" target="_blank">
              <FaGithub className="w-full h-full" size={30} />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
