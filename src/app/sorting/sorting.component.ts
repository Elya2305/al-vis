import {Component, OnInit} from '@angular/core';
import {NumberElement, SortAlgorithm, State} from '../common/dto/dto';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {
  total = 30;
  defaultMin = 50;
  defaultMax = 650;
  delayMs = 500;
  sorting = false;
  algorithm = SortAlgorithm.QUICK;

  numbers: NumberElement[];

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.algorithm);
    this.fillRandomNumbers();
  }

  public fillRandomNumbers(): void {
    this.numbers = Array.from({length: this.total},
      () => new NumberElement(Math.floor(Math.random() * (this.defaultMax - this.defaultMin) + this.defaultMin)));
  }

  public sort(): void {
    this.sorting = true;
    let sortProm: Promise<any>;
    switch (this.algorithm) {
      case SortAlgorithm.SELECTION:
        sortProm = this.selectionSort();
        break;
      case SortAlgorithm.BUBBLE:
        sortProm = this.bubbleSort();
        break;
      case SortAlgorithm.INSERTION:
        sortProm = this.insertionSort();
        break;
      case SortAlgorithm.QUICK:
        sortProm = this.quickSort(0, this.numbers.length - 1);
    }
    sortProm.then(() => this.sorting = false);
  }

  public async selectionSort(): Promise<any> {
    for (let i = 0; i < this.numbers.length; i++) {
      this.activate(i);
      let min = i;
      for (let j = i + 1; j < this.numbers.length; j++) {
        this.activate(j);
        await this.delay(this.delayMs);
        if (this.numbers[min].value > this.numbers[j].value) {
          min = j;
        }
        this.deactivate(j);
      }
      this.found(min);
      await this.delay(this.delayMs * 1.5);
      const temp = this.numbers[i];
      this.numbers[i] = this.numbers[min];
      this.numbers[min] = temp;
      await this.delay(this.delayMs * 1.5);
      this.deactivateAll(min, i);
    }
  }

  public async bubbleSort(): Promise<any> {
    for (let i = 0; i < this.numbers.length; i++) {
      for (let j = 0; j < this.numbers.length - i - 1; j++) {
        this.activateAll(j, j + 1);
        await this.delay(this.delayMs);
        if (this.numbers[j].value > this.numbers[j + 1].value) {
          this.found(j + 1);
          await this.delay(this.delayMs * 1.2);

          this.swap(j, j + 1);

          await this.delay(this.delayMs * 1.2);
        }
        this.deactivateAll(j, j + 1);
      }
    }
  }

  public async insertionSort(): Promise<any> {
    for (let i = 1; i < this.numbers.length; i++) {
      let j = i - 1;
      while (j >= 0 && this.numbers[j].value > this.numbers[j + 1].value) {
        this.found(j + 1);
        this.activateAll(j);
        await this.delay(this.delayMs * 1.2);

        this.swap(j, j + 1);

        await this.delay(this.delayMs * 1.2);
        this.deactivateAll(j, j + 1);
        j--;
      }
    }
  }

  // todo
  public async quickSort(low: number, high: number): Promise<any> {
    if (low < high) {
      this.rearrange(low, high).then(pivotIndex => {
        this.quickSort(low, pivotIndex - 1);
        this.quickSort(pivotIndex + 1, high);
      });
    }
  }

  private async rearrange(low: number, high: number): Promise<number> {
    const pivot = this.numbers[high].value;
    await this.delay(this.delayMs * 1.2);
    this.found(high);

    let pointer = low;

    for (let i = low; i < high; i++) {
      this.activate(i);
      await this.delay(this.delayMs * 1.2);
      this.deactivate(i);
      if (this.numbers[i].value < pivot) {
        this.swap(i, pointer);
        pointer++;
      }
    }
    this.deactivate(high);
    this.swap(pointer, high);
    // this.sorted(pointer);
    return pointer;
  }

  private swap(index1: number, index2: number): void {
    const temp = this.numbers[index1];
    this.numbers[index1] = this.numbers[index2];
    this.numbers[index2] = temp;
  }

  private sortedRange(start: number, end: number): void {
    for (let i = start; i <= end; i++) {
      this.numbers[i].setState(State.SORTED);
    }
  }

  private sorted(index: number): void {
    this.numbers[index].setState(State.SORTED);
  }

  private activate(index: number): void {
    this.numbers[index].setState(State.ACTIVE);
  }

  private range(index: number): void {
    this.numbers[index].setState(State.RANGE);
  }

  private activateAll(...indexes: number[]): void {
    indexes.forEach(i => this.activate(i));
  }

  private deactivateAll(...indexes: number[]): void {
    indexes.forEach(i => this.deactivate(i));
  }

  private deactivate(index: number): void {
    this.numbers[index].setState(State.DISABLED);
  }

  private found(index: number): void {
    this.numbers[index].setState(State.FOUND);
  }

  private delay(ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public getWidth(): number {
    return 20;
  }

  public setTotal(): void {
    if (this.total > 45) {
      this.total = 45;
    } else if (this.total < 2) {
      this.total = 2;
    }
    this.fillRandomNumbers();
  }
}
