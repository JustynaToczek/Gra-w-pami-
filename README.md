# Gra w pamięć - aplikacja w języku JavaScript
## Projekt semestralny z przedmiotu Technologie Internetowe
### Informatyka, 3 semestr, Rzeszów 2024

<img src="https://github.com/JustynaToczek/Aplikacja-do-organizacji-czasu/assets/113525212/98861275-57df-4b53-a553-a0576f68ad8e" width="700">

### Spis treści
 1.	[Zdefiniowanie problemu do realizacji](#1-zdefiniowanie-problemu-do-realizacji)</br>
2.	Propozycja rozwiązania problemu</br>
3.	Testowanie</br>
4.	Dokumentacja JSDoc</br>
5.	Źródła i prawa autorskie</br>

### 1.	Zdefiniowanie problemu do realizacji
Głównym założeniem projektu jest stworzenie aplikacji będącej grą w pamięć. Aplikacja powinna dynamicznie tworzyć planszę, na której rozmieszone będą karty. Karty przy każdym podejściu do gry powinny być przetasowywane. W grze powinna być zliczana ilość ruchów gracza. W grze powinno być zrealizowane wypełnienie formularza i jego przetworzenie. Aplikacja powinna mieć logikę gry w pamięć, czyli po odwróceniu jednej karty powinno być możliwe odwrócenie jeszcze jednej z dostępnych kart. Po odwróceniu dwóch takich samych kart powinny one zniknąć. Po odwróceniu dwóch różnych kart, powinny one powrócić do swojego pierwotnego stanu, odwrócić się rewersem do góry. Aplikacja powinna być interaktywna i intuicyjna.

### 2.	Propozycja rozwiązania problemu
#### •	Start aplikacji
W celu uzyskania interakcji z użytkownikiem, przed rozpoczęciem gry wyświetlany zostaje formularz, do którego użytkownik wprowadza swoje imię. Brak wprowadzonego imienia oznacza pojawienie się alertu, a gra nie rozpocznie się dopóki w formularzu nie wprowadzono żadnego ciągu znaków będącego imieniem. Efekt ten został uzyskany dzięki dodaniu nasłuchiwania zdarzenia „submit” dla elementu będącego formularzem.</br>
#### •	Start gry
Plansza do gry pojawia się na ekranie po wprowadzeniu imienia oraz kliknięciu w przycisk „Submit”. Plansza składa się z 16 kart, czyli 8 par takich samych kart. Karty znajdują się w równych od siebie odstępach. Ten efekt uzyskano za pomocą CSS grid layout. Wszystkie karty początkowo swój rewers mają w górze. Zawartość żadnej karty nie jest widoczna. Po najechaniu kursorem na kartę, powiększa się o 110%, a kursor zmienia swój wygląd na wartość „pointer”. W momencie opuszczenia karty przez kursor, karta powraca do swojego pierwotnego rozmiaru. Efekt ten uzyskano dzięki nadaniu nasłuchiwania zdarzeń każdej z kart. Te działania mają funkcję estetyczną oraz powinny przybliżyć użytkownikowi informację, na której karcie znajduje się aktualnie kursor. Dzięki temu aplikacja wydaję się być bardziej intuicyjna. </br>
#### •	Rozpoczęcie gry
Wszystkie karty przed rozpoczęciem gry są tasowane poprzez funkcję mieszającą, do której w parametrze przekazano tablicę zawierającą ścieżki do wykorzystywanych zdjęć. Zastosowano algorytm tasowania Fisher-Yates. Pod planszą do gry widnieje napis informujący gracza o ilości wykonanych przez niego ruchów. Początkowo ma on wartość 0. Z każdym odsłonięciem dwóch kart, ruchy gracza inkrementują się i jest to na bieżąco aktualizowane na stronie, dzięki użyciu operacji na strukturze DOM. </br>
#### •	Trwanie gry
W momencie, którym użytkownik odwraca kartę, program sprawdza, ile kart jest odwróconych. Jeśli odwrócona jest jedna karta – użytkownik może odwrócić drugą. Jeśli jednak odwrócone są dwie karty, użytkownik nie może odwrócić większej ilości kart, do momentu aż obie znikną, bądź powrócą do pierwotnego stanu. Takie rozwiązanie realizowane jest poprzez utworzenie flagi zmieniającej w odpowiednich momentach swoją wartość. Pozwala to na prawidłową interakcję użytkownika z grą. </br>
#### •	Zakończenie gry
W momencie, w którym użytkownik poprawnie połączy ostatnią parę kart, wywoływana jest funkcja odpowiedzialna za zakończenie gry. Plansza z kartami nie jest już widoczna, a w jej miejscu pojawia się, ostylowany klasą mającą style takie same jak formularz, kontener z gratulacjami i informacją o ilości wykonanych ruchów. Wykorzystywane jest tutaj imię gracza podane w formularzu na początku gry. Jest to tworzone dynamicznie za pomocą manipulacji strukturą DOM oraz modyfikacją właściwości CSS za pomocą języka JavaScript. Ponadto w miejscu wyświetlającym na stronie ilość ruchów gracza, po zakończeniu gry wyświetlana jest informacja o tym, czy osiągnięta liczba ruchów jest mniejsza niż 20 (uznawane to jest za dobry wynik), czy większa niż 20. Realizacja tego kroku została osiągnięta poprzez zastosowanie Promise. Po pół sekundy od wywołania funkcji zwracającej Promise, w zależności od liczby ruchów, wyświetlany jest odpowiednio dobrany tekst. W tym miejscu także wykorzystywana są operacje na strukturze DOM.</br>

### 3.	Testowanie
#### •	Scenariusz wypełniania formularza
##### A.	Użytkownik uzupełnia wskazane pole w formularzu
Otrzymany rezultat: Formularz przestaje być widoczny, a gra rozpoczyna się. Zrzut ekranu z wykonywania testu został przedstawiony na rysunku 1 i 2. </br>
 <img src="https://github.com/JustynaToczek/Memory-game/assets/113525212/3bfef618-d90c-4373-a6fc-e74ebf6d61ac" width="400"> </br>
Rysunek 1. Realizacja scenariusza A</br>

<img src="https://github.com/JustynaToczek/Memory-game/assets/113525212/b45981ad-771a-4494-96c0-15d6b00ac08b" width="400"></br>
Rysunek 2. Realizacja scenariusza A

##### B.	Użytkownik pozostawia puste pole w formularzu.
Otrzymany rezultat: Zostaje wyświetlony komunikat „Wprowadź swoje imię aby przejść do gry”. Otrzymany rezultat został przedstawiony na rysunku 3. </br>
<img src="https://github.com/JustynaToczek/Memory-game/assets/113525212/910dfb4d-9b09-4beb-af58-9d0dd8620a99" width="400"> </br>
Rysunek 3. Realizacja scenariusza B

#### •	Scenariusz odkrywania kart
##### C.	Użytkownik podczas momentu w którym odkryte są dwie karty, próbuje odkryć więcej kart z planszy.
Otrzymany rezultat: Pomimo kliknięcia w dowolną kartę (na rysunku 4 w kartę trzecią w pierwszym rzędzie, widoczne jest także jej powiększenie), karta pozostaje zakryta. </br>
<img src="(https://github.com/JustynaToczek/Memory-game/assets/113525212/55e6afb1-a9f1-478b-a713-c333b92c1baa" width="400"></br>
Rysunek 4. Realizacja scenariusza C

#### •	Scenariusz realizacji zakończenia gry w zależności od ilości wykonanych ruchów
##### D.	Gracz wykonał więcej niż 20 ruchów.
Otrzymany rezultat: Wyświetlony zostaje tekst „Twój wynik przekracza 20 ruchów. Następnym razem postaraj się uzyskać lepszy wynik”. Otrzymany wynik testu został przedstawiony na rysunku 5. </br>
<img src="https://github.com/JustynaToczek/Memory-game/assets/113525212/25bb2861-5259-45db-9215-08c2e3a81452" width="400"> </br>
Rysunek 5. Realizacja scenariusza D

##### E.	Gracz wykonał mniej niż 20 ruchów
Otrzymany rezultat: Wyświetlony zostaje tekst „Gratulacje, twój wynik mieści się w mniej niż 20 ruchach!”. Otrzymany wynik testu został przedstawiony na rysunku 6. </br>
<img src="https://github.com/JustynaToczek/Memory-game/assets/113525212/0c01771d-268a-4777-a7ab-6ad0fda509fd" width="400"></br>
Rysunek 6. Realizacja scenariusza E


### 4.	Dokumentacja JSDoc
Do projektu stworzono dokumentację kodu JavaScript, za pomocą języka znaczników JSDOC. W dokumentacji zawarte są opisy wszystkich wykorzystanych w aplikacji funkcji i zmiennych. Dokumentacja znajduje się w folderze JSDoc.

### 5.	Źródła i prawa autorskie
Zdjęcia użyte na stronie zostały pobrane ze strony internetowej https://pixabay.com/pl/. Dostęp do nich jest dozwolony i darmowy. Wszystkie wykorzystane zdjęcia są wolne od praw autorskich.

