export class NumberElement {
  value: number;
  state: State = State.DISABLED;

  constructor(value: number) {
    this.value = value;
  }

  public setState(state: State): void {
    this.state = state;
  }

  public isActive(): boolean {
    return this.state === State.ACTIVE;
  }

  public isDisabled(): boolean {
    return this.state === State.DISABLED;
  }

  public isFound(): boolean {
    return this.state === State.FOUND;
  }
}

export enum State {
  DISABLED,
  ACTIVE,
  FOUND,
  RANGE,
  SORTED
}

export enum SortAlgorithm {
  SELECTION = 'Selection sort',
  BUBBLE = 'Bubble sort',
  INSERTION = 'Insertion sort',
  QUICK = 'Quick sort'
}
