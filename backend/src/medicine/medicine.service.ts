import {v4 as uuidv4} from 'uuid';
import {Inject, Injectable} from '@nestjs/common';

import {Medicine} from './interfaces/medicine.interface';
import {PatientService} from 'src/patient/patient.service';

import db from "../db/db"

@Injectable()
export class MedicineService {

    @Inject(PatientService)
    private readonly patientService: PatientService;

    async createMedicine(medicine : Medicine) : Promise<Medicine> {
        let id = uuidv4();
        console.log(medicine);
        if( medicine.id != null ) id = medicine.id;
        await db.query(`insert into medicine values ($1, $2, $3, $4)`, [id, medicine.name, medicine.generic_name, medicine.producer]);
        return {...medicine, id: id};
    }

    // should throw NOT EXIST error
    async findMedicine(id : String) : Promise<Medicine> {
        return (await db.query(`select * from medicine where id = $1`, [id])).rows[0];
    }

    // TODO: define interface for the filter
    // This function should only receive filter object with attribtues that should be filtered
    // for example this function should not contain the attribute "name" if name is not supposed to filtered on
    async findMedicinesByFilter(filter) : Promise<Medicine[]> {
        let query = "select * from medicine ";
        const keys = Object.keys(filter);
        if( keys.length ) {
            query += "where ";
            query += 
                keys.map( (key, i) => {
                    return `LOWER(${key}) like LOWER('${filter[key]}%')`;
                } )
                .join( " and " );
        }
        return (await db.query(query)).rows;
    }
}
