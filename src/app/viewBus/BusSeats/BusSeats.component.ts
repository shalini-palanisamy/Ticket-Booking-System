import { Component, OnInit } from '@angular/core';
import { SeatsService } from './Seats.servicce';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-busSeats',
  templateUrl: './BusSeats.component.html',
  styleUrls: ['./BusSeats.component.css'],
})
export class BusSeatsComponent implements OnInit {
  Stucture;
  BusDetails;
  selectedItems: any[] = [];
  constructor(
    private seatService: SeatsService,
    private route: Router,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.Onfetch();
  }
  Onfetch() {
    this.seatService.OnFetchBus().subscribe((res) => {
      this.Stucture = res;
      console.log(this.Stucture);
      this.BusDetails = this.seatService.selectedBus;
    });
  }
  onCheckboxChange(event: any, index: number) {
    if (event.target.checked) {
      this.selectedItems.push(this.Stucture[index]);
      if (this.selectedItems.length > 5) {
        alert('One Can Book only 5 seats');
      }
    } else {
      const selectedIndex = this.selectedItems.indexOf(this.Stucture[index]);
      if (selectedIndex !== -1) {
        this.selectedItems.splice(selectedIndex, 1);
      }
    }
  }
  getStyle(item: any, index: number) {
    let style: string = '';

    if (item.BookingStatus === false) {
      if (item.SeatNo.includes('W')) {
        if (
          this.Stucture[index + 1].BookingStatus &&
          this.Stucture[index + 1].CustGender === 'female'
        ) {
          style = 'pink';
        } else if (
          this.Stucture[index + 1].BookingStatus &&
          this.Stucture[index + 1].CustGender === 'male'
        ) {
          style = 'blue';
        }
      } else {
        if (
          this.Stucture[index - 1]?.BookingStatus &&
          this.Stucture[index - 1]?.CustGender === 'female'
        ) {
          style = 'pink';
        } else if (
          this.Stucture[index - 1]?.BookingStatus &&
          this.Stucture[index - 1]?.CustGender === 'male'
        ) {
          style = 'blue';
        }
      }
    }
    return style;
  }
  CheckValue() {
    this.seatService.SelectedSeats = [...this.selectedItems];
    this.route.navigate(['../bookingSeat'], { relativeTo: this.router });
  }
}
