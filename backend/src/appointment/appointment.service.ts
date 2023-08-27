import {v4 as uuidv4} from 'uuid';
import {Inject, Injectable} from '@nestjs/common';

import {Appointment} from './interfaces/appointment.interface';
import {PatientService} from 'src/patient/patient.service';

import db from "../db/db"

@Injectable()
export class AppointmentService {

    @Inject(PatientService)
    private readonly patientService: PatientService;
    
    async create( appointment: Appointment ) {
        
        const id = uuidv4();
        let { patient, note, datetime } = appointment;

        if( patient.id == null || patient.id == "" ) {
            patient = await this.patientService.create(appointment.patient);
            console.log(appointment.patient);
        }
        
        await db.query( 
            `INSERT into appointment ( id, patient_id, note, datetime ) values ( $1, $2, $3, $4 )`, 
            [ id, patient.id, note, datetime ]
        );  

        return { id, patient, note, datetime };

    }

    async findAll() {
        const appointmentRows = (await db.query(`select * from appointment as t1 join patient as t2 on t1.patient_id = t2.id`)).rows;

        const appointments = appointmentRows.map( app => ({
            id: app.id,
            patient: { name: app.name, phone: app.phone, id: app.patient_id },
            note: app.note,
            datetime: app.datetime,
        }) )


        return appointments;
    }

}
