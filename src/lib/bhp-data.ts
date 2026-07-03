import {
  ShieldCheck,
  AlertTriangle,
  Flame,
  HeartPulse,
  Armchair,
  HardHat,
  type LucideIcon,
} from "lucide-react";

export type Topic = {
  id: string;
  title: string;
  short: string;
  icon: LucideIcon;
  color: string;
  duration: string;
  form: string[];
  intro: string;
  points: { title: string; body: string }[];
  video?: { title: string; src: string; poster?: string };
  interactives?: (
    | "fire-extinguishers"
    | "first-aid-steps"
    | "ergonomics-check"
    | "rescue-plan"
    | "hazards-check"
  )[];
};

export const TOPICS: Topic[] = [
  {
    id: "przepisy",
    title: "Przepisy BHP",
    short: "Kodeks pracy, prawa i obowiązki",
    icon: ShieldCheck,
    color: "oklch(0.52 0.22 285)",
    duration: "8 min",
    form: ["Tekst", "Quiz"],
    intro:
      "Podstawą bezpiecznej pracy jest znajomość regulacji prawnych. Poznasz najważniejsze przepisy Kodeksu pracy oraz prawa i obowiązki obu stron stosunku pracy.",
    points: [
      {
        title: "Obowiązki pracodawcy",
        body: "Zapewnienie bezpiecznych i higienicznych warunków pracy, szkolenia BHP, ocena ryzyka zawodowego oraz dostarczenie środków ochrony indywidualnej.",
      },
      {
        title: "Obowiązki pracownika",
        body: "Znajomość przepisów BHP, stosowanie środków ochrony, dbanie o porządek na stanowisku, niezwłoczne zgłaszanie wypadków i zagrożeń przełożonemu.",
      },
      {
        title: "Prawo do odmowy pracy",
        body: "Pracownik ma prawo powstrzymać się od pracy, gdy warunki nie odpowiadają przepisom BHP i stwarzają bezpośrednie zagrożenie dla życia lub zdrowia.",
      },
      {
        title: "Odpowiedzialność",
        body: "Naruszenie przepisów BHP może skutkować odpowiedzialnością porządkową, materialną lub karną — niezależnie od stanowiska.",
      },
    ],
  },
  {
    id: "zagrozenia",
    title: "Zagrożenia w firmie",
    short: "Identyfikacja i zapobieganie",
    icon: AlertTriangle,
    color: "oklch(0.78 0.15 75)",
    duration: "6 min",
    form: ["Infografika", "Film"],
    interactives: ["hazards-check"],
    intro:
      "Większości wypadków można zapobiec, jeśli umiemy rozpoznać zagrożenie zanim się zmaterializuje. Poznaj najczęstsze ryzyka w środowisku pracy.",
    points: [
      {
        title: "Poślizgnięcia i upadki",
        body: "Mokra podłoga, rozsypane materiały, niewłaściwe obuwie — to najczęstsza przyczyna urazów w miejscu pracy.",
      },
      {
        title: "Uderzenia i przygniecenia",
        body: "Niezabezpieczone przedmioty, otwarte szuflady, nieprawidłowo składowane materiały na wysokości.",
      },
      {
        title: "Zagrożenia elektryczne",
        body: "Uszkodzone przewody, przeciążone gniazdka, praca pod napięciem bez uprawnień.",
      },
      {
        title: "Czynniki chemiczne i pyły",
        body: "Substancje drażniące, alergeny, pyły organiczne — wymagają stosowania odpowiednich środków ochrony.",
      },
    ],
  },
  {
    id: "ppoz",
    title: "Ochrona przeciwpożarowa",
    short: "Plan ratowniczy, ewakuacja, oznakowanie",
    icon: Flame,
    color: "oklch(0.60 0.22 27)",
    duration: "14 min",
    form: ["Plan budynku", "Interakcja"],
    intro:
      "Ochrona przeciwpożarowa to zespół przedsięwzięć chroniących życie, zdrowie i mienie przed pożarem oraz innym miejscowym zagrożeniem. Reakcja w pierwszej minucie decyduje o skutkach — poznaj plan ratowniczy biurowca, zasady ewakuacji i znaki bezpieczeństwa.",
    points: [
      {
        title: "Procedura przy wykryciu pożaru",
        body: "Zachowaj spokój. Zaalarmuj otoczenie, wciśnij najbliższy Ręczny Ostrzegacz Pożarowy (ROP), powiadom przełożonego i zadzwoń pod 112. Dopiero potem — jeśli to bezpieczne — sięgnij po gaśnicę.",
      },
      {
        title: "Trójkąt spalania i rodzaje pożarów",
        body: "Spalanie wymaga paliwa, tlenu i ciepła — usuń jeden element, a pożar zgaśnie. Klasy: A (ciała stałe), B (ciecze), C (gazy), D (metale), F (tłuszcze kuchenne).",
      },
      {
        title: "Decyzja o ewakuacji",
        body: "Podejmuje ją najwyższa rangą osoba w danym obszarze. Ewakuujemy się do innej strefy pożarowej, w ostateczności na zewnątrz, pamiętając o zamykaniu drzwi przeciwpożarowych.",
      },
      {
        title: "Zakaz korzystania z wind",
        body: "Podczas pożaru używamy wyłącznie schodów ewakuacyjnych. Gdy jedna droga jest odcięta — kierujemy się alternatywną.",
      },
      {
        title: "Punkt zbiórki dla wszystkich",
        body: "Po opuszczeniu budynku — pracownicy, goście, kurierzy i ekipy zewnętrzne — zbierają się w wyznaczonym punkcie, aby koordynator BHP mógł zweryfikować obecność wszystkich osób.",
      },
    ],
    interactives: ["fire-extinguishers", "rescue-plan"],
  },
  {
    id: "pierwsza-pomoc",
    title: "Pierwsza pomoc",
    short: "Resuscytacja i opatrunki",
    icon: HeartPulse,
    color: "oklch(0.65 0.22 12)",
    duration: "12 min",
    form: ["Film", "Krok po kroku", "Quiz"],
    intro:
      "Pierwsze minuty po wypadku są kluczowe. Nawet podstawowa wiedza może uratować życie współpracownikowi.",
    points: [
      {
        title: "Bezpieczeństwo miejsca zdarzenia",
        body: "Zanim podejdziesz do poszkodowanego, upewnij się że Tobie nic nie grozi. Nie stań się drugą ofiarą.",
      },
      {
        title: "Ocena przytomności i oddechu",
        body: "Sprawdź reakcję na głos i dotyk. Udrożnij drogi oddechowe i obserwuj klatkę piersiową przez 10 sekund.",
      },
      {
        title: "Wezwanie pomocy",
        body: "Zadzwoń pod 112. Wyraźnie podaj lokalizację, liczbę poszkodowanych i rodzaj zdarzenia. Nie rozłączaj się jako pierwszy.",
      },
    ],
    interactives: ["first-aid-steps"],
  },
  {
    id: "ergonomia",
    title: "Ergonomia pracy",
    short: "Postawa, monitor, przerwy",
    icon: Armchair,
    color: "oklch(0.65 0.16 195)",
    duration: "5 min",
    form: ["Infografika"],
    intro:
      "Drobne nawyki przy biurku po latach dają wielką różnicę. Sprawdź ustawienie swojego stanowiska.",
    points: [
      {
        title: "Monitor",
        body: "Górna krawędź ekranu na wysokości oczu, w odległości ok. 50–70 cm. Brak odbić światła na ekranie.",
      },
      {
        title: "Krzesło",
        body: "Stopy płasko na podłodze, kąt w kolanach ok. 90°, oparcie podtrzymujące odcinek lędźwiowy kręgosłupa.",
      },
      {
        title: "Mikroprzerwy",
        body: "Co 50 minut wstań na 2–3 minuty. Co 20 minut przenieś wzrok na obiekt oddalony o min. 6 metrów.",
      },
    ],
    interactives: ["ergonomics-check"],
  },
  {
    id: "stanowiskowe",
    title: "Ryzyko stanowiskowe",
    short: "Maszyny, środki ochrony",
    icon: HardHat,
    color: "oklch(0.55 0.18 145)",
    duration: "9 min",
    form: ["Tekst", "Lista kontrolna"],
    intro:
      "Każde stanowisko ma swoją specyfikę. Poznaj zasady obowiązujące w Twojej roli i zawsze sprawdzaj kartę oceny ryzyka.",
    points: [
      {
        title: "Środki ochrony indywidualnej",
        body: "Kask, okulary, rękawice, obuwie ochronne — dobierane indywidualnie do zagrożeń występujących na stanowisku.",
      },
      {
        title: "Obsługa maszyn",
        body: "Nigdy nie obsługuj maszyny bez przeszkolenia. Nie demontuj osłon. Wyłącz zasilanie przed czyszczeniem.",
      },
      {
        title: "Transport ręczny",
        body: "Mężczyzna: max 30 kg dorywczo. Kobieta: max 12 kg. Zawsze podnoś z prostym kręgosłupem, używając nóg.",
      },
    ],
  },
];

export type Question = {
  id: number;
  topicId: string;
  question: string;
  options: string[];
  correct: number;
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    topicId: "przepisy",
    question:
      "Kto jest odpowiedzialny za zapewnienie bezpiecznych warunków pracy?",
    options: ["Pracownik", "Pracodawca", "Inspektor BHP", "Współpracownicy"],
    correct: 1,
  },
  {
    id: 2,
    topicId: "przepisy",
    question: "Czy pracownik może odmówić wykonania pracy zagrażającej życiu?",
    options: [
      "Nie, musi wykonać polecenie służbowe",
      "Tylko za zgodą związku zawodowego",
      "Tak, ma do tego prawo",
      "Tylko jeśli ma więcej niż 10 lat stażu",
    ],
    correct: 2,
  },
  {
    id: 3,
    topicId: "zagrozenia",
    question: "Najczęstszą przyczyną wypadków w biurze są:",
    options: [
      "Porażenia prądem",
      "Poślizgnięcia i upadki",
      "Pożary",
      "Zatrucia chemiczne",
    ],
    correct: 1,
  },
  {
    id: 4,
    topicId: "ppoz",
    question:
      "Której gaśnicy NIE wolno używać do gaszenia urządzeń pod napięciem?",
    options: [
      "Śniegowej (CO₂)",
      "Proszkowej",
      "Pianowej (wodnej)",
      "Halonowej",
    ],
    correct: 2,
  },
  {
    id: 5,
    topicId: "ppoz",
    question: "Numer alarmowy ogólny (z telefonu komórkowego) to:",
    options: ["997", "998", "112", "999"],
    correct: 2,
  },
  {
    id: 6,
    topicId: "ppoz",
    question: "Co należy zrobić w pierwszej kolejności po zauważeniu pożaru?",
    options: [
      "Próbować ugasić własnymi siłami",
      "Zaalarmować otoczenie i wezwać służby",
      "Zabrać swoje rzeczy osobiste",
      "Otworzyć okna dla wentylacji",
    ],
    correct: 1,
  },
  {
    id: 7,
    topicId: "pierwsza-pomoc",
    question:
      "Ile uciśnięć klatki piersiowej przypada na 2 oddechy ratownicze (dorosły)?",
    options: ["15", "20", "30", "50"],
    correct: 2,
  },
  {
    id: 8,
    topicId: "pierwsza-pomoc",
    question: "W jakiej pozycji układamy osobę nieprzytomną oddychającą?",
    options: [
      "Na plecach",
      "Na brzuchu",
      "W pozycji bocznej bezpiecznej",
      "W pozycji siedzącej",
    ],
    correct: 2,
  },
  {
    id: 9,
    topicId: "pierwsza-pomoc",
    question: "Co sprawdzasz jako pierwsze, gdy podchodzisz do poszkodowanego?",
    options: [
      "Tętno na tętnicy szyjnej",
      "Bezpieczeństwo miejsca zdarzenia",
      "Dokumenty tożsamości",
      "Wzrost i wagę",
    ],
    correct: 1,
  },
  {
    id: 10,
    topicId: "ergonomia",
    question: "Górna krawędź monitora powinna znajdować się:",
    options: [
      "Powyżej wysokości oczu",
      "Na wysokości oczu",
      "Znacznie poniżej oczu",
      "Pod kątem 45° w dół",
    ],
    correct: 1,
  },
  {
    id: 11,
    topicId: "ergonomia",
    question:
      "Co ile minut zaleca się krótką przerwę przy pracy przy komputerze?",
    options: [
      "Co 15 minut",
      "Co 50 minut",
      "Co 2 godziny",
      "Tylko gdy jesteś zmęczony",
    ],
    correct: 1,
  },
  {
    id: 12,
    topicId: "stanowiskowe",
    question:
      "Maksymalna dorywcza masa ładunku dla mężczyzny przy transporcie ręcznym wynosi:",
    options: ["12 kg", "20 kg", "30 kg", "50 kg"],
    correct: 2,
  },
  {
    id: 13,
    topicId: "stanowiskowe",
    question: "Przed czyszczeniem maszyny należy:",
    options: [
      "Zwolnić obroty do minimum",
      "Wyłączyć zasilanie i upewnić się, że maszyna stoi",
      "Poprosić kolegę o nadzór",
      "Założyć grubsze rękawice",
    ],
    correct: 1,
  },
  {
    id: 14,
    topicId: "zagrozenia",
    question: "Uszkodzony przewód elektryczny należy:",
    options: [
      "Owinąć taśmą izolacyjną i pracować dalej",
      "Zgłosić przełożonemu i wyłączyć z użytku",
      "Wymienić samodzielnie",
      "Ignorować, jeśli urządzenie działa",
    ],
    correct: 1,
  },
  {
    id: 15,
    topicId: "przepisy",
    question: "Wypadek przy pracy należy zgłosić:",
    options: [
      "Niezwłocznie przełożonemu",
      "Do końca tygodnia",
      "Tylko jeśli wymaga hospitalizacji",
      "Po konsultacji z prawnikiem",
    ],
    correct: 0,
  },
];

export const PASS_THRESHOLD = 0.8;
export const QUIZ_LENGTH = 10;
export const QUIZ_TIME_SECONDS = 10 * 60;
