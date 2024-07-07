export const formatRupiah = (number) => {
    const rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    });

    return rupiah.format(number);
};
