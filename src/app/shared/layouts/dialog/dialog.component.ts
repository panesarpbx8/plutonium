import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../access/dialog.service';
import { DialogType } from '../../types/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  dialog$ = this.dialogService.asObservable();

  constructor(private dialogService: DialogService) {}

  getDialogContainerClassList(type: DialogType): string[] {
    return ['dialog', `dialog-${type}`];
  }

}
