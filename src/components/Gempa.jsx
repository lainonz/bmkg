import { Link } from "react-router-dom";
import DataGempa from "./DataGempa";

const Gempa = () => {
  return (
    <>
      <section className="max-w-xl mx-auto">
        <header className="shadow-md text-center text-2xl fixed top-0 right-0 left-0 pt-3 pb-3 text-white bg-blue-500">
          <h1>Data Gempa di Indonesia</h1>
        </header>

        <section className="rounded-md mt-4 py-1 pt-10 px-2 md:px-0">
          <h1 className="bg-red-500 px-4 mt-5 text-center text-white text-2xl">
            UNDER CONSTRUCTION
          </h1>
          <Link to="/" className="text-center block text-blue-500 underline">
            Kembali
          </Link>
          <DataGempa />
        </section>
      </section>
    </>
  );
};

export default Gempa;
