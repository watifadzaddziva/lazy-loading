import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Student } from '../../models/student';
import { ApiService } from '../../services/api.service';
import { DialogAddStudentComponent } from '../dialog-add-student/dialog-add-student.component';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{
   displayedColumns: string[] = ['regNumber', 'firstName', 'lastName', 'level', 'gender', 'action'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api : ApiService, private dialog: MatDialog, 
    private router: Router) {
  }
  ngOnInit(): void {
    this.getAllstudents()
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllstudents(){
    this.api.getStudents().subscribe({
      next:(res)=>{
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error: (err)=>{
        alert("error while fetching data")
      }
    })
  }

  openDialog(){
this.dialog.open(DialogAddStudentComponent,{
  width: '50%'
}).afterClosed().subscribe(val=>{
  if(val=='save'){
    this.getAllstudents()
  }
})
  }

  editStudent(row: any){
    this.dialog.open(DialogAddStudentComponent,{
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val=='update'){
        this.getAllstudents()
      }
    })
  }

  delStudent(id: number){
this.api.delStudent(id).subscribe({next:(res)=>{
  // alert("student deleted successfully")
  this.getAllstudents();
},
error:()=>{
alert("error while deleting the student")
}})
  }

  getDetails(id: number){
this.router.navigate(['admin/student-details',id])

  }
}


