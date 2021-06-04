import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bill } from '../model/bill';
import { Item } from '../model/item';
import {BillInfo} from '../model/billInfo';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  private billUrl = 'api/bill';

  private setHeader(){
    const token = "Bearer " + localStorage.getItem("JWT");
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

  addBill(bill: Bill): Observable<Bill> {
    let items: Item[] = [];
    items = JSON.parse(localStorage.getItem("cart"));

    let billInfos:BillInfo[] =[];
    items.forEach(item => {
      var billInfo: BillInfo ={
        id : null,
        billId : null,
        comId : item.computer.id,
        price : item.computer.price,
        quanLiTy : item.quanLiTy
      }
      billInfos.push(billInfo);
    });

    bill.billInfo = billInfos;
    console.log(bill);
    return this.http.post<Bill>(this.billUrl, bill, {headers : this.setHeader()});
  }

  getBill(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.billUrl,{headers : this.setHeader()});
  }
}
