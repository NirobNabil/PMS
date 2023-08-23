
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { Medicine } from './interfaces/medicine.interface';
import { CreateMedicineDto } from './dto/create-medicine.dto';

@Controller('medicine')
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  @Post()
  async createMedicine(@Body() createMedicineDto : CreateMedicineDto) {
    const id = this.medicineService.createMedicine({...createMedicineDto, id:null});
    return {id};
  }

  @Get()
  async findAllMedicines(@Query() filter : any) : Promise<Medicine[]> {
    const new_filter = {};
    for( const key in filter ) {
      // assuming filter only contains string type values
      if( filter[key] != "" ) new_filter[key] = filter[key];
    }
    return this.medicineService.findMedicinesByFilter(new_filter);
  }

  @Get(':id')
  async findMedicine(@Param() params : any) : Promise<Medicine> {
    return this.medicineService.findMedicine(params.id);
  }

}
