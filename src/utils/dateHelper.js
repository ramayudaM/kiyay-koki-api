function getFormattedDate(addMinutes = 0) {
  const date = new Date();

  // Menambahkan menit jika parameter diberikan
  if (addMinutes) date.setMinutes(date.getMinutes() + addMinutes);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  };

  // Mengembalikan tanggal dalam format yang diminta
  return date.toLocaleString('en-CA', options).replace(',', '').replace(/[/]/g, '-');
}

module.exports = {
  getFormattedDate,
};
