import { Router } from 'express';
import { Pool } from 'pg';
import multer from 'multer';

import TemplateController from './TemplateController';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
 *     summary: Создать новый шаблон документа
 *     description: |
 *       Загружает файл шаблона (.docx) и метаданные для создания нового шаблона.
 *       Данные полей формы (`fields`) передаются в виде JSON-строки.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - fields
 *               - templateFile
 *             properties:
 *               name:
 *                 type: string
 *                 description: Название шаблона
 *                 example: "Договор аренды"
 *               description:
 *                 type: string
 *                 description: Описание шаблона (необязательно)
 *                 example: "Типовой договор аренды недвижимости"
 *               fields:
 *                 type: string
 *                 description: JSON-строка с массивом полей формы
 *                 example: '[{"label":"ФИО клиента","type":"text"},{"label":"Дата","type":"date"}]'
 *               templateFile:
 *                 type: string
 *                 format: binary
 *                 description: Файл шаблона документа (.docx)
 *     responses:
 *       200:
 *         description: Шаблон успешно создан
 *       400:
 *         description: Неверный запрос (отсутствует файл или поля)
 *       500:
 *         description: Ошибка сервера
 */
router.post('/templates', upload.single('templateFile'), templateController.createTemplate.bind(templateController));

/**
 * @swagger
 * /api/template/{id}:
 *   get:
 *     summary: Получить шаблон по идентификатору
 *     description: Возвращает информацию о шаблоне (включая поля, статические данные, схему валидации)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Уникальный идентификатор шаблона
 *         example: 1
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
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
 *                   description: JSON-схема полей формы
 *                 static_data:
 *                   type: object
 *                   description: Статические данные для полей
 *                 validation_scheme:
 *                   type: object
 *                   description: Схема валидации
 *                 file:
 *                   type: string
 *                   format: byte
 *                   description: Бинарные данные файла
 *       500:
 *         description: Ошибка сервера
 */
router.get('/template/:id', templateController.getTemplateById.bind(templateController));

export default router;