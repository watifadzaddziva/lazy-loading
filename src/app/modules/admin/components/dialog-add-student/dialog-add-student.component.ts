import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dialog-add-student',
  templateUrl: './dialog-add-student.component.html',
  styleUrls: ['./dialog-add-student.component.scss']
})
export class DialogAddStudentComponent implements OnInit {

  gender= ["female","male"];
  studentForm !: FormGroup;
  actionBtn: string = 'save'

  constructor(private formbuilder: FormBuilder, 
    private api: ApiService,@Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogAddStudentComponent>
    ){}
  ngOnInit(): void {

    this.studentForm = this.formbuilder.group({
      regNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      level: ['', Validators.required],
      gender: ['', Validators.required],

    });
    if(this.editData){
      this.actionBtn= "update"
      this.studentForm.controls['regNumber'].setValue(this.editData.regNumber);
      this.studentForm.controls['firstName'].setValue(this.editData.firstName);
      this.studentForm.controls['lastName'].setValue(this.editData.lastName)
      this.studentForm.controls['level'].setValue(this.editData.level)
      this.studentForm.controls['gender'].setValue(this.editData.gender)
    }
   
  }

 

  addStudent(){
if(!this.editData){
  if(this.studentForm.valid){
    this.api.postStudent(this.studentForm.value).subscribe({next: (res)=>{
      // alert("student added successfully")
      this.studentForm.reset()
      this.dialogRef.close('save')
      console.log(this.studentForm.value)
    },
  error: ()=>{
    alert("error while adding data ")
  }})
  }
}else{
  this.updateStudent()
}
  }

  updateStudent(){
this.api.putStudent(this.studentForm.value, this.editData.id)
.subscribe({
  next: (res)=>{
    // alert("student updated sucessfully");
    this.studentForm.reset();
    this.dialogRef.close('update');

  },
  error:()=>{
    alert("error  while updating a student ")
  }
})
  }

}
