//import "./styles.css";                                 
import data from "./employees.json";
import { IUser } from "./interfaces/users";
import "./css/bootstrap.min.css";
import "./js/bootstrap.min.js";
import { Role } from "./cmn/enums/role";
import { User } from "./class/user";
//import { event } from "jquery";


const employees: IUser<string,number>[] = data.employees as any;
const loadBtn: any = document.querySelector("#loadBtn");
const tableContainer: any = document.querySelector("#table-container");
const thead:any=document.querySelector("#thead");
let X :IUser<string,number>;
let Y :IUser<number,string>;

 thead.style.display = "none";
           

function buildColumns<T>(): string[] {
    const employee = employees[0];
    const columns = Object.keys(employee);
    return columns;
}

function refresh<X>(): any {
   const role=Role;
//    const roles=["SuperAdmin","Admin","Subscriber"]
    if (!tableContainer) return;
    const columns = buildColumns();
  
    const tbody: any = document.getElementById('tablebody');
    tbody.innerHTML = "";
    employees.forEach((emp) => {
        
        // console.log(emp)
        const row: HTMLTableRowElement = document.createElement("tr");
        row.setAttribute("id", String(emp.id));
        const columnElements = columns.map((col) => {
            const colE1 = document.createElement("td");
            colE1.innerText = (emp as any)[col] as string;
            return colE1;
            
        });

        row.append(...columnElements, createEditButton(emp), createDeleteButton());
        tbody.appendChild(row);
    })
}

function editOperation<T>(e: any, empId: Number): void {
    let currentRow: HTMLBodyElement = e.target.parentElement;
    const columns = buildColumns();
    let emp = employees.find(e => e.id == empId);
    debugger
    if (!!emp) {
        debugger
        const columnElements = columns.map((col) => {
            console.log(col);
            const inputControl: any = document.createElement("input");
            inputControl.setAttribute("type", "text");
            inputControl.value = (emp as any)[col] as string;
            return inputControl;
        });
        currentRow.innerHTML = "";
        currentRow.append(...columnElements);
        currentRow.append(createSaveButton(emp), createCancelButton(emp));
    }
}

function cancelOperation(e: any, emp: IUser<string,number>): void {
    let currentRow: HTMLBodyElement = e.target.parentElement;
    // let emp=employees.find(e=>e.id==empId);
    if (!!emp) {
        const columns = buildColumns();
        const columnElements = columns.map((col) => {
            const colE1 = document.createElement("td");
            colE1.innerText = (emp as any)[col] as string;
            return colE1;
        });

        currentRow.innerHTML = "";
        currentRow.append(...columnElements);
        currentRow.append(createEditButton(emp), createDeleteButton());
    }
}

function saveOperation(e: any, emp: IUser<string,number>): void {
    cancelOperation(e, emp);

}

function deleteOperation(e: any): void {
    let response: any = confirm("Are you sure you want to delete this permanently?");
    if (response) {
        let tbody: any = document.getElementById('tablebody');
        let currentRow = e.target.parentElement;
        tbody.removeChild(currentRow);
    }
}

const onInputChange = (e: any, emp: any) => {
    emp[e.target.id] = e.target.value;
    console.log(emp)
}

function createEditButton(emp: IUser<string,number>): HTMLButtonElement {
    const editButton: HTMLButtonElement = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.setAttribute("class", "btn btn-info me-2 my-1");
    //editButton.setAttribute('onclick', `editOperation(event,'${emp.id}')`);
    // return editButton;

    // function editOperation(e:any,empId:string){
    editButton.addEventListener("click", (e: any) => {

        let currentRow: HTMLBodyElement = e.target.parentElement;
        const columns = buildColumns();
        console.log(columns);
        // let emp=employees.find(e=>e.id==empId);
        if (!!emp) {
            const columnElements = columns.map((col,i) => {
                
                debugger
                let inputControl: any ;
                if (col=="role")
                {
                     inputControl= document.createElement("select");
                    // inputControl.setAttribute("type", "select");
                    Object.keys(Role).forEach(function (ele:any) {
                        if (isNaN(ele)) {
                            var option = document.createElement('option');
                            option.value = Role[ele];
                            option.innerText = ele;
                            inputControl.appendChild(option);
                        }
                       
                        inputControl.value = ((emp as any)[col] as number);
                    });
                }
                else if(col=="doj")
                {
                    debugger
                inputControl = document.createElement("input");
                inputControl.setAttribute("type", "date");
                inputControl.setAttribute("value", (emp as any)[col]);
                }
                else
                {
                    inputControl = document.createElement("input");
                    debugger
                inputControl.setAttribute("type", "text");
                inputControl.setAttribute("value", (emp as any)[col]);
                }
                // const inputControl: any = document.createElement("input");
                inputControl.setAttribute("class","form-control")
                inputControl.setAttribute("id", col)
                
                inputControl.addEventListener("change", (e: any) => {
                    onInputChange(e, emp)
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

function createDeleteButton(): HTMLButtonElement {
    const deleteButton: HTMLButtonElement = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("class", "btn btn-info my-1");
    deleteButton.addEventListener("click", (e) => {
        deleteOperation(e);
    })
    return deleteButton;
}
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

function createCancelButton(emp: IUser<string,number>): HTMLButtonElement {
    const cancelButton: HTMLButtonElement = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.setAttribute("class", "btn btn-info my-1");
    //cancelButton.setAttribute('onclick', `cancelOperation(event,'${emp.id}')`);
    cancelButton.addEventListener("click", (e: any) => {
        cancelOperation(e, emp);
    })
    return cancelButton;
}

loadBtn.addEventListener("click", (e: any) => {
    if (!tableContainer) return;
    thead.style.display = "table-header-group";

    loadBtn.innerText = "Refresh data";
    refresh();
})





