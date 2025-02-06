import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radius',
  templateUrl: './radius.component.html',
  styleUrls: ['./radius.component.css']
})
export class RadiusComponent {
  @Input() selectedValue: number = 0;
  @Output() selectedValueChange = new EventEmitter<number>();

  onTabClick(value: number): void {
    this.selectedValue = value;
    this.selectedValueChange.emit(value);
  }
}
