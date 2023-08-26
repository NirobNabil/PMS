import { Module } from '@nestjs/common';
import { PrescriptionController } from './appointment.controller';
import { PrescriptionService } from './appointment.service';
import { PatientModule } from 'src/patient/patient.module'

@Module({
  imports: [PatientModule],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
})

export class PrescriptionModule {}
