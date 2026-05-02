import { Pool } from 'pg';
import TemplateSummary from './models/TemplateSummary';
import Template from './models/Template';

class TemplateRepository {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async getAllTemplates(): Promise<TemplateSummary[]> {
        const query = `
            SELECT id, name, description
            FROM templates
            ORDER BY id
    `;
        const result = await this.pool.query(query);

        return result.rows;
    }

    async createTemplate(template: Omit<Template, 'id'>): Promise<Template> {
        const query = `
      INSERT INTO templates (author_id, name, description, fields, static_data, validation_scheme, file)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, author_id, name, description, fields, static_data, validation_scheme, file
    `;
        const values = [
            template.author_id ?? null,
            template.name,
            template.description ?? null,
            JSON.stringify(template.fields),
            JSON.stringify(template.static_data),
            JSON.stringify(template.validation_scheme),
            template.file,
        ];

        const result = await this.pool.query(query, values);
        
        return result.rows[0] as Template;
    }
}

export default TemplateRepository;