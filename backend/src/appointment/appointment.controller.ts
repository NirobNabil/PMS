
import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post()
  async createAppointment(@Body() createAppointmentDto : CreateAppointmentDto) {
    return (await this.appointmentService.create( {...createAppointmentDto, id: null} ));
  }

  @Get()
  async getAllAppointments() {
    return (await this.appointmentService.findAll());
  }

  

}
