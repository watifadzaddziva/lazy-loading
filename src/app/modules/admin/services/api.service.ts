import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getStudents(){
    return this.http.get<any>("http://localhost:3000/studentDetails/")
  }

  postStudent(data: any){
    return this.http.post<any>("http://localhost:3000/studentDetails/", data)
  }

  putStudent(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/studentDetails/"+id, data)
  }

  delStudent(id: number){
return this.http.delete<any>("http://localhost:3000/studentDetails/"+id)
  }

  getById(id: number){
return this.http.get<any>("http://localhost:3000/studentDetails/"+id)
  }
}
