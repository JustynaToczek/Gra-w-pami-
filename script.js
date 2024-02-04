import { tablicaImg, mieszaj } from "./tablica.js";
/**
 * Tablica przechowująca indeksy odwróconych kart
 * @type {number[]}
 */
let odwroconekarty = [];

/**
 * Tablica przechowująca indeksy sparowanych kart
 * @type {number[]}
 */
let sprarowanekarty = [];

/**
 *
 */
let podwojonaTablicaImg;
let kartySaOdwrocone = false;

const gracz = {
  imie: "",
  iloscRuchow: 0,
};

//usuniecie widocznosci licznika po wejsciu na strone
const scoreElement = document.querySelector(".score");
scoreElement.style.display = "none";

const formularz = document.querySelector("form");
const inputImie = document.getElementById("imie");

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
 *
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

function powieksz(cardIndex) {
  const wybranaKarta = document.querySelector(
    `.card[indexKarty="${cardIndex}"]`
  );
  wybranaKarta.style.transform = "scale(1.1)";
}

function zmniejsz(cardIndex) {
  const wybranaKarta = document.querySelector(
    `.card[indexKarty="${cardIndex}"]`
  );
  wybranaKarta.style.transform = "scale(1)";
}

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

function czyGraSieSkonczyla(callback) {
  if (sprarowanekarty.length === podwojonaTablicaImg.length) {
    callback();
  }
}

function zakonczenie() {
  //zapisanie ostatecznych danych gracza do localStorage po zakończeniu gry w formacie json
  localStorage.setItem("gracz", JSON.stringify(gracz));

  const gameBoard = document.querySelector(".gameboard");
  gameBoard.innerHTML = `<div class="wygrana"><h1>Brawo ${gracz.imie}! Gra skończona w ${gracz.iloscRuchow} ruchach.</h1></div>`;
  scoreElement.style.display = "none";

  czyMniejNiz20().then((result) => {
    if (result) {
      scoreElement.innerHTML = `<div class="score"><h2>Gratulacje, twój wynik mieści się w mniej niż 20 ruchach!</h2></div>`;
    } else {
      scoreElement.innerHTML = `<div class="score"><h2>Twój wynik przekracza 20 ruchów. Następnym razem postaraj się uzyskać lepszy wynik</h2></div>`;
    }
    scoreElement.style.display = "flex";
  });
}

function czyMniejNiz20() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(gracz.iloscRuchow < 20);
    }, 500);
  });
}
