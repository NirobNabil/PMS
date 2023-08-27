
import { Module } from '@nestjs/common';
import { PrescriptionModule } from './prescription/prescription.module';
import { MedicineModule } from './medicine/medicine.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [PrescriptionModule, MedicineModule, PatientModule, AppointmentModule],
})

export class AppModule {}
