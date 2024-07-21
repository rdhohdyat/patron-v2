import create from "zustand";

const useLocation = create((set) => ({
    kecamatanPekanbaru: [
        {
            id: 1,
            name: "Bukit Raya",
            kelurahan: [
                "Air Dingin",
                "Simpang Tiga",
                "Tangkerang Labuai",
                "Tangkerang Selatan",
                "Tangkerang Utara",
            ],
        },
        {
            id: 2,
            name: "Lima Puluh",
            kelurahan: ["Pesisir", "Rintis", "Tanjung Rhu", "Sekip"],
        },
        {
            id: 3,
            name: "Marpoyan Damai",
            kelurahan: [
                "Maharatu",
                "Perhentian Marpoyan",
                "Sidomulyo Timur",
                "Tangkerang Barat",
                "Tangkerang Tengah",
                "Wonorejo",
            ],
        },
        {
            id: 4,
            name: "Payung Sekaki",
            kelurahan: [
                "Air Hitam",
                "Bandar Raya",
                "Labuh Baru Barat",
                "Labuh Baru Timur",
                "Tampan",
                "Tirta Siak",
            ],
        },
        {
            id: 5,
            name: "Pekanbaru Kota",
            kelurahan: [
                "Simpang Empat",
                "Sumahilang",
                "Tanah Datar",
                "Kota Baru",
                "Sukaramai",
                "Kota Tinggi",
            ],
        },
        {
            id: 6,
            name: "Rumbai",
            kelurahan: [
                "Sri Meranti",
                "Umban Sari",
                "Palas",
                "Lembah Damai",
                "Limbungan Baru",
                "Meranti Pandak",
            ],
        },
        {
            id: 7,
            name: "Rumbai Barat",
            kelurahan: [
                "Agrowisata",
                "Maharani",
                "Muara Fajar Barat",
                "Muara Fajar Timur",
                "Rantau Panjang",
                "Rumbai Bukit",
            ],
        },
        {
            id: 8,
            name: "Rumbai Timur",
            kelurahan: [
                "Lembah Sari",
                "Limbungan",
                "Sungai Ambang",
                "Sungai Ukai",
                "Tebing Tinggi Okura",
            ],
        },
        {
            id: 9,
            name: "Sail",
            kelurahan: ["Cinta Raja", "Sukamaju", "Sukamulya"],
        },
        {
            id: 10,
            name: "Senapelan",
            kelurahan: [
                "Kampung Bandar",
                "Kampung Baru",
                "Kampung Dalam",
                "Padang Bulan",
                "Padang Terubuk",
                "Sago",
            ],
        },
        {
            id: 11,
            name: "Sukajadi",
            kelurahan: [
                "Harjosari",
                "Jadirejo",
                "Kampung Melayu",
                "Kampung Tengah",
                "Kedung Sari",
                "Pulau Karam",
                "Sukajadi",
            ],
        },
        {
            id: 12,
            name: "Tampan",
            kelurahan: ["Delima", "Sidomulyo Barat", "Binawidya"],
        },
        {
            id: 13,
            name: "Tenayan Raya",
            kelurahan: [
                "Bambu Kuning",
                "Bencah Lesung",
                "Industri Tenayan",
                "Melebung",
                "Rejosari",
                "Sialang Sakti",
                "Tangkerang Timur",
                "Tuah Negeri",
            ],
        },
        {
            id: 14,
            name: "Tuah Madani",
            kelurahan: [
                "Tuah Karya",
                "Tuah Madani",
                "Air Putih",
                "Sialang Munggu",
                "Sidomulyo Barat",
            ],
        },
        {
            id: 15,
            name: "Kulim",
            kelurahan: [
                "Kulim",
                "Mentangor",
                "Sialangrampai",
                "Pebatuan",
                "Pematangkapau",
            ],
        },
    ],
}));

export default useLocation;
