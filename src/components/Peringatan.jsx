const Peringatan = () => {
  return (
    <>
      <section className="mt-8 p-4 bg-white rounded-md shadow-md">
        <h1 className="text-xl font-bold bg-yellow-300 px-2">
          PERINGATAN DINI GELOMBANG TINGGI
        </h1>
        <p className="mt-2 md:w-[60%] text-gray-500 text-justify">
          Peringatan dini gelombang tinggi merupakan informasi prakiraan
          gelombang untuk 2 hari ke depan yang akan diinformasikan jika terjadi
          gelombang tinggi lebih dari 1.25 meter dan bertahan selama 12 jam ke
          depan di sekitar perairan Indonesia dan berlaku maksimal 2 hari sejak
          dikeluarkan dan diperbaharui setiap ada perubahan dan sebelum masa
          berlakunya habis.
        </p>
        <iframe
          src="https://cdn.bmkg.go.id/DataMKG/MEWS/dokumen/peringatan-dini-gelombang-tinggi.pdf"
          width="100%"
          height="600px"
          className="mt-4 rounded-md"
          title="Peringatan Dini Gelombang Tinggi"
        ></iframe>
      </section>
    </>
  );
};

export default Peringatan;
