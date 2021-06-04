import { Component, OnInit } from '@angular/core';
import { Inject, Optional } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Computer} from '../../model/computer';
import {CartService} from '../../service/cart.service'

@Component({
  selector: 'app-computer-dialog',
  templateUrl: './computer-dialog.component.html',
  styleUrls: ['./computer-dialog.component.css']
})
export class ComputerDialogComponent implements OnInit {

  local_data:any;
  url: any;
  constructor(
    public dialogRef: MatDialogRef<ComputerDialogComponent>,
    private cartService: CartService,   
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Computer
  ) {
    this.local_data = {...data};
    this.url = data.compon.image;
  }

  ngOnInit(): void {
  }

  addToCart():void
  {
    this.cartService.addToCart(this.local_data);
    this.dialogRef.close();
  }
}

