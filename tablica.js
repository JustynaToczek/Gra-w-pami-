/**
 * tablica przechowująca ścieżki do zdjęć.
 * @type {string[]}
 */
const tablicaImg = [
  "img/pies.jpg",
  "img/kot.jpg",
  "img/chomik.jpg",
  "img/lis.jpg",
  "img/slon.jpg",
  "img/zebra.jpg",
  "img/zolw.jpg",
  "img/zyrafa.jpg",
];

/**
 * Algorytm tasowania Fisher-Yates dla danej tablicy.
 * @param {Array} array Tablica do przetasowania.
 */
function mieszaj(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export { tablicaImg, mieszaj };
