import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BusSelectedService } from '../BusStatus/BusSelected.service';
@Injectable({ providedIn: 'root' })
export class SeatFetchService {
  constructor(
    private http: HttpClient,
    private BusSelected: BusSelectedService
  ) {}
  OnFetch(Bus) {
    return this.http
      .get(
        'https://ebusticketbooking-default-rtdb.firebaseio.com/BusNo' +
          Bus.BusNo +
          '.json'
      )
      .pipe(
        map((data) => {
          const dataEntryed = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              dataEntryed.push({ ...data[key], id: key });
            }
          }

          return dataEntryed;
        })
      );
  }
  cancellation(data) {
    console.log(data);
    this.http
      .put(
        'https://ebusticketbooking-default-rtdb.firebaseio.com/BusNo' +
          this.BusSelected.SelectedBus.BusNo +
          '/' +
          data.id +
          '/BookingStatus.json',
        false
      )
      .subscribe((res) => {});
    this.http
      .put(
        'https://ebusticketbooking-default-rtdb.firebaseio.com/BusNo' +
          this.BusSelected.SelectedBus.BusNo +
          '/' +
          data.id +
          '/CustAge.json',
        0
      )
      .subscribe((res) => {});
    this.http
      .put(
        'https://ebusticketbooking-default-rtdb.firebaseio.com/BusNo' +
          this.BusSelected.SelectedBus.BusNo +
          '/' +
          data.id +
          '/CustName.json',
        '""'
      )
      .subscribe((res) => {});
    this.http
      .put(
        'https://ebusticketbooking-default-rtdb.firebaseio.com/BusNo' +
          this.BusSelected.SelectedBus.BusNo +
          '/' +
          data.id +
          '/CustGender.json',
        '""'
      )
      .subscribe((res) => {});
  }
}
