
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CreatePatientDto } from '../patient/dto/create-patient.dto';
import { PatientService } from './patient.service';
import { PatientDto } from './dto/patient.dto';
import { Patient } from './interfaces/patient.interface';

@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) : Promise<Patient> {
    return this.patientService.create({...createPatientDto, id: null});
  }

  @Get()
  async findPatient(@Query() params : any) : Promise<PatientDto | PatientDto[]> {
    if( params.name ) {
      return this.patientService.findAllByName(params.name)
    } else if( params.phone ) {
      return this.patientService.findOneByPhone(params.phone)
    } else {
      return this.patientService.findAll();
    }
  }

  @Get(':id')
  async findOne(@Param() params: any): Promise<PatientDto> {
    return this.patientService.findOne(params.id)
  }



  // @Get()
  // async findAll(): Promise<Prescription[]> {
  //   return this.catsService.findAll();
  // }
}
