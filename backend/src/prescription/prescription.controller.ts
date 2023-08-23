
import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { PrescriptionService } from './prescription.service';
import { Prescription } from './interfaces/prescription.interface';
import { Medicine } from './interfaces/medicine.interface';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { Condition } from './interfaces/condition.interface';
import { createConditionDto } from './dto/create-condition.dto';

@Controller('prescription')
export class PrescriptionController {
  constructor(private prescriptionService: PrescriptionService) {}

  @Post('medicine')
  async createMedicine(@Body() createMedicineDto : CreateMedicineDto) {
    const id = this.prescriptionService.createMedicine({...createMedicineDto, id:null});
    return {id};
  }

  @Get('medicine')
  async findAllMedicines(@Query() filter : any) : Promise<Medicine[]> {
    const new_filter = {};
    for( const key in filter ) {
      // assuming filter only contains string type values
      if( filter[key] != "" ) new_filter[key] = filter[key];
    }
    return this.prescriptionService.findMedicines(new_filter);
  }

  @Get('medicine/:id')
  async findMedicine(@Param() params : any) : Promise<Medicine> {
    return this.prescriptionService.findMedicine(params.id);
  }

  @Get('condition')
  async findAllConditions(@Param() params) : Promise<Condition[]> {
    console.log(params);
    return this.prescriptionService.findAllCondition();
  }

  @Post('condition')
  async createCondition(@Body() data : createConditionDto )  : Promise<Condition> {
    return this.prescriptionService.createCondition({...data, id:null});
  }

  @Post()
  async create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    const conditions = createPrescriptionDto.conditions.map( cond => {
      if( cond.id == '' ) cond.id = null;  // TODO: there should be a better way for checking existence of condition 
      return cond;
    } )
    const id = await this.prescriptionService.create({...createPrescriptionDto, conditions: conditions});
    if( id == null ) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
    return {id};
  }

  @Get()
  async findAll(@Query() filter) : Promise<Prescription[]> {
    return this.prescriptionService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param() params: any) : Promise<Prescription> {
    return this.prescriptionService.findOne(params.id);
  }

}
