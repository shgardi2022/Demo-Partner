import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { NotificationService } from 'src/app/core/common-services/notification.service';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.scss']
})
export class ExportExcelComponent implements OnInit {
  @Input() dataSource: any[];
  @Input() fileName: string;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  onClick() {
    if (this.dataSource) {
      if (this.dataSource.length > 0) {
        this.exportAsExcelFile(this.dataSource, this.fileName);
      } else {
        this.notificationService.error('NO_DATA_PROVIDED_TO_EXPORT');
      }
    } else {
      this.notificationService.error('MUST_HAVE_DATA_SOURCE');
    }
  }
  exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const workSheet = XLSX.utils.json_to_sheet(json);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Shgardi');
    XLSX.writeFile(workBook, excelFileName  + new Date().getTime() + EXCEL_EXTENSION);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  downloadFile(data, filename = "data") {
    this.exportAsExcelFile(data, filename);
  }

  ConvertToCSV(objArray) {
    let array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    let str = "";
    let row = "";
    var headerList: any[] = [];
    for (var key in objArray[0]) {
      if (key != "init" && key != "toJSON" && key != "clone") {
        console.log(key);
        headerList.push(key);
      }
    }

    for (let index in headerList.reverse()) {
      row += headerList[index] + "|";
    }
    str += row + "\r\n";
    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (let index in headerList) {
        let head = headerList[index];

        line += array[i][head] + "|";
      }
      str += line + "\r\n";
    }
    return str;
  }
}
