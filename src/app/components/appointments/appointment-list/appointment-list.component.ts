import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentsService } from '../../../services/appointments.service';
import { mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  panelOpenState = false;
  appointments: Appointment[] = [];
  public loading = true;
  public errorMsg: string = '';
  public successMsg: string = '';
  public columns = ['date', 'name', 'email', 'cancel']
  faTime = faTimes;

  private appointmentsSub: Subscription | undefined;

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit() {
    this.appointmentService.getAppointment();
    this.appointmentsSub = this.appointmentService.getAppointmentUpdateListener()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        console.log("Appointments updated:", this.appointments)
    });
  }

  onDeleteAppointment(appointmentId: string) {
    this.appointmentService.deleteAppointment(appointmentId);
  };

  ngOnDestroy() {
    this.appointmentsSub?.unsubscribe();
  }
}
