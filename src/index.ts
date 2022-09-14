import data from "./employees.json";
import { IUser } from "./interfaces/users";
import "../src/bootstrap.min.css";
import "../src/bootstrap.min.js";
import { Role } from "./enums/role.enum";

const employees: IUser<string,number>[] = data.employees as Object;
const loadBtn: HTMLButtonElement = document.querySelector("#loadBtn");
const tableContainer:HTMLTableElement = document.querySelector("#table-container");
const thead: HTMLHeadElement=document.querySelector("#thead");
let X :IUser<string,number>;
let Y :IUser<number,string>;
thead.style.display = "none";

// To show Header Column in the Table
function buildColumns<T>(): string[] {
    const employee = employees[0];
    const columns = Object.keys(employee);
    return columns;
}

//To Show all the json data in a tabulor format 
function refresh<T>(): string {
   const role=Role;
    if (!tableContainer) return;
    const columns = buildColumns();
    const tbody: HTMLElement = document.getElementById('tablebody');
    tbody.innerHTML = "";
    employees.forEach((emp) => {
        const row: HTMLTableRowElement = document.createElement("tr");
        row.setAttribute("id", String(emp.id));
        const columnElements = columns.map((col) => {
            const colE1 = document.createElement("td");
            colE1.innerText = (emp as IUser<string,number>)[col] as string;
            return colE1; 
        });
        row.append(...columnElements, createEditButton(emp), createDeleteButton());
        tbody.appendChild(row);
    })
}

//working of Cancel button 
function cancelOperation(e:any, emp: IUser<string,number>): void {
    let currentRow: HTMLBodyElement = e.target.parentElement;
    if (!!emp) {
        const columns = buildColumns();
        const columnElements = columns.map((col) => {
            const colE1 = document.createElement("td");
            colE1.innerText = (emp as IUser<string,number>)[col] as string;
            return colE1;
        });
        currentRow.innerHTML = "";
        currentRow.append(...columnElements);
        currentRow.append(createEditButton(emp), createDeleteButton());
    }
}

function saveOperation(e: MouseEvent, emp: IUser<string,number>): void {
    cancelOperation(e, emp);
}

//working of delete button that when we want to delete a specipic row it should ask then delete
function deleteOperation(e:any): void {
    let response: boolean = confirm("Are you sure you want to delete this permanently?");
    if (response) {
        let tbody: HTMLElement = document.getElementById('tablebody');
        let currentRow = e.target.parentElement;
        tbody.removeChild(currentRow);
    }
}

const onInputChange = (e: any, emp:IUser<string,number>) => {
    emp[e.target.id] = e.target.value;
}

//On the click of Edit Button Specific Row become Textable and Save & cancel button Shows and edit & delete button hide  
function createEditButton(emp: IUser<string,number>): HTMLButtonElement {
    const editButton: HTMLButtonElement = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.setAttribute("class", "btn btn-info me-2 my-1");
    editButton.addEventListener("click", (e: any) => {
    let currentRow: HTMLBodyElement = e.target.parentElement;
        const columns = buildColumns();
        if (!!emp) {
            const columnElements = columns.map((col,i) => {
                let inputControl: any ;
                console.log(typeof inputControl);
                //To Show Role as enum in dropdown while Editing 
                if (col=="role")
                {
                     inputControl= document.createElement("select");
                   
                     Object.keys(Role).forEach(function (ele:string) {
                        if (isNaN(ele)) {
                            var option = document.createElement('option');
                            option.value = Role[ele];
                             option.innerText = ele;
                            inputControl.appendChild(option);
                        }
                     
                        inputControl.value = ((emp as IUser<string,number>)[col] as number);
                    });
                }
                // To format the date while editing
                else if(col=="doj")
                {
                inputControl = document.createElement("input");
                inputControl.setAttribute("type", "date");
                inputControl.setAttribute("value", (emp as IUser<string,number>)[col]);
                }
                else
                {
                inputControl = document.createElement("input");
                inputControl.setAttribute("type", "text");
                inputControl.setAttribute("value", (emp as IUser<string,number>)[col]);
                }
                inputControl.setAttribute("class","form-control");
                inputControl.setAttribute("id", col);
                inputControl.addEventListener("change", (e: any) => {
                    onInputChange(e, emp);
                })
                const colE1 = document.createElement("td");
                colE1.appendChild(inputControl);
                return colE1;
            });
            currentRow.innerHTML = "";
            currentRow.append(...columnElements);
            currentRow.append(createSaveButton(emp), createCancelButton(emp));
        }
    })
    return editButton;
}

//On click of delete button it deleted the specific row 
function createDeleteButton(): HTMLButtonElement {
    const deleteButton: HTMLButtonElement = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("class", "btn btn-info my-1");
    deleteButton.addEventListener("click", (e) => {
        deleteOperation(e);
    })
    return deleteButton;
}

//On click of Save Button it update the row On which we did changes
function createSaveButton(emp: IUser<string,number>): HTMLButtonElement {
    const saveButton: HTMLButtonElement = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.setAttribute("type","button");
    saveButton.setAttribute("class", "btn btn-info my-1");
    saveButton.addEventListener("click", (e) => {1
        saveOperation(e, emp);
    })
    return saveButton;
}

//on the click of cancel button all textable input feild back to normal input feild
function createCancelButton(emp: IUser<string,number>): HTMLButtonElement {
    const cancelButton: HTMLButtonElement = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.setAttribute("class", "btn btn-info my-1");
    cancelButton.addEventListener("click", (e: any) => {
        cancelOperation(e, emp);
    })
    return cancelButton;
}

//On the click of load data it shows all the json data iin tabular format
loadBtn.addEventListener("click", (e:MouseEvent) => {
    if (!tableContainer) return;
    thead.style.display = "table-header-group";
    loadBtn.innerText = "Refresh data";
    refresh();
})





