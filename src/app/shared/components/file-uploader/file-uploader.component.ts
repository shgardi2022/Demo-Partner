import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploaderComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploaderComponent
    }
  ]
})
export class FileUploaderComponent implements ControlValueAccessor, Validator, OnInit {
  @Input()
  baseUrl = '';
  @Input()
  uploadUrl = '';
  @Input()
  text = '';

  progress: number;
  // message: string;
  fileUrl: string;
  onTouched = () => { };
  touched = false;
  disabled = false;
  onChange = (fileUrl) => { };

  constructor(private http: HttpClient) { }


  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    let h = new HttpHeaders({
      "Accept": "application/json"
    })
    this.http.post(this.uploadUrl, formData, { reportProgress: true, observe: 'events', headers: h })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total!);
        else if (event.type === HttpEventType.Response) {
          //  this.message = 'Upload success.';
          //        this.onUploadFinished.emit(event.body);
          if (event?.body?.['response']) {
            this.fileUrl = event.body['response'];
            this.onChange(this.fileUrl);
          }
        }
      });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null
  }
  writeValue(obj: any): void {
    this.fileUrl = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
  imageUrl(): string {
    if (this.baseUrl && this.fileUrl) {
      return this.baseUrl + "/" + this.fileUrl;
    }
    return '';
  }
}
