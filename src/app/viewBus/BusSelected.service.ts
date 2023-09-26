import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BusSelectedService {
  BusSelectedSubject: Subject<string>;
  constructor() {
    this.BusSelectedSubject = new Subject<string>();
  }

  dataToSend(Data) {
    this.BusSelectedSubject.next(Data);
  }
}
