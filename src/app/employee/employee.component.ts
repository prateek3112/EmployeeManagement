import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../appservices/employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeComponent implements OnInit {
  title = 'appBootstrap';
  empForm : FormGroup;
  isEdit:Boolean = false;
  formValue:{}= {};
  @ViewChild('mymodal',{static:false}) modal : ElementRef; 
  @ViewChild('f',{static:false}) form : ElementRef; 

  closeResult: string;
  employees : {}[] =[];
  update: any;
  constructor(private modalService: NgbModal, private service : EmployeeService) { }
  open(content) {
    this.modalService.open(content,{
      
       
      windowClass: 'mod'
  })
  }
  ngOnInit(): void {
    this.getEmp();
  }

getEmp(){
  this.service.getEmployees().subscribe((res : any[]) =>{
    this.employees = res;
  })
}
upEmp(emp){
  this.update = emp;
  this.isEdit = true;
  this.modalService.open(this.modal);
  
  this.formValue = {_id: this.update._id,name: this.update.name,position: this.update.position,dept: this.update.dept}

 
}

  onSubmit(form : NgForm){
 if(this.isEdit){
   this.service.upEmp(form.value,this.update._id).subscribe( (res : any[]) =>{
    this.employees = [res];
    
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Employee Details have been Modified!',
      showConfirmButton: false,
      timer: 1500
    })
    this.getEmp();
  });

 }
 else{

    this.service.addEmployee(form.value).subscribe( (res : any[]) =>{
      this.employees = [res];
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'New Employee has been added',
        showConfirmButton: false,
        timer: 1500
      })
      this.getEmp();
    });

  }
  }

  onDelete(id){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteEmployee(id).subscribe( (res : any[]) =>{
        },
        (err)=>{
        console.log("error",err);
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
      this.getEmp();
    })

  }

  onClick(){
    this.modalService.dismissAll();
  }

}
