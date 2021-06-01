import { Injectable } from '@angular/core';
import { Computer } from '../model/computer';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  constructor(
    private http: HttpClient
  ) { }

  private computerUrl = 'api/computer';

  getComputers(): Observable<Computer[]> {
    return this.http.get<Computer[]>(this.computerUrl);
  }

  getComputer(id: number): Observable<Computer> {
    const url = `${this.computerUrl}/${id}`;
    return this.http.get<Computer>(url);
  }

  addComputer(computer: Computer): Observable<Computer> {
    const token = "Bearer " + localStorage.getItem("jwt");

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<Computer>(this.computerUrl, computer, { headers });
  }

  updateComputer(id: number, computer: Computer): Observable<any> {
    const url = `${this.computerUrl}/${id}`;
    return this.http.put(url, computer, this.httpOptions);
  }
  deleteComputer(id: number): Observable<Computer> {
    const url = `${this.computerUrl}/${id}`;

    return this.http.delete<Computer>(url, this.httpOptions);
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

}