const BaseModel = require('./BaseModel');
const db = require('../utils/database');

class Files extends BaseModel {
    table_name = 'files'
    constructor(attrs) {
        super();
        this.id = attrs?.id;
        this.classroom_id = attrs?.classroom_id;
        this.name = attrs?.name;
        this.type = attrs?.type;
        this.url = attrs?.url;
        this.description = attrs?.description;
        this.tutor_id = attrs?.tutor_id;
        this.is_active = attrs?.is_active;
    }

    /**
     * 
     * @param {number} classroom_id 
     * @param {{file_type: Array<string>, file_name: string}} filters 
     * @returns {Promise<Array{Object}>}
     */
    async getFilesForClassroom(classroom_id, filters) {
        const query = db(this.table_name)
            .select(['name', 'type', 'description', 'url', 'tutor_id'])
            .where('is_active', 1)
            .where({ classroom_id });
        if (filters) {
            if (filters.file_type) {
                query.whereIn('type', filters.file_type)
            }
            if (filters.file_name) {
                query.andWhereLike('name', `%${filters.file_name}%`)
            }
        }
        return query;

    }
}

module.exports = Files;