import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeatsService } from '../BusSeats/Seats.servicce';

@Injectable({ providedIn: 'root' })
export class BookingEditSerive {
  currentId;
  value;
  Busno;
  UpdatedData = [];
  constructor(private SeatService: SeatsService, private http: HttpClient) {}
  OnEditData(FormData) {
    for (let index of FormData) {
      this.SeatService.SelectedSeats.find((seat) => {
        if (seat.SeatNo === index.SeatNo) {
          this.currentId = seat.id;
          this.value = {
            BookingStatus: true,
            BusNo: seat.Busno,
            SeatNo: seat.SeatNo,
            SeatPosition: seat.SeatPosition,
            SeatType: seat.SeatType,
            id: seat.id,
            price: seat.price,
            CustAge: index.age,
            CustGender: index.gender,
            CustName: index.name,
          };
          this.Busno = this.SeatService.selectedBus.BusNo;
          this.http
            .put(
              'https://ebusticketbooking-default-rtdb.firebaseio.com/BusNo' +
                this.Busno +
                '/' +
                this.currentId +
                '.json',
              this.value
            )
            .subscribe((res) => {
              this.UpdatedData.push(res);
            });
        }
      });
    }
    console.log(this.UpdatedData);
  }
}
