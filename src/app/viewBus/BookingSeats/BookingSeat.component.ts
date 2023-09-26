import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import { SeatsService } from '../BusSeats/Seats.servicce';
import { BookingEditSerive } from './BookingEdit.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bookingSeat',
  templateUrl: './BookingSeat.component.html',
  styleUrls: ['./BookingSeat.component.css'],
})
export class BookingSeatComponent implements OnInit {
  SubmitBooking: FormGroup;
  selectedSeats;
  selectedBus;
  seatForms: FormGroup[] = [];
  totalPrice = 0;
  constructor(
    private seatSerives: SeatsService,
    private fb: FormBuilder,
    private BookingService: BookingEditSerive,
    private route: Router,
    private router: ActivatedRoute
  ) {}
  ngOnInit() {
    this.selectedSeats = this.seatSerives.SelectedSeats;
    this.selectedBus = this.seatSerives.selectedBus;
    this.totalPrice = this.selectedSeats.reduce(
      (total, seat) => total + seat.price,
      0
    );
    this.SubmitBooking = this.fb.group({});

    // Create a form group for each selected seat
    this.selectedSeats.forEach((seat, index) => {
      const seatForm = this.fb.group({
        SeatNo: [seat.SeatNo],
        name: ['', Validators.required],
        age: ['', Validators.required],
        gender: ['', Validators.required],
      });

      // Add the seatForm to the SubmitBooking form group with the unique name
      this.SubmitBooking.addControl('seat-' + (index + 1), seatForm);
      this.seatForms.push(seatForm);
    });
  }
  OnShow() {
    if (this.SubmitBooking.valid) {
      // Access the form values for each seat
      const seatDataArray = this.seatForms.map((seatForm) => seatForm.value);
      this.BookingService.OnEditData(seatDataArray);
      alert('Your tickets has been booked...');
      this.route.navigate(['../bookingStatus'], { relativeTo: this.router });
    }
  }
}
