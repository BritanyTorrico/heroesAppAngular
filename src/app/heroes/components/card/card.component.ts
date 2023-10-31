import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [
    `
      .heroes-card {
        height: 200px; /* Establece la altura deseada */
      }
      .truncate-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

    `,
  ],
})
export class CardComponent implements OnInit {
  @Input()
  public hero!: Hero;

  ngOnInit(): void {
    if (!this.hero) throw Error('Hero property is REQUIRED..');
  }
}
