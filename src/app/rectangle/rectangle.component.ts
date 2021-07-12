import {Component, Input, OnInit} from '@angular/core';
import {NumberElement, State} from '../common/dto/dto';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.scss']
})
export class RectangleComponent implements OnInit {
  MAX_HEIGHT = 650;
  MIN_HEIGHT = 50;
  colors: Map<State, string>;

  @Input() elem: NumberElement;
  @Input() width;

  constructor() {
  }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.colors = new Map<State, string>([
      [State.DISABLED, '#ff7518'],
      [State.ACTIVE, '#ecc0a3'],
      [State.FOUND, '#de0202'],
      [State.RANGE, '#02a7f3'],
      [State.SORTED, '#5de05f'],
    ]);
  }

  public getColor(): string {
    return this.colors.get(this.elem.state);
  }

  public getWidth(): number {
    // return Math.min(this.width, 50);
    return this.width;
  }
}
