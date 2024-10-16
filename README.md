# La base del progetto: App Component
In questo progetto Angular, la base di tutto si trova in **app.component.@**, dove risiede la root, ovvero ciò che rende possibile far partire il progetto;
(per app.component.@ si intendono i vari app.component.hmtl, .ts, .css, .spec.ts). 
Oltre a questo è il contenitore di tutti gli altri componenti di cui si parlerà fra poco.
Il file **index.html**, è invece il file che viene effettivamente caricato sul browser, ed anche in esso è presente la root del progetto.

## App Module
Qui vengono importati sia i componenti all'interno di App Component che altri componenti di Angular.

## Gestione accesso: Login Component
In questo componente viene gestito l'accesso alla tabella dei clienti, tramite la gestione di username e password. 
La parte focale del codice è situata nel metodo **onSubmit()**, che permette al click sul tasto invio di accedere al metodo getClient presente nella component clienti.
Questo è possibile poichè all'interno di login.component.ts, vi è una Injection di Auth Service ed un utilizzo del metodo authenticate(), per autenticare l'accesso a clienti.

## La tabella dei clienti: Clienti Component
Con l'accesso al metodo **getClient()** grazie all'onSubmit() di LoginComponent, possiamo ottenere la lista dei clienti, che si trovano all'interno del file **db.json**.
Il metodo **ngOnInit()** viene eseguito quando il componente viene caricato per la prima volta, **onEdit()** permette di modificare ogni cliente, **onDelete()** di eliminarli, **mostra()** a rendere visibile il form di modifica/aggiunta di ogni cliente; **onSubmit()** di ClientiComponent, serve per l'invio del form.



