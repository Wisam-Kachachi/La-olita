export const restaurant = {
  name: "La Olita",
  address: "Skånegatan 87",
  postal: "116 35 Stockholm",
  phone: "076 163 94 82",
  phoneHref: "tel:+46761639482",
  eventPhone: "070 836 88 22",
  eventPhoneHref: "tel:+46708368822",
  email: "laolita.swe@gmail.com",
  emailHref: "mailto:laolita.swe@gmail.com",
  facebook: "https://www.facebook.com/laolita.swe",
  takeaway: "https://qopla.com/restaurant/la-olita-nytorget/qbgk1BE0Yv/order",
  maps: "https://maps.google.com/?q=Sk%C3%A5negatan+87,+116+35+Stockholm",
  platser: 40,
} as const;

export const nav = [
  { href: "/meny", label: "Meny" },
  { href: "/foodtruck", label: "Foodtruck" },
  { href: "/om-oss", label: "Om oss" },
] as const;
