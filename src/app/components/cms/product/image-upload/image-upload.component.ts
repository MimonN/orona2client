import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();
  @Input() id;
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    let apiUrl;
    if(this.id == null){
      apiUrl = 'https://localhost:5001/api/upload';
    } else {
      apiUrl = 'https://localhost:5001/api/upload/' + this.id;
    }
    
    this.http.post(apiUrl, formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
}