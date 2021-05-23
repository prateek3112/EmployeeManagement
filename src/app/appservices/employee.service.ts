import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/employees";

  addEmployee(emp : any){
    return this.http.post(this.url ,emp);
  }

  getEmployees(){
    return this.http.get(this.url);
  }
  deleteEmployee(id :any ){
   return this.http.delete(`${this.url}/${id}`)
  }

  upEmp(emp : any ,id:any){
    return this.http.put(`${this.url}/${id}`,emp);

  }
}

