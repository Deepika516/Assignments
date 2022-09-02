import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/common/enums/role';
import {IUser} from 'src/app/interface/user';
import * as data from 'src/json/employee.json';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

// enum Role {
//   SuperAdmin="SUPERADMIN",
//   Admin="ADMIN",
//   Subscriber="SUB"
// }
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  employeesjson=data;           //fetching data from json
 // users: IUser<string,number>[]="data" as any;
  hideTable = false;
  role:Role=Role.Subscriber
  roles=["SuperAdmin","Admin","Subscriber"]
  constructor(){
      
   }
    
  ngOnInit(): void {

  }

//on the click of load data
  onClick()
  {
    this.hideTable = true;
    const loadbtn = document.getElementById("loadData") as HTMLElement; 
    loadbtn.innerHTML = "Refresh Data"; 
  
  }

//on the click of Edit button
    onEditClick(user: any){
    this.employeesjson.employees.forEach(element => {
        element.isEdit=false;
      });
      user.isEdit = true;
    }

//on the click of Save Button
    onSaveClick(user:any){
      user.isEdit=false;
    }
        
//On the click of Cancel Button
    onCancel(user: any){
      user.isEdit = false;
    }

// On the Click of Delete button
    onDelete(id:any){
      let response: any = confirm("Are you sure you want to delete this permanently?");
      if (response)
       {
          for(let i = 0; i < this.employeesjson.employees.length; ++i)
          {
            if (this.employeesjson.employees[i].id === id) 
            {
            this.employeesjson.employees.splice(i,1);
            }
          }
       }
    }
}
