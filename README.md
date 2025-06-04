# Dynamisk bygging av skjema med JSON

🌐 **Live demo:** [www.json-form.sindresau.me](https://json-form.sindresau.me)

## 🎯 Oversikt

- ✅ Dynamisk generering av skjemaer fra JSON
  - Enten lastet opp fra fil, redigert i nettleseren eller lastet fra fil i koden
- ✅ Typesikker JSON-validering med Zod
- ✅ Gjenbrukbare UI-komponenter
- ✅ Live JSON-editor for testing
- ✅ Responsivt design med Tailwind CSS

## Forklaring av prosjektet:

### Validering av JSON

- Tanken her var å ha en gjenbrukbar funksjon som tar inn et ferdig "parsed" JSON-objekt og validerer det ved å bruke biblioteket Zod.
  - Dette lar meg dele opp validering i mindre biter og dermed gjøre det enklere å legge til flere "Fields" i fremtiden.
  - Se `src/utils/validation/form-schema.ts` for mer informasjon.
  - Mens jeg jobbet med valideringen, satte jeg også opp et enkelt testmiljø som kan skalere med valideringen og utvidelse av struktur i JSON.

### Dynamisk skjema og gjenbrukbare komponenter

- Det første jeg gjorde var å lage gjenbrukbare, egne komponenter for de forskjellige feltene i skjemaet.

  - Dette er gjort i `src/components/ui`.
  - Komponenetene er inspirert av måten Shadcn/ui lage komponenter på, ved bruk av biblioteker som `cva`, `tailwind-merge` og `clsx`.

- Videre laget jeg komponenten `DynamicForm` i `src/components/DynamicForm.tsx`.
  - Denne komponenten tar inn et ferdig "parsed" JSON-objekt som inneholder informasjon om feltene som skal vises i skjemaet.
  - Her importeres FormSchema som en type for JSON-objektet, og denne er generert ut fra samme zod skjema som brukes til validering.
  - For å dynamisk generere feltene i skjemaet, bruker jeg `schema.fields.map()` for å iterere over feltene, og ettersom det ikke finnes "id" felt i JSON-objektet, genererer jeg et unikt id for hvert felt ved å bruke `crypto.randomUUID()`.
  - Før skjemaet rendres, valideres det ved hjelp av `validateFormSchema` funksjonen fra `src/utils/validation/form-schema.ts` og det vises en feilmelding hvis valideringen feiler.

### JSON Editor

- For å gjøre det enklere å vise frem funksjonaliteten og teste skjemabygging har jeg også raskt implementert en JSON-editor.
  - Denne finnes i `src/components/json-editor.tsx`.
  - Dennne kunne nok vært mer robust, men her er nå kun for å vise at det kastes feilmedlinger hvis JSON-struktur er feil og at skjemaet oppdateres dynamisk.

### Validering i selve skjemaet

- Her har jeg for øyeblikket kun latt innebygd html-validering håndtere validering av feltene.
  - Dette er gjort ved å bruke `required` dersom feltet er påkrevd i henhold til JSON-strukturen.
  - Utover dette har hver type felt sin egen validering, for eksempel har`email`-feltet `type="email"` for å validere e-postformat.
- Dersom man skulle bygget videre på valideringen av skjemaet ville jeg sett for meg at dette også må konfigureres på en måte når man bygger JSON-strukturen.
  - Man kunne da for eksempel lagt til et felt i JSON for validering som definerer hvilke zod regler som skal brukes for hvert felt.
  - På denne måten kan man også ha spesifikke tilbakemeldinger basert på valideringsfeilen.

## Siste tanker

- Jeg ser for meg at de som faktisk skal bygge dynamiske skjemaer ikke kommer til å bruke en text-editor til å skrive JSON - men at det heller bygges et eget UI som et slags "drag and drop" grensesnitt for å bygge skjemaet.
  - Dersom dette er tilfellet vil man jo også ha mer kontroll over hva som er mulig å redigere, noe som også vil gjøre det enklere å validere JSON-strukturen. For øyeblikket kan jo på en måte alt skje, og det er derfor ikke lagt inn veldig bestemte valideringsregler for JSON-strukturen.
  - I scenarioet der det heller bygges et slags CMS med drag and drop ser jeg også for meg at man kan ha en egen database med preset-komponenter for de ulike feltene, og kanskje til og med komboer av felter, for eksempel:
    - En "adresse"-komponent som inneholder både gateadresse, postnummer og by.
    - En "kontaktinfo"-komponent som inneholder både e-post og telefonnummer.
    - En mer avansert telefon-nummer komponent, som tar hensyn til landskoder og validerer at nummeret er gyldig for det valgte landet.

Hva jeg gjerne skulle brukt mer tid på:

- Bedre feilmeldinger i for JSON-validering
- Bedre håndtering av validering i selve skjemaet, inkludert konfigurering av disse fra JSON-strukturen
- Implementert et drag and drop-grensesnitt for å bygge skjemaet i stedenfor å skrive/redigere JSON direkte
