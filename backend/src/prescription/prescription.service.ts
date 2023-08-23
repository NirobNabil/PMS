import {v4 as uuidv4} from 'uuid';
import {Inject, Injectable} from '@nestjs/common';

import {Prescription} from './interfaces/prescription.interface';
import {Medicine} from './interfaces/medicine.interface';
import {Patient} from '../patient/interfaces/patient.interface';
import {PatientService} from 'src/patient/patient.service';
import { Condition } from './interfaces/condition.interface';

import db from "../db/db"
import { CreatePrescriptionDto } from './dto/create-prescription.dto';

@Injectable()
export class PrescriptionService {

    @Inject(PatientService)
    private readonly patientService: PatientService;

    async create(prescription : CreatePrescriptionDto) : Promise<string> {

        const {patient, medicines, note, conditions} = prescription;

        let patient_id;

        let patient_rows = (await db.query(`select id from patient where phone = $1`, [prescription.patient.phone])).rows;

        const prescription_id = uuidv4();

        // initiating a transaction
        // TODO: Implement it as a transaction
        try {
            await db.query(`BEGIN`);

            await db.query('SET CONSTRAINTS ALL DEFERRED');

            if (patient_rows.length == 0) {
                patient_id = await this.patientService.create(patient);
            } else {
                patient_id = patient_rows[0].id;
            }
    
            let final_medicines = await Promise.all(medicines.map(async med => {
                if (med.id == null) {
                    return await this.createMedicine(med);
                } else {
                    return await this.findMedicine(med.id);
                }
            }));
    
            let final_conditions = await Promise.all( conditions.map( async condition => {
                if( condition.id == null ) {
                    const data = await this.createCondition(condition);
                    return data;
                } else {
                    return await this.findCondition(condition.id);
                }
            } ) ) 

            await db.query(`insert into prescription (id, patient_id, note) values ($1, $2, $3)`, [prescription_id, patient_id, note])

            // console.log(final_medicines, final_conditions, prescription_id);

            await Promise.all(final_conditions.map( async (cond : Condition) => {
                await db.query(`insert into prescribed_conditions values ($1, $2)`, [prescription_id, cond.id])
            } ))

            await Promise.all(final_medicines.map(async (med : Medicine) => {
                await db.query(`insert into prescribed_medicines values ($1, $2)`, [prescription_id, med.id])
            }))

            await db.query('COMMIT');

            return prescription_id;

        } catch (e) {
            console.log(e);
            await db.query('ROLLBACK');

            return null;
        }

    }

    async findOne(id): Promise < Prescription > {
        const p = ( await db.query(`select * from prescription where id = $1`, [id]) ).rows[0]
        if( p == undefined ) throw Error('Prescription doesn\'t exist')
        console.log(p);
        const medicines = await this.getPrescribedMedicines(p.id);
        const conditions = await this.getPrescribedConditions(p.id);
        const patient = await this.patientService.findOne(p.patient_id);
        return {id: p.id, patient, medicines, conditions, note: p.note}
    }

    // TODO:
    // Ei function e apatoto shob prescription return kortese
    // filter parameter ta parse kore tomar oi onujayi filter kore output deya lagbe shimlachan
    async findAll(filter): Promise < Prescription[] > {
        console.log(filter);
        const rows = (await db.query(`select * from prescription`)).rows;
        const prescriptions = await Promise.all( rows.map(async (p) : Promise < Prescription > => {
            const medicines = await this.getPrescribedMedicines(p.id);
            const patient = await this.patientService.findOne(p.patient_id);
            const conditions = await this.getPrescribedConditions(p.id);
            return {id: p.id, patient, medicines, conditions, note: p.note}
        }));
        return prescriptions;
    }
    

    async getPrescribedMedicines(prescription_id : Prescription['id']): Promise < Medicine[] > {
        const medicines = (await db.query(
            `select medicine_id as id, name, generic_name, producer 
             from prescribed_medicines as t1 
             join medicine as t2
             on t1.prescription_id = $1
             and t1.medicine_id = t2.id;
            `, [prescription_id])).rows;
        
        return medicines;
    }

    async createMedicine(medicine : Medicine) : Promise<Medicine> {
        let id = uuidv4();
        if( medicine.id != null ) id = medicine.id;
        await db.query(`insert into medicine values ($1, $2, $3, $4)`, [id, medicine.name, medicine.generic_name, medicine.producer]);
        return {...medicine, id: id};
    }

    // should throw NOT EXIST error
    async findMedicine(id : String) : Promise<Medicine> {
        return (await db.query(`select * from medicine where id = $1`, [id])).rows[0];
    }

    async findAllMedicine() : Promise<Medicine[]> {
        return (await db.query(`select * from medicine`)).rows;
    }

    async getPrescribedConditions(prescription_id : Prescription['id']): Promise < Condition[] > {
        const conditions = (await db.query(
            `select condition_id as id, name 
             from prescribed_conditions as t1 
             join condition as t2
             on t1.prescription_id = $1
             and t1.condition_id = t2.id;
            `, [prescription_id])).rows;
        
        return conditions;
    }

    async createCondition(condition : Condition) : Promise<Condition> {
        let id = uuidv4();
        if( condition.id != null ) id = condition.id;
        await db.query(`insert into condition values ($1, $2)`, [id, condition.name]);
        return { ...condition, id: id };
    }

    // should throw NOT EXIST error
    async findCondition(id : String) : Promise<Condition> {
        return (await db.query(`select * from condition where id = $1`, [id])).rows[0];
    }

    async findAllCondition() : Promise<Condition[]> {
        return (await db.query(`select * from condition`)).rows;
    }

}
