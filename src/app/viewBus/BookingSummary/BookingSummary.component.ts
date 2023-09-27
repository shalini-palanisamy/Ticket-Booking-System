import { Component, OnInit } from '@angular/core';
import { BookingEditSerive } from '../BookingSeats/BookingEdit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busSeats',
  templateUrl: './BookingSummary.component.html',
  styleUrls: ['./BookingSummary.component.css'],
})
export class BookingSummaryComponent implements OnInit {
  BookingSummary;
  constructor(
    private Bookingserive: BookingEditSerive,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.BookingSummary = this.Bookingserive.UpdatedData;
    console.log(this.BookingSummary);
  }
  LogOut() {
    this.route.navigate(['../']);
  }
}
