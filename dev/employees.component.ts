import {Component, OnInit} from 'angular2/core';
import {HttpService} from './services/http.service';
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";

@Component({
    selector: 'edetek-employees',
    templateUrl: '../templates/employees.tpl.html',
    providers: [HttpService]
})

export class EmployeesComponent implements OnInit{

    departments: any;
    departmentId: number;
    employees: any;
    showEmployeeForm = false;

    department: {id: number, name: string, description: string};
    constructor(private _router: Router,
                private _httpService: HttpService,
                private _routeParams: RouteParams){}

    ngOnInit():any {
        this.getDepartments();
        this.getEmployees();
        this.departmentId = +this._routeParams.get('departmentId');
        this.department = {};
    }
    onNavigate() {
        this._router.navigate(['Departments'])
    }

    getDepartments() {
        return this._httpService.getDepartments()
            .subscribe(
                response => {
                    this.departments = response.json();
                    this.department = this.departments.filter(function (department) {
                        return department.id === this.departmentId
                    }.bind(this))[0];
                    console.log(this.department )
                },
                error => {
                    console.log(error)
                }
            )
    }

    getEmployees() {
        this._httpService.getEmployees()
            .subscribe(
                response => {
                    this.employees = response.json().filter(function (employee) {
                        return employee.departmentId === this.departmentId
                    }.bind(this));
                },
                error => {
                    console.log(error);
                }
            )
    }

    showAddEmployeeForm() {
        this.showEmployeeForm = !this.showEmployeeForm;
    }
}

