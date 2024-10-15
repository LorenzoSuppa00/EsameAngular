import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Client {
  id: number;
  codiceFiscale: string;
  nome: string;
  cognome: string;
  dataNascita: Date;
  azienda: string;
  userId: number;
}


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:3000/clienti'; 

  constructor(private http:HttpClient ) { }

  getClientById(id: number): Observable<Client[]> {
    const url = `${this.apiUrl}?${id}`;
    return this.http.get<Client[]>(url);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(cliente: Client): Observable<any> {
    const url = `${this.apiUrl}/${cliente.id}`;
    return this.http.put<any>(url, cliente);
  }

  deleteCliente(cliente: Client): Observable<any> {
    const url = `${this.apiUrl}/${cliente.id}`;
    return this.http.delete<any>(url);
}
}

