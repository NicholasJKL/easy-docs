type PracticeTemplateStatic =
    {
        phoneRegExp: RegExp,
        practiceTypeValues: string[],
        courseValues: string[],
        fieldOfStudyValues: string[],
        cafedraValues: string[],
        managerPostValues: string[],
        infoOrgChoice: string[],
        directorPostValues: string[],
        directorBaseValues: string[]
    }

const staticData: PracticeTemplateStatic =
{
    phoneRegExp: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
    practiceTypeValues: ['Учебная', 'Производственная', 'Научно-исследовательская', 'Преддипломная'],
    courseValues: ['1', '2', '3', '4', '5', '6'],
    fieldOfStudyValues: ['09.03.01 Информатика и вычислительная техника',
        '09.03.01.01 Разработка программных комплексов (ТОП ИТ)',
        '09.03.02 Информационные системы и технологии',
        '09.03.02.01 Разработка и внедрение корпоративных информационных систем (ТОП ИТ)',
        '09.03.03.01 Прикладная информатика (математическое и компьютерное моделирование процессов и систем)',
        '09.03.03.02 Прикладная информатика (управление данными)',
        '09.03.04 Программная инженерия'],
    cafedraValues: ['информационных систем',
        'информационных технологий и вычислительных систем',
        'прикладной математики',
        'управления и информатики в технических системах'],
    managerPostValues: ['ассистент', 'преподаватель', 'старший преподаватель', 'доцент', 'профессор', 'заведующий кафедрой'],
    infoOrgChoice: ['САМОСТОЯТЕЛЬНО', 'ПО МЕСТУ РАБОТЫ', 'ЦЕЛЕВИК', 'ПО ПОТРЕБНОСТИ'],
    directorPostValues: ['генеральный директор', 'заместитель генерального директора', 'директор по персоналу'],
    directorBaseValues: ['устава', 'доверенности']

}

export default staticData;