DROP table if EXISTS prescription;
DROP table if EXISTS prescribed_medicines;
DROP table if EXISTS patient;
DROP table if EXISTS medicine;

CREATE TABLE patient (
    id CHAR(36),
    name VARCHAR(255),
    phone CHAR(11) UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE appointment (
    id CHAR(36),
    patient_id CHAR(36),
    note TEXT,
    datetime timestamp,
    prescription_id CHAR(36),
    PRIMARY KEY (id),
    FOREIGN KEY (patient_id) REFERENCES patient(id)
);

CREATE TABLE medicine (
    id CHAR(36),
    name varchar(255),
    generic_name varchar(255) UNIQUE,
    producer varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE prescription (
    id CHAR(36),
    patient_id CHAR(36),
    appointment_id CHAR(36),
    note TEXT,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
    PRIMARY KEY (id),
    FOREIGN KEY (patient_id) REFERENCES patient(id),
);

CREATE TABLE condition (
    id CHAR(36),
    name VARCHAR(255),
    PRIMARY KEY (id),
    UNIQUE(name)
);

CREATE TABLE prescribed_conditions (
    prescription_id CHAR(36),
    condition_id CHAR(36),
    PRIMARY KEY ( prescription_id, condition_id ),
    FOREIGN KEY ( prescription_id ) REFERENCES prescription(id) on delete CASCADE,
    FOREIGN KEY ( condition_id ) REFERENCES condition(id)
);

CREATE TABLE prescribed_medicines (
    prescription_id CHAR(36),
    medicine_id CHAR(36),
    PRIMARY KEY ( prescription_id, medicine_id ),
    FOREIGN KEY ( prescription_id ) REFERENCES prescription(id) on DELETE CASCADE,
    FOREIGN KEY ( medicine_id ) REFERENCES medicine(id)
);


