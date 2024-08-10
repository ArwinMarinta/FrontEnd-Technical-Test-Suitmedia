export const formatDate = (inputDate: any) => {
  // Membuat objek tanggal dari string input
  const date = new Date(inputDate);

  // Daftar nama bulan dalam bahasa Indonesia
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ].map((month) => month.toUpperCase());

  // Mengambil hari, bulan, dan tahun
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Mengembalikan tanggal dalam format yang diinginkan
  return `${day} ${month} ${year}`;
};
