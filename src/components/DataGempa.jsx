import axios from "axios";
import { useEffect, useState } from "react";

const DataGempa = () => {
  const [dataGempa, setDataGempa] = useState({});

  useEffect(() => {
    axios
      .get(`https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json`)
      .then((response) => setDataGempa(response.data.Infogempa.gempa));
  }, []);

  console.log(dataGempa);

  return (
    <>
      <section className="pt-3">
        <div className="bg-[#ffffff] mt-4 rounded-md py-2 shadow-md">
          <h1 className="text-center">GEMPA TERKINI</h1>
          <table className="table-auto mx-auto mt-4 border-collapse w-full">
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-bold">Wilayah</td>
                <td className="px-4 py-2">{dataGempa.Wilayah}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-bold">Magnitude</td>
                <td className="px-4 py-2">{dataGempa.Magnitude}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-bold">Kedalaman</td>
                <td className="px-4 py-2">{dataGempa.Kedalaman}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-bold">Koordinat</td>
                <td className="px-4 py-2">{`${dataGempa.Lintang}, ${dataGempa.Bujur}`}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-bold">Potensi</td>
                <td className="px-4 py-2">{dataGempa.Potensi}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-bold">Dirasakan</td>
                <td className="px-4 py-2">{dataGempa.Dirasakan}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-bold">Tanggal</td>
                <td className="px-4 py-2">{dataGempa.Tanggal}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold">Jam</td>
                <td className="px-4 py-2">{dataGempa.Jam}</td>
              </tr>
            </tbody>
          </table>
          <img
            src={`${import.meta.env.VITE_API_BMKG}${dataGempa.Shakemap}`}
            alt="BMKG Shakemap"
            width={500}
            height={500}
            className="mx-auto rounded-md"
          />
        </div>
      </section>
    </>
  );
};

export default DataGempa;
