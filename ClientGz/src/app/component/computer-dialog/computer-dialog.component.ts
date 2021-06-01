import { Component, OnInit } from '@angular/core';
import { Inject, Optional } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
    this.url = data.image;
  }

  ngOnInit(): void {
  }
  addToCart(idCom:number):void
  {
    this.cartService.addToCart(idCom).subscribe();
    this.dialogRef.close();
  }
}

