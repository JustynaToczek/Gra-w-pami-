import { tablicaImg, mieszaj } from "./tablica.js";

/**
 * Tablica przechowująca indeksy odwróconych kart.
 * @type {number[]}
 */
let odwroconekarty = [];

/**
 * Tablica przechowująca indeksy sparowanych kart.
 * @type {number[]}
 */
let sprarowanekarty = [];

/**
 * Podwojona tablica zdjęć.
 * @type {Array}
 */
let podwojonaTablicaImg;

/**
 * Flaga określająca, czy karty są w danym momencie odwrócone.
 * @type {boolean}
 */
let kartySaOdwrocone = false;

/**
 * Obiekt reprezentujący gracza.
 * @typedef {Object} Gracz
 * @property {string} imie Imię gracza
 * @property {number} iloscRuchow Ilość wykonanych ruchów przez gracza
 */

/**
 *  @type {Gracz}
 */
const gracz = {
  imie: "",
  iloscRuchow: 0,
};

/**
 * Element reprezentujący licznik ruchów.
 * @type {HTMLElement}
 */
const scoreElement = document.querySelector(".score");

scoreElement.style.display = "none"; //usuniecie widocznosci licznika po wejsciu na strone

/**
 * Formularz użyty w celu wprowadzenia imienia przez gracza.
 * @type {HTMLFormElement}
 */
const formularz = document.querySelector("form");

/**
 * Pole wprowadzania imienia w formularzu.
 * @type {HTMLInputElement}
 */
const inputImie = document.getElementById("imie");

/**
 * Nasłuchiwanie zdarzenia "submit" dla formularza. Jeśli formularz zostanie wysłany to wykonują się poniższe kroki.
 * Zapobieganie domyślnej akcji formularza.
 * Sprawdzenie, czy wprowadzono imię. Jeśli nie, następuje wyświetlenie alertu z prośbą o wprowadzenie imienia.
 * Jeśli wprowadzono imię, następuje ustawienie imienia gracza, poprzez przypisanie obiektowi reprezentującemu gracza właściwość jego imienia.
 * Następnie formularz się ukrywa i wywołana zostaje funkcja rozpoczynająca grę.
 * @param {Event} event Obiekt zdarzenia submit.
 */
formularz.addEventListener("submit", function (event) {
  event.preventDefault(); //funkcja preventDefault() zapobiega domyślnej akcji formularza
  const inputValue = inputImie.value.trim();

  if (inputValue === "") {
    alert("Wprowadź swoje imię aby przejść do gry");
  } else {
    gracz.imie = inputImie.value;
    document.querySelector(".formularz").style.display = "none"; //ukrywam formularz po kliknięciu submit
    startGame();
  }
});

/**
 * Rozpoczyna grę poprzez ustawienie widoczności elementu wyświetlającego wynik, zainicjowanie tablicy zawierającej dwukrotnie więcej elemntów
 * niż tablica zawierająca ścieżki do zdjęć, potasowanie kart i ułożenie kart na planszy.
 * Każdej karcie przypisywany jest nasłuchwicz zdarzeń "mouseover", "mouseout,", "click".
 */
function startGame() {
  scoreElement.style.display = "flex";

  podwojonaTablicaImg = [...tablicaImg, ...tablicaImg];
  mieszaj(podwojonaTablicaImg);
  const gameBoard = document.querySelector(".gameboard");

  podwojonaTablicaImg.forEach((imgSrc, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("indexKarty", index);
    card.style.backgroundImage = `url("img/cover.png")`;
    card.addEventListener("mouseover", () => powieksz(index));
    card.addEventListener("mouseout", () => zmniejsz(index));
    card.addEventListener("click", () => flipCard(index));
    gameBoard.appendChild(card);
  });
}

/**
 * Powiększa wybraną kartę po najechaniu na nią kursorem.
 * @param {number} cardIndex Indeks karty, która ma zostać powiększona.
 */
function powieksz(cardIndex) {
  const wybranaKarta = document.querySelector(
    `.card[indexKarty="${cardIndex}"]`
  );
  wybranaKarta.style.transform = "scale(1.1)";
}

/**
 * Przywraca wybranej karcie jej pierwotny rozmiar po opuszczeniu z niej kursora.
 * @param {number} cardIndex Indeks karty, która ma zostać zmniejszona.
 */
function zmniejsz(cardIndex) {
  const wybranaKarta = document.querySelector(
    `.card[indexKarty="${cardIndex}"]`
  );
  wybranaKarta.style.transform = "scale(1)";
}

/**
 * Jeśli to możliwe to odwraca kartę po kliknięciu i jeśli odwrócone są dwie karty, to poprzez wywołanie odpowiedniej funkcji sprawdza,
 * czy odkryte karty pasują do siebie.
 * @param {number} cardIndex Indeks klikniętej karty.
 */
function flipCard(cardIndex) {
  if (kartySaOdwrocone) return; //jesli poprzednie karty jeszcze sa odkryte, to nie mozna kolejnych kart odwrocic
  const clickedCard = document.querySelector(
    `.card[indexKarty="${cardIndex}"]`
  );

  if (!odwroconekarty.includes(cardIndex) && odwroconekarty.length < 2) {
    odwroconekarty.push(cardIndex);
    clickedCard.style.backgroundImage = `url(${podwojonaTablicaImg[cardIndex]})`;

    if (odwroconekarty.length === 2) {
      kartySaOdwrocone = true;
      setTimeout(czyPasuja, 500);
    }
  }
}

/**
 * Sprawdza, czy dwie odkryte karty pasują do siebie. W przypadku zgodności, karty zostają ukryte na planszy.
 * W przeciwnym razie, karty zostają ponownie zakryte. W obu przypadkach te czynności wykonują się po upływie pół sekundy.
 * Aktualizuje licznik ruchów gracza na stronie.
 */
function czyPasuja() {
  const [firstCard, secondCard] = odwroconekarty;
  const firstImg = podwojonaTablicaImg[firstCard];
  const secondImg = podwojonaTablicaImg[secondCard];

  const firstCardElement = document.querySelector(
    `.card[indexKarty="${firstCard}"]`
  );
  const secondCardElement = document.querySelector(
    `.card[indexKarty="${secondCard}"]`
  );

  if (firstImg === secondImg) {
    sprarowanekarty.push(...odwroconekarty);
    setTimeout(() => {
      firstCardElement.style.visibility = "hidden";
      secondCardElement.style.visibility = "hidden";
      kartySaOdwrocone = false;
      czyGraSieSkonczyla(zakonczenie);
    }, 500);
  } else {
    setTimeout(() => {
      firstCardElement.style.backgroundImage = 'url("img/cover.png")';
      secondCardElement.style.backgroundImage = 'url("img/cover.png")';
      kartySaOdwrocone = false;
    }, 500);
  }

  gracz.iloscRuchow++;
  document.getElementById("licznik").innerText = gracz.iloscRuchow;
  odwroconekarty = [];
}

/**
 * Sprawdza, czy wszystkie karty z planszy zostały sparowane. Jeśli wszystkie są sparowane, uruchamia podaną funkcję wywołania zwrotnego.
 * @param {Function} callback Funkcja wywołania zwrotnego do uruchomienia po zakończeniu gry.
 */
function czyGraSieSkonczyla(callback) {
  if (sprarowanekarty.length === podwojonaTablicaImg.length) {
    callback();
  }
}

/**
 * Funkcja obsługująca zakończenie gry. Zapisuje ostateczne dane gracza do localStorage
 * w formacie JSON, a następnie aktualizuje widok planszy gry i wyników.
 */
function zakonczenie() {
  //zapisanie ostatecznych danych gracza do localStorage po zakończeniu gry w formacie json
  localStorage.setItem("gracz", JSON.stringify(gracz));

  const gameBoard = document.querySelector(".gameboard");
  gameBoard.innerHTML = `<div class="wygrana"><h1>Brawo ${gracz.imie}! Gra skończona w ${gracz.iloscRuchow} ruchach.</h1></div>`;
  scoreElement.style.display = "none";

  czyMniejNiz20()
    .then((result) => {
      if (result < 20) {
        scoreElement.innerHTML = `<div class="score"><h2>Gratulacje, twój wynik mieści się w mniej niż 20 ruchach!</h2></div>`;
      } else {
        scoreElement.innerHTML = `<div class="score"><h2>Twój wynik przekracza 20 ruchów. Następnym razem postaraj się uzyskać lepszy wynik</h2></div>`;
      }
      scoreElement.style.display = "flex";
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * Funkcja zwracająca Promise, które zwróci ilość ruchów gracza po upływie pół sekundy.
 * @returns {Promise<number>} Promise z ilością ruchów gracza.
 * @reject {string} Komunikat błędu w przypadku niepowodzenia.
 */
function czyMniejNiz20() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (gracz.iloscRuchow) {
        resolve(gracz.iloscRuchow);
      } else {
        reject("Wystąpił błąd w odczycie ilości ruchów.");
      }
    }, 500);
  });
}
