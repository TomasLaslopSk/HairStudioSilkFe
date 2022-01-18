import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment.model';

@Injectable({providedIn: 'root'})
export class AppointmentsService {
  private appointments: Appointment[] = [];
  private appointmentsUpdated = new Subject<Appointment[]>();

  private BASE_URL = environment.API_URL

  constructor(private http: HttpClient) { }

  getAppointment() {
    this.http.get<{message: string, appointments: any}>(`${this.BASE_URL}/appointments`)
      .pipe(map((appointmentData) => {
        return appointmentData.appointments.map((appointment: { name: any; date: any; email: any; _id: any; }) => {
          return {
            name: appointment.name,
            date: appointment.date,
            email: appointment.email,
            id: appointment._id
          }
        })
      }))
      .subscribe((transformedAppointments) => {
          this.appointments = transformedAppointments;
          this.appointmentsUpdated.next([...this.appointments])
    })
  }

  getAppointmentUpdateListener() {
    return this.appointmentsUpdated.asObservable();
  }

  addAppointment(name: string, date: string, email: string) {
    const appointment: Appointment = {id: '', name: name, date: date, email: email};
    this.http.post<{message: string, appointmentId: string}>(`${this.BASE_URL}/appointments`, appointment)
      .subscribe((responseData) => {
        const id = responseData.appointmentId;
        appointment.id = id;
        this.appointments.push(appointment)
        this.appointmentsUpdated.next([...this.appointments]);
    });
  }

  deleteAppointment(appointmentId: string) {
    console.log('Try to delete appointment:', appointmentId)
    this.http.delete(`${this.BASE_URL}/appointments/` + appointmentId)
      .subscribe(() => {
        console.log(`Appointment ${appointmentId} Deleted`);
        const updatedAppointments = this.appointments.filter(appointment => appointment.id !== appointmentId);
        this.appointments = updatedAppointments;
        this.appointmentsUpdated.next([...this.appointments]);
    })
  }
}
