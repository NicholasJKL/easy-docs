import { Router } from 'express';
import { Pool } from 'pg';
import TemplateController from './TemplateController';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const router = Router();
const templateController = new TemplateController(pool);

/**
 * @swagger
 * /api/generatedocument:
 *   post:
 *     summary: Генерация документа на основе шаблона и переданных данных
 *     description: Принимает идентификатор шаблона и объект с данными для заполнения. Возвращает сгенерированный документ (в текущей заглушке – JSON с сообщением).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - templateId
 *               - formData
 *             properties:
 *               templateId:
 *                 type: number
 *                 description: Уникальный идентификатор шаблона документа
 *                 example: "1"
 *               formData:
 *                 type: object
 *                 description: Объект с полями для подстановки в шаблон
 *                 additionalProperties: true
 *                 example:
 *                   имя: "Иван Петров"
 *                   возраст: 30
 *                   город: "Москва"
 *                   должность: "Разработчик"
 *     responses:
 *       200:
 *         description: Успешная генерация документа
 *         content:
 *           application/vnd.openxmlformats-officedocument.wordprocessingml.document:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Неверный запрос (отсутствуют обязательные поля)
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/fill', templateController.generateDocument.bind(templateController));

/**
 * @swagger
 * /api/templates:
 *   get:
 *     summary: Получить список всех шаблонов
 *     description: Возвращает массив, содержащий идентификатор, название и описание каждого шаблона.
 *     responses:
 *       200:
 *         description: Успешный ответ.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                     description: Уникальный идентификатор шаблона
 *                   name:
 *                     type: string
 *                     description: Название шаблона
 *                   description:
 *                     type: string
 *                     description: Описание шаблона
 *       500:
 *         description: Ошибка сервера
 */
router.get('/templates', templateController.getAllTemplates.bind(templateController));

/**
 * @swagger
 * /api/templates:
 *   post:
 *     summary: Создать новый шаблон
 *     description: Принимает данные шаблона и сохраняет его в базе данных.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - fields
 *               - static_data
 *               - validation_scheme
 *               - file
 *             properties:
 *               author_id:
 *                 type: integer
 *                 description: ID автора шаблона (опционально)
 *                 nullable: true
 *               name:
 *                 type: string
 *                 description: Название шаблона
 *               description:
 *                 type: string
 *                 description: Описание шаблона
 *                 nullable: true
 *               fields:
 *                 type: object
 *                 description: JSON-схема полей формы
 *               static_data:
 *                 type: object
 *                 description: Статические данные для полей (списки и т.п.)
 *               validation_scheme:
 *                 type: object
 *                 description: Схема валидации Yup в формате JSON
 *               file:
 *                 type: string
 *                 format: base64
 *                 description: Шаблон документа (DOCX) в кодировке base64
 *     responses:
 *       200:
 *         description: Шаблон успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 10
 *                 author_id:
 *                   type: integer
 *                   nullable: true
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                   nullable: true
 *                 fields:
 *                   type: object
 *                 static_data:
 *                   type: object
 *                 validation_scheme:
 *                   type: object
 *                 file:
 *                   type: string
 *                   format: base64
 *       500:
 *         description: Ошибка сервера
 */
router.post('/templates', templateController.createTemplate.bind(templateController));

export default router;