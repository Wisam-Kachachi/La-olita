# La Olita

Svensk sajt för restaurangen och food trucken på Skånegatan 87, Nytorget.

## Köra lokalt

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000).

## Bordsbokning

Formuläret på `/boka` börjar på dagens datum. Restaurangen har 40 platser (`platser` i `src/content/site.ts`). En bokning håller de platserna i 1,5 timme, och tider som inte rymmer sällskapet går inte att välja. Bokningarna sparas i `data/bookings.json`.

Kopiera `.env.example` till `.env.local` och fyll i SMTP om restaurangen också ska få ett mejl. Bokningen sparas även utan SMTP.

`BOOKING_TO_EMAIL` är mottagaren. Standard är `laolita.swe@gmail.com`.
