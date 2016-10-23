import {Injectable} from 'angular2/core'
import {Http, Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'

@Injectable()
export class HttpService {
    constructor(private _http: Http){}

    getDepartments(): Observable<any> {
        return this._http.get('http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/departments/');
    }

    createDepartment(department: {name: string, description: string}): Observable<any> {
        const body = JSON.stringify(department);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/departments', body, {headers})
            .map(res => {
                res.json()
            })
    }

    deleteDepartment(departmentId: number): Observable<any> {
        return this._http.delete('http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/departments/' + departmentId);
    }

    getEmployees(): Observable<any> {
        return this._http.get('http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/employees/');
    }

    createEmployee(employee: {
        firstName: string,
        lastName: string,
        phone: string,
        salary: string,
        departmentId: number,
        departmentName: string
    }):Observable<any> {
        const body = JSON.stringify(employee);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/employees/', body)
            .map(res => {
                res.json()
            })
    }
    
    deleteEmployee(employeeId: number): Observable<any> {
        return this._http.delete('http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/employees/' + employeeId);
    }

    getEmployeesAmount(departmentId: number): Observable<any> {
        return this._http.get('http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/employees/count/' + departmentId);
    }

}
