import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/enums/role.enum';
import * as data from 'src/json/employee.json';
import {IUser} from 'src/app/interfaces/users.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  employeesjson=data;           
  hideTable = false;
  role:Role=Role.Subscriber;
  roles=Object.keys(Role);
  roleUser=Role;
 
  constructor(){

  }
    
  ngOnInit(): void {
  }

  getRole(r:string){
    switch(r)
    {
      case "Admin":
        return Role.Admin;

        case "SuperAdmin":
        return Role.SuperAdmin;

        case "Subscriber":
        return Role.Subscriber;

        default:
         return
    }
  }
  //on load button click showing all json data in tabular format
  onClick()
  {
    this.hideTable = true;
    const loadbtn = document.getElementById("loadData") as HTMLElement; 
    loadbtn.innerHTML = "Refresh Data";
  }

  //on Edit Button click show specific row in Editable form
  onEditClick(user:IUser)
  {
    this.employeesjson.employees.forEach(element => {
        element.isEdit=false;
      });
      user.isEdit = true;
  }

  // On Save click save the updated row
    onSaveClick(user:IUser){
      user.isEdit=false;
    }

    //on click of cancel it shows all the data in normal non editable form
    onCancel(user:IUser){
      user.isEdit = false;
    }

    //on  delete click it delete the selected row
    onDelete(id:number|string){
      let response: boolean = confirm("Are you sure you want to delete this permanently?");
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
