import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../model/item';
import { Computer } from '../model/computer';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  private cartUrl = 'api/cart';

  addToCart(com: Computer) {
    let items: Item[] = [];
    if (localStorage.getItem("cart") != null) {
      items = JSON.parse(localStorage.getItem("cart"));
    }
    var index = items.findIndex(i => i.computer.id == com.id);

    if (index >= 0) {
      items[index].quanLiTy++;
    } else {
      let item: Item = {
        computer: com,
        quanLiTy: 1
      }
      items.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(items));
  }

  getCart(){
    return JSON.parse(localStorage.getItem("cart"));
  }

  updateCart(idCom: number, plus: boolean, remove: boolean){
    let items: Item[] = [];
    items = JSON.parse(localStorage.getItem("cart"));
    var index = items.findIndex(i => i.computer.id == idCom);

    if (remove != true) {
      if (plus) {
        items[index].quanLiTy++;
      }
      else {
        if (items[index].quanLiTy > 0) {
          items[index].quanLiTy--;
        }
      }
    }
    else {
      items = items.filter(h => h.computer.id !== idCom);
    }

    localStorage.setItem("cart", JSON.stringify(items));
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

}
