import axios from "axios";
import { useEffect, useState } from "react";

const Berita = () => {
  const [berita, setBerita] = useState([]); // State untuk menyimpan berita
  const [loading, setLoading] = useState(true); // State untuk mengelola status loading
  const [error, setError] = useState(null); // State untuk mengelola error
  const [endpoints, setEndpoints] = useState([]); // State untuk menyimpan daftar endpoint
  const [selectedEndpoint, setSelectedEndpoint] = useState("tempo"); // Endpoint default adalah cnn
  const [selectedCategory, setSelectedCategory] = useState("nasional"); // Kategori default adalah terbaru
  const [categories, setCategories] = useState([]); // State untuk menyimpan kategori

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        // Ambil daftar endpoint berita
        const endpointsResponse = await axios.get(
          "https://api-berita-indonesia.vercel.app"
        );
        setEndpoints(endpointsResponse.data.endpoints); // Simpan daftar endpoint ke state

        // Ambil path untuk endpoint yang dipilih
        const selectedEndpointData = endpointsResponse.data.endpoints.find(
          (endpoint) => endpoint.name === selectedEndpoint
        );
        setCategories(selectedEndpointData.paths); // Simpan paths sebagai kategori

        // Ambil berita berdasarkan endpoint dan kategori default "terbaru"
        const categoryPath = selectedEndpointData.paths.find(
          (path) => path.name === selectedCategory
        );
        if (categoryPath) {
          const beritaResponse = await axios.get(categoryPath.path);
          if (beritaResponse.data.success && beritaResponse.data.data?.posts) {
            setBerita(beritaResponse.data.data.posts); // Simpan data posts ke dalam state
            setError(null); // Reset error jika berhasil
          } else {
            throw new Error(
              "Api berita ini mungkin error pilih penyedia berita lainnya."
            );
          }
        } else {
          throw new Error("Kategori tidak ada di penyedia berita ini.");
        }
      } catch (err) {
        setError(err.message); // Tangani error jika terjadi
        setBerita([]); // Reset berita jika terjadi error
      } finally {
        setLoading(false); // Set loading ke false setelah permintaan selesai
      }
    };

    fetchEndpoints();
  }, [selectedEndpoint, selectedCategory]); // Menjalankan fetchEndpoints ketika selectedEndpoint atau selectedCategory berubah

  const handleEndpointChange = (event) => {
    setSelectedEndpoint(event.target.value); // Update selected endpoint berdasarkan dropdown
    setSelectedCategory("terbaru"); // Reset kategori ke terbaru saat endpoint berubah
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // Update selected category berdasarkan dropdown
  };

  const getDayName = (dateString) => {
    const options = { weekday: "long" }; // Mengatur format ke hari yang panjang
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options); // Menggunakan lokal Indonesia
  };

  if (loading) return <div>Loading...</div>; // Tampilkan loading saat data masih diambil

  return (
    <>
      <section className="mt-6">
        <h1 className="text-xl font-semibold border-b-[2px] border-gray-500 w-[50px] pb-1">
          Berita
        </h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}{" "}
        <select
          value={selectedEndpoint}
          onChange={handleEndpointChange}
          className="bg-white border rounded-md p-2 mt-4"
        >
          {endpoints.map((endpoint) => (
            <option key={endpoint.name} value={endpoint.name}>
              {endpoint.name.toUpperCase()} {/* Menggunakan huruf besar */}
            </option>
          ))}
        </select>
        {/* Dropdown untuk memilih kategori */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="bg-white border rounded-md p-2 mt-4"
        >
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name.toUpperCase()} {/* Menggunakan huruf besar */}
            </option>
          ))}
        </select>
        <ul className="mt-4 overflow-y-auto h-[600px]">
          {berita.map((item) => (
            <li
              key={item.link}
              className="mb-4 border-b border-gray-300 pb-2 max-w-xl relative"
            >
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="my-2 rounded-md h-full w-full bg-cover"
                />
                {/* Menempatkan judul di dalam gambar */}
                <div className="bg-black bg-opacity-60 p-2 rounded-md absolute bottom-0 w-full">
                  <h2 className="text-white font-bold text-sm text-center">
                    {item.title}
                  </h2>
                </div>
              </div>
              <p className="text-gray-500">
                {getDayName(item.pubDate)},{" "}
                {new Date(item.pubDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-sm my-1">{item.description}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Baca Selengkapnya
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Berita;
