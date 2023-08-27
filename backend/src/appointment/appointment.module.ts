import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { PatientModule } from 'src/patient/patient.module'

@Module({
  imports: [PatientModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})

export class AppointmentModule {}
