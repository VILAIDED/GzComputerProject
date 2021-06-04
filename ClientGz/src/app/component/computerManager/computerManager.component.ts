import { Component, OnInit } from '@angular/core';
import {Computer} from '../../model/computer';
import {ComputerService} from '../../service/computer.service';
import {MatDialog} from '@angular/material/dialog';
import {ComputerManagerDialogComponent} from '../computerManager-dialog/computerManager-dialog.component';
import {Router} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-computerManager',
  templateUrl: './computerManager.component.html',
  styleUrls: ['./computerManager.component.css']
})
export class ComputersManagerComponent implements OnInit {

  constructor(private computerService: ComputerService,
    public dialog: MatDialog,
    ) { }
  

  ngOnInit(): void {
    this.getComputers();
  }

  computers : Computer[] =[];
  computer_local :Computer;

  getComputers(): void
  {
    this.computerService.getComputers()
    .subscribe(computers => {
      this.computers = computers;
    });
  }

  add(computer: Computer): void {
    this.computerService.addComputer(computer)
      .subscribe(computer => {
        this.computers.push(computer);
      });
  }

  update(computer: Computer):void
  {
    this.computerService.updateComputer(computer.id,computer).subscribe();

    let i =0;
    this.computers.forEach(function(item,index)
    {
      if(item.id == computer.id)
      {
        i = index; 
      }
    })
    this.computers[i] = computer;
  }
  
  openDialog(action,obj) {
    
    obj.action = action;
    const dialogRef = this.dialog.open(ComputerManagerDialogComponent, {
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      {
        if(result.event == 'Add')
          this.add(result.data);
        if(result.event == 'Detail')
          this.update(result.data);
      }
    });
  }

  search(name: string){
    const comFind: Computer[] = [];
    this.computers.forEach(function(item)
    {
      if(item.name.includes(name))
      {
        comFind.push(item);
      }
    })

    this.computers = comFind;
  }
  
  getSort(sort:string)
  {
      if(sort == "incre")
      {
        this.computers =_.sortBy(this.computers,['price']);
      }
      if(sort == "desc")
      {
        this.computers = _.sortBy(this.computers,['price']).reverse();
      }
  }

}
