import { Module } from '@nestjs/common';
import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';
import { PatientModule } from 'src/patient/patient.module'

@Module({
  imports: [PatientModule],
  controllers: [MedicineController],
  providers: [MedicineService],
})

export class MedicineModule {}
