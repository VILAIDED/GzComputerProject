import { Component, OnInit } from '@angular/core';
import {Computer} from '../../model/computer';
import {ComputerService} from '../../service/computer.service';
import {MatDialog} from '@angular/material/dialog';
import {ComputerManagerDialogComponent} from '../computerManager-dialog/computerManager-dialog.component';
import {Router} from '@angular/router';
import { TestModel } from '../../model/testModel';
import { TestService } from '../../service/test.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-computersManager',
  templateUrl: './computersManager.component.html',
  styleUrls: ['./computersManager.component.css']
})
export class ComputersManagerComponent implements OnInit {

  constructor(private computerService: ComputerService,
    public dialog: MatDialog,
    private router: Router,
    private testService: TestService, 
    ) { }
  

  ngOnInit(): void {
    this.getComputers();
  }

  computers : Computer[] =[];

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
  
  delete(id: number):void
  {
    this.computers = this.computers.filter(h => h.id !== id);
    this.computerService.deleteComputer(id).subscribe();
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
        if(result.event == 'delete')
          this.delete(result.data);
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


  testModel: TestModel;
  action() {
    this.testService.getTest().subscribe(testModel => this.testModel = testModel);
    console.log("call api");
    console.log(this.testModel)
  }


  //////////////////

  funcTest() {
    console.log("hello this is test js");
    
    for(var i=1;i<10;i++)
    {
      console.log(i);
    }

    console.log(i);
    console.log(i);
    
  }

}
