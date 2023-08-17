import { Module } from '@nestjs/common';
import { PrescriptionController } from './prescription.controller';
import { PrescriptionService } from './prescription.service';
import { PatientModule } from 'src/patient/patient.module'

@Module({
  imports: [PatientModule],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
})

export class PrescriptionModule {}
