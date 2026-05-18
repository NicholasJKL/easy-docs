import { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Button,
    Stack,
    Divider
} from '@mui/material';
import dayjs from 'dayjs';
import * as yup from 'yup';

import SimpleText from './Resources/SimpleText';
import ValueSelector from './Resources/ValueSelector';
import DateCalendar from './Resources/DateCalendar';
import MaskedText from './Resources/MaskedText';
import ComboBox from './Resources/ComboBox';
import NumField from './Resources/NumField';

import { schema } from './T2TemplateSchema'
import staticData from './T2TemplateStatic'

const validMock = {
    orgName: `Общество с ограниченной ответственностью "Ромашка"`,
    okpo: '12345678',
    dateStart: dayjs(),
    tabel: '12',
    inn_e: '123456789012',
    snils: '123-456-789 01',
    kow: 'Постоянная',
    tow: 'Основная',
    gender: 'М',
    num_td: 42,
    date_td: dayjs(),
    surname: 'Иванов',
    name: 'Иван',
    patronymic: 'Иванович',
    date_dof_full: dayjs('02.01.1999'),
    pob_full: 'г. Москва',
    pob: '45260000000',
    ctz_full: 'Гражданин Российской Федерации',
    lngname1: 'Английский',
    lngdegr1: 'Владеет свободно',
    educ_full: 'Высшее образование - бакалавриат',
    edOrg1: 'МГТУ Станкин',
    edDocName1: 'Диплом',
    edDocS1: '1234',
    edDocNum1: '1234',
    edYear1: dayjs('2024'),
    qualName1: 'Системный аналитик',
    qualOrient1: 'Программная инженерия',
    mainProf_full: 'Системный аналитик',
    date_exp: dayjs(),
    d_gen_exp: 10,
    m_gen_exp: 1,
    y_gen_exp: 0,
    marriage_full: "Никогда не состоял(а) в браке",
    rod_rank1: 'Отец',
    rod_fullname1: 'Иванов Иван Иванович',
    rod_yob1: dayjs('01.01.1980'),
    rod_rank2: 'Мать',
    rod_fullname2: 'Иванова Евдокия Ивановна',
    rod_yob2: dayjs('01.01.1981'),
    psp_num: '1234567891',
    date_psp: dayjs('03.01.2019'),
    psp_org: 'МВД РФ ПО Г. МОСКВЕ',
    psp_index: '123456',
    psp_address: 'г. Москва, ул. Советская, д. 13, кв. 123',
    f_index: '123456',
    f_address: 'г. Москва, ул. Советская, д. 13, кв. 123',
    date_reg: dayjs('02.01.1999'),
    tel: '+7 (123) 456-78-90',
};

type FormData = yup.InferType<typeof schema>;

const T2Template: FC = () => {

    const [isLoading, setLoading] = useState<boolean>(false);

    const { control, handleSubmit, formState: { errors } } = useForm<any>({
        resolver: yupResolver(schema),
        defaultValues: validMock
    });

    const onSubmit = async (data: FormData) => {
        console.log(data);
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/fill', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    templateId: 0,
                    formData: data,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка генерации');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const filename = 'Заявка на практику МГТУ Станкин.docx';

            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert('Ошибка при отправке формы');
        }

        setLoading(false);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 } }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                        <Typography variant="h4">Личная карточка работника (Унифицированная форма Т-2)</Typography>
                        <SimpleText name='orgName' control={control} label='Наименование организации (полное)'></SimpleText>
                        <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                            <Typography variant="body1">Реквизиты организации можно посмотреть</Typography>
                            <Button
                                href="https://websbor.rosstat.gov.ru/online/info"
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                variant="text"
                            >
                                здесь
                            </Button>
                        </Box>
                        <MaskedText
                            name='okpo'
                            control={control}
                            label='ОКПО'
                            mask='00000000 | 00'
                            unmasked
                            helperText='Юридические лица - 8 цифр, ИП - 10'
                        />
                        <DateCalendar name='dateStart' control={control} label='Дата составления документа' defaultValue={dayjs()}></DateCalendar>
                        <SimpleText name='tabel' control={control} label='Табельный номер работника'></SimpleText>
                        <MaskedText
                            name='inn_e'
                            control={control}
                            label='ИНН работника'
                            mask='000000000000'
                            unmasked
                        />
                        <MaskedText
                            name='snils'
                            control={control}
                            label='СНИЛС работника'
                            mask='000-000-000 00'
                        />
                        <ValueSelector name='kow' control={control} label='Характер работы' values={staticData.kowData}></ValueSelector>
                        <ValueSelector name='tow' control={control} label='Вид работы' values={staticData.towData}></ValueSelector>
                        <ValueSelector
                            name='gender'
                            control={control}
                            label='Пол сотрудника'
                            values={staticData.genderData}
                            helperText='Мужской - М, Женский - Ж'></ValueSelector>
                        <Typography variant="h5">I. Общие сведения сотрудника</Typography>
                        <SimpleText name='num_td' control={control} label='Номер трудового договора'></SimpleText>
                        <DateCalendar name='date_td' control={control} label='Дата составления трудового договора'></DateCalendar>
                        <SimpleText name='surname' control={control} label='Фамилия'></SimpleText>
                        <SimpleText name='name' control={control} label='Имя'></SimpleText>
                        <SimpleText name='patronymic' control={control} label='Отчество'></SimpleText>
                        <DateCalendar name='date_dof_full' control={control} label='Дата рождения' minDate={dayjs('01.01.1900')}></DateCalendar>
                        <SimpleText name='pob_full' control={control} label='Место рождения' helperText='до 100 символов'></SimpleText>
                        <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                            <Typography variant="body1">Коды по ОКАТО можно посмотреть</Typography>
                            <Button
                                href="https://classifikators.ru/okato"
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                variant="text">
                                здесь
                            </Button>
                        </Box>
                        <MaskedText
                            name='pob'
                            control={control}
                            label='Код места рождения по ОКАТО'
                            mask='00 000 000 000'
                            unmasked>
                        </MaskedText>
                        <ValueSelector name='ctz_full' control={control} label='Гражданство' values={staticData.ctzData}></ValueSelector>
                        <ComboBox
                            name='lngname1'
                            control={control}
                            label='Наименование иностранного языка 1'
                            values={staticData.langData}>
                        </ComboBox>
                        <ComboBox
                            name='lngdegr1'
                            control={control}
                            label='Степень знания иностранного языка 1'
                            values={staticData.langDegreeData}>
                        </ComboBox>
                        <ComboBox
                            name='lngname2'
                            control={control}
                            label='Наименование иностранного языка 2'
                            values={staticData.langData}>
                        </ComboBox>
                        <ComboBox
                            name='lngdegr2'
                            control={control}
                            label='Степень знания иностранного языка 2'
                            values={staticData.langDegreeData}>
                        </ComboBox>
                        <ComboBox name='educ_full' control={control} label='Образование' values={staticData.educData}></ComboBox>
                        <Divider />
                        <SimpleText name='edOrg1' control={control} label='Наименование образовательного учреждения 1'></SimpleText>
                        <SimpleText name='edDocName1' control={control} label='Наименование документа об образовании (квалификации, спец. знаний) 1'></SimpleText>
                        <SimpleText name='edDocS1' control={control} label='Серия документа об образовании (квалификации, спец. знаний) 1'></SimpleText>
                        <SimpleText name='edDocNum1' control={control} label='Номер документа документа об образовании (квалификации, спец. знаний) 1'></SimpleText>
                        <DateCalendar name='edYear1' control={control} label='Год окончания 1' minDate={dayjs('01.01.1900')} maxDate={dayjs()} views={['year']}></DateCalendar>
                        <SimpleText name='qualName1' control={control} label='Квалификация по документу об образовании 1'></SimpleText>
                        <ComboBox
                            name='qualOrient1'
                            control={control}
                            label='Направление или специальность по документу 1'
                            values={staticData.qualData}>
                        </ComboBox>
                        <Divider />
                        <SimpleText name='edOrg2' control={control} label='Наименование образовательного учреждения 2'></SimpleText>
                        <SimpleText name='edDocName2' control={control} label='Наименование документа об образовании (квалификации, спец. знаний) 2'></SimpleText>
                        <SimpleText name='edDocS2' control={control} label='Серия документа об образовании (квалификации, спец. знаний) 2'></SimpleText>
                        <SimpleText name='edDocNum2' control={control} label='Номер документа документа об образовании (квалификации, спец. знаний) 2'></SimpleText>
                        <DateCalendar name='edYear2' control={control} label='Год окончания 2' minDate={dayjs('01.01.1900')} maxDate={dayjs()} views={['year']}></DateCalendar>
                        <SimpleText name='qualName2' control={control} label='Квалификация по документу об образовании 2'></SimpleText>
                        <ComboBox
                            name='qualOrient2'
                            control={control}
                            label='Направление или специальность по документу 2'
                            values={staticData.qualData}>
                        </ComboBox>
                        <Divider />
                        <ComboBox
                            name='edPost_full'
                            control={control}
                            label='Послевузовское профессиональное образование'
                            values={staticData.edPostData}>
                        </ComboBox>
                        <SimpleText name='edOrg3' control={control} label='Наименование образовательного, научного учреждения'></SimpleText>
                        <SimpleText name='edDocName3' control={control} label='Документ об образовании, номер, дата выдачи'></SimpleText>
                        <DateCalendar name='edYear3' control={control} label='Год окончания 3' minDate={dayjs('01.01.1900')} maxDate={dayjs()} views={['year']}></DateCalendar>
                        <Divider />
                        <ComboBox
                            name='mainProf_full'
                            control={control}
                            label='Профессия (основная)'
                            values={staticData.profData}>
                        </ComboBox>
                        <ComboBox
                            name='otherProf_full'
                            control={control}
                            label='Профессия (другая)'
                            values={staticData.profData}>
                        </ComboBox>
                        <Divider />
                        <DateCalendar name='date_exp' control={control} label='Стаж работы по состоянию на дату' minDate={dayjs('01.01.1900')} maxDate={dayjs()}></DateCalendar>
                        <Typography variant="h6">Общий стаж работы</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <NumField name='d_gen_exp' control={control} label='Дней' min={0} max={30}></NumField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <NumField name='m_gen_exp' control={control} label='Месяцев' min={0} max={12}></NumField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <NumField name='y_gen_exp' control={control} label='Лет' min={0} max={100}></NumField>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">Непрерывный стаж работы</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <NumField name='d_gng_exp' control={control} label='Дней' min={0} max={30}></NumField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <NumField name='m_gng_exp' control={control} label='Месяцев' min={0} max={12}></NumField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <NumField name='y_gng_exp' control={control} label='Лет' min={0} max={100}></NumField>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">Дающий право на надбавку за выслугу лет стаж работы 1</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <NumField name='d_vl_exp1' control={control} label='Дней' min={0} max={30}></NumField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <NumField name='m_vl_exp1' control={control} label='Месяцев' min={0} max={12}></NumField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <NumField name='y_vl_exp1' control={control} label='Лет' min={0} max={100}></NumField>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">Дающий право на надбавку за выслугу лет стаж работы 2</Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <NumField name='d_vl_exp2' control={control} label='Дней' min={0} max={30}></NumField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <NumField name='m_vl_exp2' control={control} label='Месяцев' min={0} max={12}></NumField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <NumField name='y_vl_exp2' control={control} label='Лет' min={0} max={100}></NumField>
                            </Grid>
                        </Grid>
                        <Divider />
                        <ValueSelector name='marriage_full' control={control} label='Состояние в браке' values={staticData.marriageData}></ValueSelector>
                        <Typography variant="h6">Ближайший родственник 1</Typography>
                        <ValueSelector name='rod_rank1' control={control} label='Степень родства' values={staticData.rodRankData}></ValueSelector>
                        <SimpleText name='rod_fullname1' control={control} label='Фамилия, имя, отчество'></SimpleText>
                        <DateCalendar name='rod_yob1' control={control} label='Год рождения' minDate={dayjs('01.01.1900')} maxDate={dayjs()} views={['year']}></DateCalendar>
                        <Typography variant="h6">Ближайший родственник 2</Typography>
                        <ValueSelector name='rod_rank2' control={control} label='Степень родства' values={staticData.rodRankData}></ValueSelector>
                        <SimpleText name='rod_fullname2' control={control} label='Фамилия, имя, отчество'></SimpleText>
                        <DateCalendar name='rod_yob2' control={control} label='Год рождения' minDate={dayjs('01.01.1900')} maxDate={dayjs()} views={['year']}></DateCalendar>
                        <Typography variant="h6">Ближайший родственник 3</Typography>
                        <ValueSelector name='rod_rank3' control={control} label='Степень родства' values={staticData.rodRankData}></ValueSelector>
                        <SimpleText name='rod_fullname3' control={control} label='Фамилия, имя, отчество'></SimpleText>
                        <DateCalendar name='rod_yob3' control={control} label='Год рождения' minDate={dayjs('01.01.1900')} maxDate={dayjs()} views={['year']}></DateCalendar>
                        <Typography variant="h6">Ближайший родственник 4</Typography>
                        <ValueSelector name='rod_rank4' control={control} label='Степень родства' values={staticData.rodRankData}></ValueSelector>
                        <SimpleText name='rod_fullname4' control={control} label='Фамилия, имя, отчество'></SimpleText>
                        <DateCalendar name='rod_yob4' control={control} label='Год рождения' minDate={dayjs('01.01.1900')} maxDate={dayjs()} views={['year']}></DateCalendar>
                        <Typography variant="h6">Ближайший родственник 5</Typography>
                        <ValueSelector name='rod_rank5' control={control} label='Степень родства' values={staticData.rodRankData}></ValueSelector>
                        <SimpleText name='rod_fullname5' control={control} label='Фамилия, имя, отчество'></SimpleText>
                        <DateCalendar name='rod_yob5' control={control} label='Год рождения' minDate={dayjs('01.01.1900')} maxDate={dayjs()} views={['year']}></DateCalendar>
                        <Typography variant="h6">Ближайший родственник 6</Typography>
                        <ValueSelector name='rod_rank6' control={control} label='Степень родства' values={staticData.rodRankData}></ValueSelector>
                        <SimpleText name='rod_fullname6' control={control} label='Фамилия, имя, отчество'></SimpleText>
                        <DateCalendar name='rod_yob6' control={control} label='Год рождения' minDate={dayjs('01.01.1900')} maxDate={dayjs()} views={['year']}></DateCalendar>
                        <Divider />
                        <MaskedText
                            name='psp_num'
                            control={control}
                            label='Серия, номер паспорта'
                            mask='00 00 000000'
                            unmasked>
                        </MaskedText>
                        <DateCalendar name='date_psp' control={control} label='Дата выдачи паспорта' minDate={dayjs('01.01.1900')} maxDate={dayjs()}></DateCalendar>
                        <SimpleText name='psp_org' control={control} label='Паспорт выдан (наименование органа)'></SimpleText>
                        <Typography variant="h6">Адрес места жительства по паспорту</Typography>
                        <MaskedText
                            name='psp_index'
                            control={control}
                            label='Почтовый индекс'
                            mask='000 000'
                            unmasked>
                        </MaskedText>
                        <SimpleText name='psp_address' control={control} label='Адрес'></SimpleText>
                        <Typography variant="h6">Адрес места жительства фактический</Typography>
                        <MaskedText
                            name='f_index'
                            control={control}
                            label='Почтовый индекс'
                            mask='000 000'
                            unmasked>
                        </MaskedText>
                        <SimpleText name='f_address' control={control} label='Адрес'></SimpleText>
                        <DateCalendar name='date_reg' control={control} label='Дата регистрации по месту жительства' minDate={dayjs('01.01.1900')} maxDate={dayjs()}></DateCalendar>
                        <Divider />
                        <MaskedText
                            name='tel'
                            control={control}
                            label='Номер телефона'
                            mask='+7 (000) 000-00-00'>
                        </MaskedText>
                        <Box display="flex" flexDirection="column">
                            <Button
                                type="submit"
                                variant='contained'
                                disabled={Object.keys(errors).length > 0}
                                loading={isLoading}
                                sx={{ alignSelf: "flex-end" }}
                            >Отправить</Button>
                            {Object.keys(errors).length > 0 && (
                                <Typography color="error" variant="body2" sx={{ mt: 0, textAlign: "right" }}>
                                    Пожалуйста, исправьте ошибки в форме
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}

export default T2Template;