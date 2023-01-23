import { Component ,OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-view-student-details',
  templateUrl: './view-student-details.component.html',
  styleUrls: ['./view-student-details.component.scss']
})
export class ViewStudentDetailsComponent implements OnInit {

  id!: number;
  studentDetails!: any;
  student!: any;
  dataSource!: MatTableDataSource<any>;

  constructor(private api: ApiService, private route: ActivatedRoute
    ,private router: Router){}


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.getStudentDetails();
  }


  getStudentDetails(){
    this.api.getById(this.id).subscribe((res)=>{
      this.studentDetails= res
    })
  }

}
