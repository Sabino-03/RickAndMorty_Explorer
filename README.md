# RickAndMortyExplorer

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.18.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Meaning Of The FE
RickAndMorty_Explorer CONSENTE DI GESTIRE LA rickandmortyapi, EFFETTUANDO PAGINAZIONE E RICERCA (LISTA DI CHARACTERS, LISTA DI EPISODES, LISTA DI LOCATIONS).
IL PROGETTO SI COMPONE DI :
- LOGIN PAGE (route : '/') : FORM COMPLETO DI CAMPO USERNAME E DI CAMPO PASSWORD, IL QUALE CONSENTE DI EFFETTUARE Submit (MEDIANTE LOGIN BUTTON) ;
- EXPLORE PAGE (route : '/explore') : 
    - (route : '') : SI HA PAGINAZIONE (MEDIANTE info.prev E info.next CON OPPORTUNI BUTTON-COMPONENTS) PER LISTA DI CHARACTERS [SISTEMARE] ; FORNENDO IMMAGINE, NOME, STATO, SPECIE ;
    - (route : '/:id') : SI UTILIZZA NAVBAR-COMPONENT + BUTTON-COMPONENT PER EFFETTUARE FASE DI RICERCA NELLA LISTA DI CHARACTERS (CARD PER searchedCharacter + LISTA DI EPISODES) ;
- FAVOURITES PAGE (route : '/favourites') : LISTA CARD PER I PERSONAGGI PREFERITI (SETTATI IN EXPLORE PAGE) ;

## SCELTE TECNICHE
- PERCHÈ switchMap NELLA FASE DI RICERCA ?
    SI UTILIZZA switchMap NELLA FASE DI RICERCA PERCHÈ : INNANZITTUTTO MI SERVE INDIVIDUARE CHI, TRA GLI OPERATORI PIPEABLE, CONSENTE DI GESTIRE UN OBSEVABLE (return VALORI); POSSO INDIVIDUARE concatMap, exhaustMap, mergeMap, switchMap .
    TRA GLI OPERATORI PIPEABLE, ELENCATI, IL PIÙ CONSONO AD UNA FASE DI RICERCA È switchMap PERCHÈ ALLA RICEZIONE DI UN VALORE DI INGRESSO ELABORA ED EMETTE UN OPPORTUNO STREAM DI DATI (OBSERVABLE) MA NEL CASO IN CUI SI PRESENTI UN NUOVO VALORE DI INGRESSO (PRIMA CHE : INNER-OBSERVABLE SI COMPLETI) switchMap PORTA ALLA CANCELLAZIONE DELLA PRECEDENTE FASE DI ELABORAZIONE (PER INNER-OBSERVABLE) VALUTANDO IL NUOVO VALORE DI INGRESSO .
    FASE DI RICERCA "AGGIORNATA E REATTIVA" CHE RESTITUISCE IL RISULTATO DELL'ULTIMA DIGITAZIONE SENZA FAR ATTENDERE (INUTILMENTE) IL RISULTATO DI PRECEDENTI DIGITAZIONI.

- PERCHÈ LO STATO DI PREFERITI STA IN UN SERVICE E NON STA IN UN COMPONENT ?
    favourite.service E NON favourite.component PERCHÈ SI HA LA NECESSITÀ DI INCAPSULARE PROPRIETÀ E METODI ...
    (GENERALMENTE PER UN COMPONENT SI HA UNA LOGICA RISTRETTA ALLE FUNZIONALITÀ FE; LA PARTE DI LOGICA PIÙ COMPLESSA, CHE MAGARI SI HA LA POSSIBILITÀ DI RIUTILIZZARLA PER PIÙ COMPONENT DISTINTI, SI IMPLEMENTA IN OPPORTUNI SERVICES. VEDI character.service O VEDI favourites.service) .

- FUNZIONAMENTO GUARD ?
    AuthGuard PERMETTE DI IMPEDIRE (PER LO USER) EVENTUALE ACCESSO A ROUTES NON CONSENTITE. IL SISTEMA CONSENTE DI INTRODURRE UN BLOCCO (canActivate) , GESTIBILE ROUTE PER ROUTE .
    PER AuthGuard ESSO VALUTA SE USER RISULTA LOGGATO O NON LOGGATO PERMETTENDO, IN CASO DI isLogged$.getValue() === true , DI FARLO ACCEDERE ALLE ROUTES '/explore' , '/favourites' ... ; IN CASO DI LOGOUT AuthGuard NE IMPEDISCE L'ACCESSO .
    SI HA LA POSSIBLITÀ DI IMPLEMENTARE OPPORTUNI guard VOLTI ALLA GESTIONE DELLE FUNZIONALITÀ ACCESSIBILI PER UN ADMIN RISPETTO AD UN CUSTOMER .
    [ATTUALMENTE AuthGuard : CORRETTO FUNZIONAMENTO DI BLOCCO ROUTES, REDIRECT ERRATO IN FASE DI AGGIORNAMENTO]
