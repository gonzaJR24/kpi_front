import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'] // Aquí estaba el error
})
export class CardComponent {
  @Input() title: string = '';
  @Input() color: string = '';
  @Input() amount: string = '';
}
