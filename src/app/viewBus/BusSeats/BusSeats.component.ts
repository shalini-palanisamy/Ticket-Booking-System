import { AfterContentInit, Component, OnInit } from '@angular/core';
import { BusSelectedService } from '../BusSelected.service';
import { SeatsService } from './Seats.servicce';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-busSeats',
  templateUrl: './BusSeats.component.html',
  styleUrls: ['./BusSeats.component.css'],
})
export class BusSeatsComponent implements OnInit, AfterContentInit {
  Stucture;
  BusDetails;

  selectedItems: any[] = [];
  constructor(
    private busSelectedService: BusSelectedService,
    private seatService: SeatsService,
    private route: Router,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.busSelectedService.BusSelectedSubject.subscribe((res) => {
      this.seatService.selectedBus = res;
    });
  }
  ngAfterContentInit(): void {
    this.Onfetch();
  }
  Onfetch() {
    this.seatService.OnFetchBus().subscribe((res) => {
      this.BusDetails = this.seatService.selectedBus;
      this.Stucture = [];
      this.Stucture = res;
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
  CheckValue() {
    this.seatService.SelectedSeats = [...this.selectedItems];
    this.route.navigate(['../bookingSeat'], { relativeTo: this.router });
  }
}
