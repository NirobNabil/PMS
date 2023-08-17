
import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { PrescriptionService } from './prescription.service';
import { Prescription } from './interfaces/prescription.interface';
import { Medicine } from './interfaces/medicine.interface';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { Condition } from './interfaces/condition.interface';

@Controller('prescription')
export class PrescriptionController {
  constructor(private prescriptionService: PrescriptionService) {}

  @Post()
  async create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    const conditions = createPrescriptionDto.conditions.map( cond => {
      if( cond.id == "" ) cond.id == null;  // TODO: there should be a better way for checking existence of condition 
      return cond;
    } )
    const id = await this.prescriptionService.create({...createPrescriptionDto, conditions: conditions});
    if( id == null ) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
    return {id};
  }

  @Get()
  async findAll() : Promise<Prescription[]> {
    return this.prescriptionService.findAll();
  }

  @Post('medicine')
  async createMedicine(@Body() createMedicineDto : CreateMedicineDto) {
    const id = this.prescriptionService.createMedicine({...createMedicineDto, id:null});
    return {id};
  }

  @Get('medicine')
  async findAllMedicines() : Promise<Medicine[]> {
    return this.prescriptionService.findAllMedicine();
  }

  @Get('medicine/:id')
  async findMedicine(@Param() params : any) : Promise<Medicine> {
    return this.prescriptionService.findMedicine(params.id);
  }

  @Get('condition')
  async findAllConditions() : Promise<Condition[]> {
    return this.prescriptionService.findAllCondition();
  }

  @Get(':id')
  async findOne(@Param() params: any) : Promise<Prescription> {
    return this.prescriptionService.findOne(params.id);
  }

}
