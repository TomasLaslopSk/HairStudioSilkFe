import { Component } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent {
  showAddAppointment: boolean = true;
  appointmentId: string = '';
  appointmentName: string = '';
  appointmentDate: string = '';
  appointmentEmail: string = '';

  constructor(public appointmentService: AppointmentsService) {}

  onSubmitAppointment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.appointmentService.addAppointment(form.value.appointmentName, form.value.appointmentDate, form.value.appointmentEmail)
    form.resetForm();
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
