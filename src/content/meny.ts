export type Dish = {
  name: string;
  price: string;
  text: string;
  tag?: string;
};

export type Category = {
  id: string;
  title: string;
  blurb: string;
  image: string;
  dishes: Dish[];
};

// Prices follow the published menu on laolita.se and their menu template.
// Nachos + guacamole is 100 kr in the template; the live page did not print a price.
// Churros is 120 kr in the template. A takeaway listing showed 80 kr for a sweet
// with dulce de leche and Nutella. Popcorn shrimp is omitted because no price was published.
export const categories: Category[] = [
  {
    id: "tacos",
    title: "Tacos",
    blurb: "Där gatumat möter dukningen.",
    image: "/images/cat-tacos.jpg",
    dishes: [
      {
        name: "Tempurafriterad blomkål",
        price: "170 kr",
        text: "Går även att få vegansk. Innehåller gluten.",
        tag: "Veg",
      },
      {
        name: "Carnitas",
        price: "190 kr",
        text: "Traditionella fläsktacos, tre stycken.",
      },
      {
        name: "Epic fish taco",
        price: "190 kr",
        text: "Innehåller gluten.",
      },
      {
        name: "Coconut shrimp",
        price: "210 kr",
        text: "Kokosfriterade tigerräkor med coleslaw, pico de gallo och mango-habanero, toppade med rostade kokosflakes.",
      },
    ],
  },
  {
    id: "quesadillas",
    title: "Quesadillas",
    blurb: "Vikta, grillade och redo att delas.",
    image: "/images/cat-quesadilla.jpg",
    dishes: [
      {
        name: "Avokado",
        price: "170 kr",
        text: "Grillade bönor, chipotlestekt majs och färsk avokado. Går att få vegansk.",
        tag: "Veg",
      },
      {
        name: "Chorizo",
        price: "180 kr",
        text: "Krispig chorizofärs, jalapeños och chipotlemaj.",
      },
      {
        name: "Tinga de pollo",
        price: "180 kr",
        text: "Tomat- och chipotlekyckling med chipotlemayo.",
      },
    ],
  },
  {
    id: "tillbehor",
    title: "Tillbehör",
    blurb: "Till bordet, eller innan huvudrätten landar.",
    image: "/images/cat-sides.jpg",
    dishes: [
      {
        name: "Totopos – nachotallrik",
        price: "130 kr",
        text: "Majsnachos med smält ost, guacamole, salsa och pico de gallo.",
      },
      {
        name: "Elotes",
        price: "85 kr",
        text: "Grillad majs med fetaoströra och tajín.",
      },
      {
        name: "Chipotle fries",
        price: "85 kr",
        text: "Sötpotatispommes med pico de gallo och chipotlemayo.",
      },
      {
        name: "Nachos + salsa",
        price: "70 kr",
        text: "Totopos med salsa.",
      },
      {
        name: "Nachos + guacamole",
        price: "100 kr",
        text: "Totopos med guacamole.",
      },
      {
        name: "Guacamole",
        price: "75 kr",
        text: "Egen, med lime och koriander.",
      },
      {
        name: "Papas de La Olita",
        price: "70 kr",
        text: "Smashad friterad potatis med het árbolsalsa och pico de gallo.",
      },
    ],
  },
  {
    id: "desserter",
    title: "Desserter",
    blurb: "Socker, kanel och en sista ljuslåga.",
    image: "/images/cat-sweets.jpg",
    dishes: [
      {
        name: "Churros",
        price: "120 kr",
        text: "Med kanel och socker. Serveras med dulce de leche och Nutella.",
      },
      {
        name: "Flan",
        price: "80 kr",
        text: "Mexikansk crème caramel med hallon- och myntakräm.",
      },
    ],
  },
  {
    id: "dryck",
    title: "Dryck",
    blurb: "Margaritas, öl med lime, och husets lager.",
    image: "/images/cat-drinks.jpg",
    dishes: [
      {
        name: "Margarita",
        price: "140 kr",
        text: "Tequila Altos. Classic, passionsfrukt, jordgubb, mango, kokos eller spicy.",
      },
      {
        name: "Margarita skakad",
        price: "155 kr",
        text: "Altos Reposado och Cointreau. Classic, eller passionsfrukt, jordgubb, kokos eller spicy.",
      },
      {
        name: "Pitcher frozen margarita",
        price: "800 kr",
        text: "Till bordet.",
      },
      {
        name: "Michelada",
        price: "110 kr",
        text: "Flaskaöl, kockens chilijuice, färskpressad lime och Clamato.",
      },
      {
        name: "Chelada",
        price: "100 kr",
        text: "Flingsalt i kanten, färskpressad lime och ljus flaskaöl.",
      },
      {
        name: "Lagerita",
        price: "140 kr",
        text: "Frozen margarita toppad med ljus flaskaöl.",
      },
      {
        name: "La Olita Lager",
        price: "80 kr",
        text: "40 cl.",
      },
      {
        name: "El Rafine",
        price: "140 kr",
        text: "Mörk rom, passionsfrukt, lime och ginger ale.",
      },
    ],
  },
];
