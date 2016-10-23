import {Component} from 'angular2/core';
import {RouteConfig} from "angular2/router";
import {DepartmentsComponent} from './departments.component';
import {EmployeesComponent} from './employees.component'
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
  selector: 'app',
  template: `
    <div class="page-header">
        <h1>EDETEK Coding Exercise</h1>
    </div>
    <router-outlet></router-outlet>
    `,
  // directives: [DepartmentsComponent],
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {
    path: '/departments',
    name: 'Departments',
    component: DepartmentsComponent,
    useAsDefault: true
  },
  {
    path: '/employees/:departmentId',
    name: 'Employees',
    component: EmployeesComponent,
  }
])

export class AppComponent {

}

