import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/enums/role.enum';
import * as data from 'src/json/employee.json';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  employeesjson=data;           
  hideTable = false;
  role:Role=Role.Subscriber
  roles=["SuperAdmin","Admin","Subscriber"]
 
  constructor(){

  }
    
  ngOnInit(): void {

  }

  onClick()
  {
    this.hideTable = true;
    const loadbtn = document.getElementById("loadData") as HTMLElement; 
    loadbtn.innerHTML = "Refresh Data";
  }

  onEditClick(user: any)
  {
    this.employeesjson.employees.forEach(element => {
        element.isEdit=false;
      });
      user.isEdit = true;
  }

    onSaveClick(user:any){
      user.isEdit=false;
    }

    onCancel(user: any){
      user.isEdit = false;
    }

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
