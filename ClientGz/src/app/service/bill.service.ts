import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bill } from '../model/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }
  private billUrl = 'api/bill';

  addBill(bill: Bill): Observable<Bill> {
    const token = "Bearer " + localStorage.getItem("JWT");

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<Bill>(this.billUrl, bill, { headers });
  }

  getBill(): Observable<Bill[]> {
    const token = "Bearer " + localStorage.getItem("JWT");

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    headers = headers.append('Content-Type', 'application/json');

    return this.http.get<Bill[]>(this.billUrl,{headers});
  }
}
