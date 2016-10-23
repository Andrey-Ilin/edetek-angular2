import {Component, OnInit} from 'angular2/core';
import {HttpService} from './services/http.service';
import {CreateDepartmentComponent} from './create-department.component';
import {Router} from "angular2/router";

@Component({
    selector: 'edetek-departments',
    templateUrl: '../templates/departments.tpl.html',
    directives: [CreateDepartmentComponent],
    providers: [HttpService]
})

export class DepartmentsComponent implements OnInit{
    departments: any;
    
    constructor(private _httpService: HttpService, private _router: Router){}

    ngOnInit():any {
        this.getDepartments();
    }

    getDepartments() {
        return this._httpService.getDepartments()
            .subscribe(
                response => {
                    this.departments = response.json();
                    this.departments.map(function (department) {
                        this.getEmployeesAmount(department.id)
                            .subscribe(
                                response => {
                                    response = response.json();
                                    department.hasEmployees = !response.count;
                                },
                                error => {
                                    console.log(error);
                                }
                            )
                    }.bind(this))

                },
                error => {
                    console.log(error);
                })
    }
    
    deleteDepartment(departmentId: number) {
        return this._httpService.deleteDepartment(departmentId)
            .subscribe(
                response => {
                    this.getDepartments();
                },
                error => {
                    console.log(error);
                }
            )
    }

    getEmployeesAmount(departmentId: number) {
        return this._httpService.getEmployeesAmount(departmentId);
    }

    onNavigate(departmentId: number) {
        this._router.navigate(['Employees', {departmentId: departmentId}]);
    }
}
