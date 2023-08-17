const fs = require('fs')
import db from './db';

class Schema {

    apply = function() {
        fs.readFile('src/db/schema.sql', 'utf8', (err, data) => {
            let schemaDefinition = data;
            db.query(schemaDefinition);
        });
    }

}

export default new Schema()