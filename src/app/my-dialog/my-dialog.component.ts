import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingEditSerive } from '../viewBus/BookingSeats/BookingEdit.service';

@Component({
  selector: 'app-my-dialog',
  templateUrl: 'my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css'],
})
export class UpidComponent implements OnInit {
  totalAmount;
  upiId: string = '';
  isUpiIdValid: boolean = false;
  upiIdForm: FormGroup;
  @Output() paymentConfirmed: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<UpidComponent>,
    private EditBooking: BookingEditSerive,
    private fb: FormBuilder
  ) {
    this.upiIdForm = this.fb.group({
      upiId: [
        '',
        [
          Validators.maxLength(20),
          Validators.minLength(10),
          Validators.required,
          this.upiIdValidator,
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.totalAmount = this.EditBooking.TotalAmount;
  }

  upiIdValidator(control) {
    const value = control.value;

    // UPI ID should not contain whitespace
    if (/\s/.test(value)) {
      return {
        invalidUpiId: true,
        message: 'UPI ID should not contain whitespace',
      };
    }

    // UPI ID may or may not contain a dot (.) or hyphen (-)
    if (!/^[a-zA-Z0-9@.-]+$/.test(value)) {
      return { invalidUpiId: true, message: 'Invalid characters in UPI ID' };
    }
    if (!value.includes('@ybl') && !value.includes('@okicici')) {
      return {
        invalidUpiId: true,
        message: 'Invalid UPI ID contain "@ybl" or "@okicici".',
      };
    }
    return null; // Validation passed
  }

  performAction(): void {
    if (this.upiIdForm.valid) {
      // Emit the event when the form is valid and the submit button is clicked
      this.EditBooking.OnEditData;
      alert('Your tickets have been booked...');
      this.paymentConfirmed.emit(this.upiIdForm.value.upiId);
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
