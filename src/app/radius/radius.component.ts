import { Component } from '@angular/core';

@Component({
  selector: 'app-radius',
  templateUrl: './radius.component.html',
  styleUrls: ['./radius.component.css']
})
export class RadiusComponent {
  selectedValue: number | null = null;

  onTabClick(value: number): void {
    this.selectedValue = value;
    console.log(`Tab with value ${value} clicked.`);
  }
}
