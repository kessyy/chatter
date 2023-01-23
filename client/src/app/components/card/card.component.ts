import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
  @Input() cardTypeClass: string;
  @Input() bodyClass: string;
  @Input() showHeader: boolean;
  @Input() showFooter: boolean;
}
