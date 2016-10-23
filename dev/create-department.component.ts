import {Component, EventEmitter} from 'angular2/core';
import {HttpService} from './services/http.service';

@Component({
    selector: 'edetek-create-department',
    templateUrl: '../templates/create-department.tpl.html',
    outputs: ['newDepartmentCreated'],
    providers: [HttpService]
})

export class CreateDepartmentComponent {
    addDepartmentInputs = false;
    newDepartment: any;
    newDepartmentCreated =new EventEmitter<string>();

    constructor(private _httpService: HttpService){}

    showAddDepartmentInputs() {
        this.addDepartmentInputs = !this.addDepartmentInputs;
    }
    createDepartment(department: any) {
        this.newDepartment = {};
        this.newDepartment.name = department.name.value;
        this.newDepartment.description = department.description.value;
        
        return this._httpService.createDepartment(this.newDepartment)
            .subscribe(
                response => {
                    this.newDepartmentCreated.emit('departmentCreated');
                    this.addDepartmentInputs = false;
                    this.newDepartment = {};
                }, error => {
                    console.log(error)
                }
            )
    }
}

