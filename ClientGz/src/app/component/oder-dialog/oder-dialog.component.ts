import { Component, OnInit } from '@angular/core';
import { Bill } from '../../model/bill';
import { BillService } from '../../service/bill.service';

@Component({
  selector: 'app-oder-dialog',
  templateUrl: './oder-dialog.component.html',
  styleUrls: ['./oder-dialog.component.css']
})
export class OderDialogComponent implements OnInit {

  constructor(
    private billService: BillService
  ) { }

  ngOnInit(): void {
    this.getBills();
    console.log(this.bills);
  }

  bills: Bill[] = [];

  getBills(): void {
    this.billService.getBill()
      .subscribe(bills => {
        this.bills = bills;
      });
  }

}
