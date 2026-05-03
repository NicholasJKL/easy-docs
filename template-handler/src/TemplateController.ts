import { Request, Response } from 'express';
import { fillTemplate } from './TemplateService';
import { Pool } from 'pg';

import TemplateRepository from './TemplateRepository';
import TemplateFillData from './models/TemplateFillData';
import TemplateSummary from './models/TemplateSummary';
import Template from './models/Template';

class TemplateController {

    private templateRepository: TemplateRepository;

    constructor(pool: Pool) {
        this.templateRepository = new TemplateRepository(pool);
    }

    async generateDocument(req: Request, res: Response): Promise<void> {
        try {
            const templateData: TemplateFillData = req.body;
            const file: Buffer = await this.templateRepository.getTemplateFileById(templateData.templateId);
            const filledFile: Buffer = await fillTemplate(file, templateData.formData);

            res.setHeader('Content-Disposition', 'attachment; filename="document.docx"');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.status(200).send(filledFile);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка при генерации документа' });
        }
    }

    async getAllTemplates(req: Request, res: Response): Promise<void> {
        try {
            const templates: TemplateSummary[] = await this.templateRepository.getAllTemplates();
            res.status(200).json(templates);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка получения списка шаблонов' });
        }
    }

    async getTemplateById(req: Request, res: Response): Promise<void> {
        try {
            const idParam = req.params.id;
            if (!idParam) {
                res.status(400).json({ error: 'ID шаблона не указан' });
                return;
            }

            const id = Number(idParam);
            if (isNaN(id)) {
                res.status(400).json({ error: 'ID должен быть числом' });
                return;
            }

            const template: Template = await this.templateRepository.getTemplateById(id);

            if (!template) {
                res.status(404).json({ error: 'Шаблон не найден' });
                return;
            }
            res.status(200).json(template);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка получения списка шаблонов' });
        }
    }

    async createTemplate(req: Request, res: Response): Promise<void> {
        try {
            const { name, description, fields } = req.body;
            let parsedFields = [];

            try {
                parsedFields = fields ? JSON.parse(fields) : [];
            } catch (e) {
                res.status(400).json({ error: 'Поле fields должно быть валидным JSON' });
                return;
            }

            const file = req.file;
            if (!file) {
                res.status(400).json({ error: 'Файл шаблона (.docx) обязателен' });
                return;
            }
            const fileBuffer = file.buffer;

            const template = {
                name,
                description: description || null,
                fields: parsedFields,
                static_data: {},
                validation_scheme: {},
                file: fileBuffer,
                author_id: null,
            };

            const result = await this.templateRepository.createTemplate(template);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка создания шаблона' });
        }
    }
}

export default TemplateController;