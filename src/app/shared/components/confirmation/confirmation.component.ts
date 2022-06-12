import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDto } from 'src/app/core/base/base.models';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  confirmationConfig: ConfirmationDto;
  constructor(
    private translate: TranslateService, public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDto) {
    this.confirmationConfig = data;
    this.confirmationConfig.trueText = this.translate.instant(this.confirmationConfig.trueText);
    this.confirmationConfig.falseText = this.translate.instant(this.confirmationConfig.falseText);

  }

  ngOnInit(): void {
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

}
