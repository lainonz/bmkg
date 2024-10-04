import { useState, useEffect } from "react";
import provinsiData from "../data/Provinsi.json"; // assuming the file is in the data folder
import {
  FaThermometerHalf,
  FaWind,
  FaTint,
  FaCompass,
  FaEye,
  FaCloudSun,
  FaCloud,
  FaSun,
  FaCloudRain,
} from "react-icons/fa"; // Import React Icons

import { TiWeatherPartlySunny } from "react-icons/ti";
const Cuaca = () => {
  const [selectedProvinsi, setSelectedProvinsi] = useState("32"); // default to Jawa Barat (32)
  const [selectedKotaKab, setSelectedKotaKab] = useState(""); // kota/kab choice
  const [selectedKecamatan, setSelectedKecamatan] = useState(""); // kecamatan choice
  const [selectedKelurahan, setSelectedKelurahan] = useState(""); // kelurahan choice
  const [kotaKabData, setKotaKabData] = useState([]); // store fetched kota/kab data
  const [kecamatanData, setKecamatanData] = useState([]); // store fetched kecamatan data
  const [kelurahanData, setKelurahanData] = useState([]); // store fetched kelurahan data
  const [cuacaData, setCuacaData] = useState(null);

  // Fetch kota/kab based on selected province
  useEffect(() => {
    const fetchKotaKab = async () => {
      try {
        const response = await fetch(
          `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm1=${selectedProvinsi}`
        );
        const data = await response.json();
        setKotaKabData(data.data);
        setSelectedKotaKab(""); // Reset the kota/kab selection when provinsi changes
        setSelectedKecamatan(""); // Reset kecamatan selection
        setSelectedKelurahan(""); // Reset kelurahan selection
      } catch (error) {
        console.error("Error fetching kota/kab data:", error);
      }
    };

    fetchKotaKab();
  }, [selectedProvinsi]); // Trigger when selectedProvinsi changes

  // Fetch kecamatan based on selected kota/kab
  useEffect(() => {
    if (selectedKotaKab) {
      const fetchKecamatan = async () => {
        try {
          const response = await fetch(
            `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm2=${selectedKotaKab}`
          );
          const data = await response.json();
          setKecamatanData(data.data);
          setSelectedKecamatan(""); // Reset kecamatan selection when kota/kab changes
          setSelectedKelurahan(""); // Reset kelurahan selection
        } catch (error) {
          console.error("Error fetching kecamatan data:", error);
        }
      };

      fetchKecamatan();
    }
  }, [selectedKotaKab]); // Trigger when selectedKotaKab changes

  // Fetch kelurahan based on selected kecamatan
  useEffect(() => {
    if (selectedKecamatan) {
      const fetchKelurahan = async () => {
        try {
          const response = await fetch(
            `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm3=${selectedKecamatan}`
          );
          const data = await response.json();
          setKelurahanData(data.data);
          setSelectedKelurahan(""); // Reset kelurahan selection when kecamatan changes
        } catch (error) {
          console.error("Error fetching kelurahan data:", error);
        }
      };

      fetchKelurahan();
    }
  }, [selectedKecamatan]); // Trigger when selectedKecamatan changes

  // Fetch weather data when a kelurahan is selected
  useEffect(() => {
    if (selectedKelurahan) {
      const fetchCuacaData = async () => {
        try {
          const response = await fetch(
            `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${selectedKelurahan}`
          );
          const data = await response.json();
          setCuacaData(data.data);
        } catch (error) {
          console.error("Error fetching cuaca data:", error);
        }
      };

      fetchCuacaData();
    }
  }, [selectedKelurahan]); // Trigger when selectedKelurahan changes

  console.log("Provinsi:", selectedProvinsi);
  console.log("Kota/Kab:", selectedKotaKab);
  console.log("Kecamatan:", selectedKecamatan);
  console.log("Kelurahan:", selectedKelurahan);
  console.log("Cuaca Data:", cuacaData);

  const getWeatherIcon = (weatherDesc, type) => {
    // Check for weather description first
    switch (weatherDesc.toLowerCase()) {
      case "cerah berawan":
        return <FaCloudSun className="text-yellow-500" />;
      case "berawan":
        return <FaCloud className="text-gray-500" />;
      case "cerah":
        return <FaSun className="text-yellow-300" />;
      case "hujan":
        return <FaCloudRain className="text-blue-500" />;
      default:
        break; // If no match, continue to the next switch
    }

    // Check for other types
    switch (type) {
      case "suhu":
        return <FaThermometerHalf className="text-red-500" />;
      case "kelembaban":
        return <FaTint className="text-blue-500" />;
      case "kecepatan_angin":
        return <FaWind className="text-gray-500" />;
      case "arah_angin":
        return <FaCompass className="text-green-500" />;
      case "jarak_pandang":
        return <FaEye className="text-purple-500" />; // Contoh ikon untuk jarak pandang
      default:
        return null; // No icon available
    }
  };

  return (
    <>
      <section>
        <h1>
          Perkiraan cuaca dalam waktu 3 harian. Data diambil dari{" "}
          <a
            href="https://data.bmkg.go.id"
            target="blank"
            className="text-blue-500 underline"
          >
            API BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)
          </a>
        </h1>

        {/* Select for Provinsi */}
        <select
          value={selectedProvinsi}
          onChange={(e) => setSelectedProvinsi(e.target.value)}
          className="bg-white border rounded-md p-2 mt-4"
        >
          {provinsiData.map((provinsi) => (
            <option key={provinsi.kode_provinsi} value={provinsi.kode_provinsi}>
              {provinsi.nama_provinsi}
            </option>
          ))}
        </select>

        {/* Select for Kota/Kabupaten (based on selected Provinsi) */}
        {kotaKabData.length > 0 && (
          <select
            value={selectedKotaKab}
            onChange={(e) => setSelectedKotaKab(e.target.value)}
            className="bg-white border rounded-md p-2 mt-4"
          >
            <option value="" disabled>
              Pilih Kota/Kabupaten
            </option>
            {kotaKabData.map((kota) => (
              <option key={kota.lokasi.adm2} value={kota.lokasi.adm2}>
                {kota.lokasi.kotkab}
              </option>
            ))}
          </select>
        )}

        {/* Select for Kecamatan (based on selected Kota/Kab) */}
        {kecamatanData.length > 0 && (
          <select
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
            className="bg-white border rounded-md p-2 mt-4"
          >
            <option value="" disabled>
              Pilih Kecamatan
            </option>
            {kecamatanData.map((kec) => (
              <option key={kec.lokasi.adm3} value={kec.lokasi.adm3}>
                {kec.lokasi.kecamatan}
              </option>
            ))}
          </select>
        )}

        {/* Select for Kelurahan (based on selected Kecamatan) */}
        {kelurahanData.length > 0 && (
          <select
            value={selectedKelurahan}
            onChange={(e) => setSelectedKelurahan(e.target.value)}
            className="bg-white border rounded-md p-2 mt-4"
          >
            <option value="" disabled>
              Pilih Kelurahan
            </option>
            {kelurahanData.map((kel) => (
              <option key={kel.lokasi.adm4} value={kel.lokasi.adm4}>
                {kel.lokasi.desa}
              </option>
            ))}
          </select>
        )}

        {cuacaData && cuacaData[0] && cuacaData[0].cuaca && (
          <>
            <div className="my-6 bg-white p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold flex items-center gap-3">
                <TiWeatherPartlySunny size={30} className="text-blue-500" />
                Cuaca di {cuacaData[0].lokasi.desa}
              </h2>
            </div>

            <div
              className="flex flex-col gap-4 overflow-y-auto"
              style={{ maxHeight: "350px" }} // Membatasi tampilan menjadi hanya 2 data dengan scroll
            >
              {/* Iterate over cuaca array */}
              {cuacaData[0].cuaca.map((cuacaArr, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-md">
                  {cuacaArr.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-4 rounded-md flex gap-4 items-center"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt="Weather Icon"
                          className="w-16 h-16 object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="text-xs text-gray-500 font-bold">
                          {new Date(item.datetime).toLocaleString()}
                        </p>
                        <div className="bg-blue-200 p-2 rounded-md flex items-center gap-2">
                          {getWeatherIcon(item.weather_desc)}{" "}
                          {/* Icon berdasarkan deskripsi cuaca */}
                          <p className="text-sm font-medium">
                            {item.weather_desc}
                          </p>
                        </div>
                        <p className="text-sm flex items-center gap-2">
                          {getWeatherIcon("", "suhu")} {/* Icon untuk suhu */}
                          <span className="font-semibold">Suhu:</span> {item.t}
                          °C
                        </p>
                        <p className="text-sm flex items-center gap-2">
                          {getWeatherIcon("", "kelembaban")}{" "}
                          {/* Icon untuk kelembaban */}
                          <span className="font-semibold">
                            Kelembaban:
                          </span>{" "}
                          {item.hu}%
                        </p>
                        <p className="text-sm flex items-center gap-2">
                          {getWeatherIcon("", "arah_angin")}{" "}
                          {/* Icon untuk arah angin */}
                          <span className="font-semibold">
                            Arah Angin:
                          </span>{" "}
                          {item.wd} ({item.wd_deg}°)
                        </p>
                        <p className="text-sm flex items-center gap-2">
                          {getWeatherIcon("", "kecepatan_angin")}{" "}
                          {/* Icon untuk kecepatan angin */}
                          <span className="font-semibold">
                            Kecepatan Angin:
                          </span>{" "}
                          {item.ws} m/s
                        </p>
                        <p className="text-sm flex items-center gap-2">
                          {getWeatherIcon("", "jarak_pandang")}{" "}
                          {/* Icon untuk jarak pandang */}
                          <span className="font-semibold">
                            Jarak Pandang:
                          </span>{" "}
                          {item.vs_text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Cuaca;
