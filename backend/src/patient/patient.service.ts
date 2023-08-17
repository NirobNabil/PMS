import {v4 as uuidv4} from 'uuid';
import {Injectable} from '@nestjs/common';

import {Patient} from './interfaces/patient.interface';

import db from "../db/db"

@Injectable()
export class PatientService {

    async create(patient : Patient) : Promise<Patient> {
        const id = uuidv4();
        await db.query(`insert into patient values ($1, $2, $3)`, [id, patient.name, patient.phone])
        return { id, name:patient.name, phone: patient.phone };
    }

    async findOne(id : Patient['id']): Promise < Patient > {
        return (await db.query(`select * from patient where id = $1`, [id])).rows[0];
    }

    async findOneByPhone(phone : Patient['phone']): Promise < Patient > {
        const patientRows = (await db.query(`select * from patient where phone = $1`, [phone])).rows;
        if( patientRows.length == 0 ) return null;
        else return patientRows[0];
    }

    async findAllByName(name : Patient['name']): Promise < Patient[] > {
        const patientRows = (await db.query(`select * from patient where name like $1`, [name])).rows;
        if( patientRows.length == 0 ) return null;
        else return patientRows;
    }

    async findAll(): Promise < Patient[] > {
        return (await db.query(`select * from patient`)).rows;
    }

}