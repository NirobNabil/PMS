
import { Module } from '@nestjs/common';
import { PrescriptionModule } from './prescription/prescription.module';

@Module({
  imports: [PrescriptionModule],
})

export class AppModule {}
