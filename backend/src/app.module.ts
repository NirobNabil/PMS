
import { Module } from '@nestjs/common';
import { PrescriptionModule } from './prescription/prescription.module';
import { MedicineModule } from './medicine/medicine.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [PrescriptionModule, MedicineModule, PatientModule],
})

export class AppModule {}
