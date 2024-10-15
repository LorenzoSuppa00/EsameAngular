import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client, ClientService } from '../client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// export interface Customer {
//   id: number;
//   codiceFiscale: string;
//   nome: string;
//   cognome: string;
//   dataNascita: Date;
//   azienda: string;
// }

// const ELEMENT_DATA: Customer[] = [
//   {id:1, codiceFiscale: 'XYZ123ABC456', nome: 'Mario', cognome: 'Rossi', dataNascita: new Date(), azienda: 'Acme'},
//   // ... altri clienti
// ];


@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrl: './clienti.component.css'
})


export class ClientiComponent implements OnInit {
  displayedColumns: string[] = ['id','codiceFiscale', 'nome', 'cognome', 'dataNascita', 'azienda', 'edit', 'delete'];
  customers: Client[] = [];

  userForm: FormGroup;

  isVisible: boolean = false;

  selectedClienteId: number | null = null;

  constructor(private clientiService: ClientService, private fb: FormBuilder) { 
    this.userForm = this.fb.group({
      codiceFiscale: ['', Validators.required],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      dataNascita: ['', Validators.required],
      azienda: ['', Validators.required]
    });

  }

  getClient():void{
    let id = sessionStorage.getItem('userId');
    this.clientiService.getClientById(parseInt(id as string)).subscribe({
      next: (clienti: Client[]) => {
        this.customers = clienti;
      },
      error: (err) => {
        console.error('Errore del server', err);
      }
    });
  }

  ngOnInit(): void {
    this.getClient();
  }

  onEdit(cliente: Client): void {
    this.isVisible = true;
    this.userForm.patchValue({
    codiceFiscale:cliente.codiceFiscale,
    nome:cliente.nome,
    cognome:cliente.cognome,
    dataNascita: cliente.dataNascita,
    azienda:cliente.azienda
  });
  this.selectedClienteId = cliente.id
  }

  onDelete(cliente: Client): void {
    if (confirm(`Sei sicuro di voler eliminare il cliente? `)) {
    this.clientiService.deleteCliente(cliente).subscribe({
      next: (response) => {
        console.log('Cliente eliminato con successo');
        this.getClient(); 
      },
      error: (err) => {
        console.error('Errore durante l\'eliminazione del cliente:', err);
      }
    });
  }
  }

  onSubmit(): void{
    let id = sessionStorage.getItem('userId');
    if(this.userForm.valid){
      if(this.selectedClienteId === null){ 
      const cliente =  {...this.userForm.value, userId: id };
      this.clientiService.addClient(cliente).subscribe(
        {
          next: (response) => {
            this.isVisible = false;
            this.getClient();
          },
          error: (err) => {
            console.error('Errore durante l\'aggiunta del cliente', err);
          }
        });
    } else {
      const cliente = {...this.userForm.value, userId: id, id: this.selectedClienteId };
      this.clientiService.updateClient(cliente).subscribe(
        {
          next: (response) => {
            this.getClient();
            this.selectedClienteId = null;
          },
          error: (err) => {
            console.error('Errore durante la modifica del cliente', err);
          }
        });
    }
  } 
}

  mostra():void {
    this.isVisible = !this.isVisible;
  }

}


