import * as yup from 'yup';
import staticData from './T2TemplateStatic';

yup.setLocale({
    mixed: {
        required: 'Обязательное поле',
        notType: 'Неверный формат',
    },
    string: {
        email: 'Введите корректный email',
        min: ({ min }) => `Должно быть не менее ${min} символов`,
        max: ({ max }) => `Должно быть не более ${max} символов`,
        matches: ({ regex }) => `Некорректное значение`,
    },
    number: {
        min: ({ min }) => `Должно быть не менее ${min}`,
        max: ({ max }) => `Должно быть не более ${max}`,
    }
});

const defaultSchema = yup.object({
    orgName: yup.string().required(),
    okpo: yup.string().matches(/^(\d{8}|\d{10})$/).required(),
    dateStart: yup.date().required(),
    tabel: yup.string().max(6).required(),
    inn_e: yup.string().matches(/^\d{12}$/).required(),
    snils: yup.string().matches(/^\d{3}-\d{3}-\d{3}[\s\u00A0]\d{2}$/).required(),
    kow: yup.string().oneOf(staticData.kowData).required(),
    tow: yup.string().oneOf(staticData.towData).required(),
    gender: yup.string().oneOf(staticData.genderData).required(),
    num_td: yup.number().required(),
    date_td: yup.date().required(),
    surname: yup.string().required(),
    name: yup.string().required(),
    patronymic: yup.string().required(),
    date_dof_full: yup.date().required(),
    pob_full: yup.string().max(100).required(),
    pob: yup.string().matches(/^\d{11}$/).required(),
    ctz_full: yup.string().oneOf(staticData.ctzData).required(),
    lngname1: yup.string().test(
        'required-if-lngdegr1',
        'Заполните название языка, если указана степень знания',
        function (value) {
            const { lngdegr2 } = this.parent;
            if (lngdegr2 && lngdegr2 !== '' && (!value || value === '')) {
                return false;
            }
            return true;
        }
    ),
    lngdegr1: yup.string().oneOf(staticData.langDegreeData).test(
        'required-if-lngname1',
        'Заполните степень знания, если указан язык',
        function (value) {
            const { lngname1 } = this.parent;
            if (lngname1 && lngname1 !== '' && (!value || value === '')) {
                return false;
            }
            return true;
        }
    ),
    lngname2: yup.string()
        .test(
            'required-if-lngdegr1',
            'Заполните название языка, если указана степень знания',
            function (value) {
                const { lngdegr2 } = this.parent;
                if (lngdegr2 && lngdegr2 !== '' && (!value || value === '')) {
                    return false;
                }
                return true;
            }
        ),
    lngdegr2: yup.string().oneOf(staticData.langDegreeData.concat([" "]))
        .test(
            'required-if-lngname2',
            'Заполните степень знания, если указан язык',
            function (value) {
                const { lngname2 } = this.parent;
                if (lngname2 && lngname2 !== '' && (!value || value === '')) {
                    return false;
                }
                return true;
            }
        ),
    educ_full: yup.string().oneOf(staticData.educData).required(),
    edOrg1: yup.string(),
    edDocName1: yup.string(),
    edDocS1: yup.string(),
    edDocNum1: yup.string(),
    edYear1: yup.date(),
    qualName1: yup.string(),
    qualOrient1: yup.string().oneOf(staticData.qualData),
    edDocName2: yup.string(),
    edDocS2: yup.string(),
    edDocNum2: yup.string(),
    qualName2: yup.string(),
    qualOrient2: yup.string().oneOf(staticData.qualData),
    edYear2: yup.date(),
    edPost_full: yup.string().oneOf(staticData.edPostData),
    edOrg3: yup.string(),
    edDocName3: yup.string(),
    edYear3: yup.date(),
    qualOrient3: yup.string().oneOf(staticData.qualData),
    mainProf_full: yup.string(),
    otherProf_full: yup.string(),
    date_exp: yup.date(),
    d_gen_exp: yup.number().min(0).max(30).required(),
    m_gen_exp: yup.number().min(0).max(12).required(),
    y_gen_exp: yup.number().min(0).max(100).required(),
    d_gng_exp: yup.number().min(0).max(30).optional(),
    m_gng_exp: yup.number().min(0).max(12).optional(),
    y_gng_exp: yup.number().min(0).max(100).optional(),
    d_vl_exp1: yup.number().min(0).max(30).optional(),
    m_vl_exp1: yup.number().min(0).max(12).optional(),
    y_vl_exp1: yup.number().min(0).max(100).optional(),
    d_vl_exp2: yup.number().min(0).max(30).optional(),
    m_vl_exp2: yup.number().min(0).max(12).optional(),
    y_vl_exp2: yup.number().min(0).max(100).optional(),
    marriage_full: yup.string().oneOf(staticData.marriageData).required(),
    psp_num: yup.string().matches(/^\d{10}$/).required(),
    date_psp: yup.date().required(),
    psp_org: yup.string().required(),
    psp_index: yup.string().matches(/^\d{6}$/).required(),
    psp_address: yup.string().required(),
    f_index: yup.string().matches(/^\d{6}$/).required(),
    f_address: yup.string().required(),
    date_reg: yup.date().required(),
    tel: yup.string().matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/).required()
});

let relativesSchema = yup.object({
    rod_rank1: yup.string().oneOf(staticData.rodRankData),
    rod_fullname1: yup.string(),
    date_yob1: yup.date(),
    rod_rank2: yup.string().oneOf(staticData.rodRankData),
    rod_fullname2: yup.string(),
    date_yob2: yup.date(),
    rod_rank3: yup.string().oneOf(staticData.rodRankData),
    rod_fullname3: yup.string(),
    date_yob3: yup.date(),
    rod_rank4: yup.string().oneOf(staticData.rodRankData),
    rod_fullname4: yup.string(),
    date_yob4: yup.date(),
    rod_rank5: yup.string().oneOf(staticData.rodRankData),
    rod_fullname5: yup.string(),
    date_yob5: yup.date(),
    rod_rank6: yup.string().oneOf(staticData.rodRankData),
    rod_fullname6: yup.string(),
    date_yob6: yup.date()
});

export const schema = defaultSchema.concat(relativesSchema);