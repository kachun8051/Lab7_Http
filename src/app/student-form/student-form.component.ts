import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControlDirective } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  http: HttpClient;
  serverData: Object | null;
  url!: string;
  url2!: string;

  constructor(fb: FormBuilder, http: HttpClient) { 
    this.http = http;
    this.serverData = null;  

    this.studentForm = fb.group(
      {
        'studentId': [''],
        'studentName': [''],
        'studentEmail': ['']
      }
    );
  }

  ngOnInit(): void {
    this.onload();
  }
  // custom function added by wong ka chun
  onload(): void {
    let myurl = "http://localhost/student/getDefaultStudent.php";
    this.http.get(myurl).subscribe(
      {      
        next: (res) => {
          console.log(res);
          this.serverData = res;
        },
        error: (err) => {
          console.log("Server call failed: " + err);
        }
      }
    );
  }

  onSubmit(formValue: any): void {
    console.log(formValue);
    /*
    this.url = "http://localhost/smlau/demo.php?" + 
                  "stid=" + formValue['studentId'] + 
                  "&stname=" + formValue['studentName'] +
                  "&email=" + formValue['studentEmail'];
    */
    this.url2 = "http://localhost/student/getStudent.php?" +
                "studentInput=" + formValue['studentId'];
    this.http.get(this.url2).subscribe(
      {      
        next: (res) => {
          console.log(res);
          this.serverData = res;
        },
        error: (err) => {
          console.log("Server call failed: " + err);
        }
      }
    );
  }

}






