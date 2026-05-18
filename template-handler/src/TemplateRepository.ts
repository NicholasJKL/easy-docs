import { Pool } from 'pg';
import TemplateSummary from './models/TemplateSummary';
import Template from './models/Template';

class TemplateRepository {
    protected pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async getStaticValue(table: string, key: string): Promise<any> {

        const query = `
            SELECT code FROM ${table} WHERE name = $1
        `;
        const result = await this.pool.query(query, [key]);

        const value = result.rows[0].code;

        return value;
    }

    async getTemplateFileById(id: number): Promise<Buffer> {

        const query = `
        SELECT file FROM templates WHERE id = $1
    `;
        const result = await this.pool.query(query, [id]);

        const fileBuffer: Buffer = result.rows[0].file;

        return fileBuffer;
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

    async getTemplateById(id: number): Promise<Template> {
        const query = `
        SELECT id, author_id, name, description, fields, static_data, validation_scheme, file
        FROM templates
        WHERE id = $1
    `;
        const result = await this.pool.query(query, [id]);

        return result.rows[0] as Template;
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
            JSON.stringify(template.validation_schema),
            template.file,
        ];

        const result = await this.pool.query(query, values);

        return result.rows[0] as Template;
    }
}

export default TemplateRepository;