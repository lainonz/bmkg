import Berita from "./Berita";
import Cuaca from "./Cuaca";
import Navbar from "./Navbar";
import Peringatan from "./Peringatan";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-[#f7f7f7] h-full px-6 md:px-24 pb-14 pt-32">
        <Cuaca />
        <Berita />
        <Peringatan />
      </div>
    </>
  );
};

export default Home;
