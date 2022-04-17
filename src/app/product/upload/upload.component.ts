import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public progress!: number;
  public message!: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(public http:HttpClient) { }

  ngOnInit(): void {
  }
  fileName:any;
  public uploadFile = (files: any) => {
    this.fileName=this.fileName + files[0].name
    console.log("Started Here")
    console.log(files[0].name);
    localStorage.setItem("fileName",files[0].name);
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('https://localhost:7060/api/Products/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total!);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }

}
