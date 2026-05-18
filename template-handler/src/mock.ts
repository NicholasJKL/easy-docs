import StaticData from "./models/StaticData";
import Field from "./models/Field";

export const fieldsT2: Field[] = [
    { marker: "orgName" },
    { marker: "okpo" },
    { marker: "dateStart" },
    { marker: "tabel" },
    { marker: "inn_e" },
    { marker: "snils" },
    { marker: "alp" },
    { marker: "kow" },
    { marker: "tow" },
    { marker: "gender" },
    { marker: "num_td" },
    { marker: "date_td" },
    { marker: "surname" },
    { marker: "name" },
    { marker: "patronymic" },
    { marker: "date_dof_full" },
    { marker: "date_dof" },
    { marker: "pob_full" },
    { marker: "pob" },
    { marker: "ctz_full" },
    { marker: "ctz" },
    { marker: "lngname1" },
    { marker: "lngn1" },
    { marker: "lngdegr1" },
    { marker: "lngd1" },
    { marker: "lngname2" },
    { marker: "lngn2" },
    { marker: "lngdegr2" },
    { marker: "lngd2" },
    { marker: "educ_full" },
    { marker: "educ" },
    { marker: "edOrg1" },
    { marker: "edDocName1" },
    { marker: "edDocS1" },
    { marker: "edDocNum1" },
    { marker: "edYear1" },
    { marker: "qualName1" },
    { marker: "qualOrient1" },
    { marker: "qual1" },
    { marker: "edOrg2" },
    { marker: "edDocName2" },
    { marker: "edDocS2" },
    { marker: "edDocNum2" },
    { marker: "edYear2" },
    { marker: "qualName2" },
    { marker: "qualOrient2" },
    { marker: "qual2" },
    { marker: "edPost_full" },
    { marker: "edPost" },
    { marker: "edOrg3" },
    { marker: "edDocName3" },
    { marker: "edYear3" },
    { marker: "qualOrient3" },
    { marker: "qual3" },
    { marker: "mainProf_full" },
    { marker: "mainProf" },
    { marker: "otherProf_full" },
    { marker: "otherProf" },
    { marker: "dated_exp" },
    { marker: "datem_exp" },
    { marker: "dateyl_exp" },
    { marker: "d_gen_exp" },
    { marker: "m_gen_exp" },
    { marker: "y_gen_exp" },
    { marker: "d_gng_exp" },
    { marker: "m_gng_exp" },
    { marker: "y_gng_exp" },
    { marker: "d_vl_exp1" },
    { marker: "m_vl_exp1" },
    { marker: "y_vl_exp1" },
    { marker: "d_vl_exp2" },
    { marker: "m_vl_exp2" },
    { marker: "y_vl_exp2" },
    { marker: "marriage_full" },
    { marker: "marriage" },
    { marker: "rod_rank1" },
    { marker: "rod_fullname1" },
    { marker: "rod_yob1" },
    { marker: "rod_rank2" },
    { marker: "rod_fullname2" },
    { marker: "rod_yob2" },
    { marker: "rod_rank3" },
    { marker: "rod_fullname3" },
    { marker: "rod_yob3" },
    { marker: "rod_rank4" },
    { marker: "rod_fullname4" },
    { marker: "rod_yob4" },
    { marker: "rod_rank5" },
    { marker: "rod_fullname5" },
    { marker: "rod_yob5" },
    { marker: "rod_rank6" },
    { marker: "rod_fullname6" },
    { marker: "rod_yob6" },
    { marker: "psp_num" },
    { marker: "dated_psp" },
    { marker: "datem_psp" },
    { marker: "datey_psp" },
    { marker: "psp_org" },
    { marker: "psp_index" },
    { marker: "psp_address" },
    { marker: "f_index" },
    { marker: "f_address" },
    { marker: "dated_reg" },
    { marker: "datem_reg" },
    { marker: "datey_reg" },
    { marker: "tel" }

];

export const staticDataT2: StaticData = {
    staticFieldsData: [
        {
            marker: "dateStart",
            type: "date",
            dependsOn: "dateStart"
        },
        {
            marker: "alp",
            type: "alpha",
            dependsOn: "surname"
        },
        {
            marker: "date_dof",
            type: "date",
            dependsOn: "date_dof_full"
        },
        {
            marker: "date_dof_full",
            type: "datef",
            dependsOn: "date_dof_full"
        },
        {
            marker: "pob",
            type: "tableValue",
            dependsOn: "dof"
        },
        {
            marker: "ctz",
            type: "tableValue",
            tableName: "okin",
            dependsOn: "ctz_full"
        },
        {
            marker: "lngn1",
            type: "tableValue",
            tableName: "okin",
            dependsOn: "lngname1"
        },
        {
            marker: "lngd1",
            type: "tableValue",
            tableName: "okin",
            dependsOn: "lngdegr1"
        },
        {
            marker: "lngn2",
            type: "tableValue",
            tableName: "okin",
            dependsOn: "lngname2"
        },
        {
            marker: "lngd2",
            type: "tableValue",
            tableName: "okin",
            dependsOn: "lngdegr2"
        },
        {
            marker: "edYear1",
            type: "datey",
            dependsOn: "edYear1"
        },
        {
            marker: "edYear2",
            type: "datey",
            dependsOn: "edYear1"
        },
        {
            marker: "edYear3",
            type: "datey",
            dependsOn: "edYear3"
        },
        {
            marker: "marriage",
            type: "tableValue",
            tableName: "okin",
            dependsOn: "marriage_full"
        },
        {
            marker: "dated_psp",
            type: "dated",
            dependsOn: "date_psp"
        },
        {
            marker: "datem_psp",
            type: "datemf",
            dependsOn: "date_psp"
        },
        {
            marker: "datey_psp",
            type: "datey",
            dependsOn: "date_psp"
        },
        {
            marker: "dated_exp",
            type: "dated",
            dependsOn: "date_exp"
        },
        {
            marker: "datemf_exp",
            type: "datemf",
            dependsOn: "date_exp"
        },
        {
            marker: "dateyl_exp",
            type: "datey2",
            dependsOn: "date_exp"
        },
        {
            marker: "dated_reg",
            type: "dated",
            dependsOn: "date_reg"
        },
        {
            marker: "datem_reg",
            type: "datemf",
            dependsOn: "date_reg"
        },
        {
            marker: "datey_reg",
            type: "datey",
            dependsOn: "date_reg"
        },
        {
            marker: "date_td",
            type: "date",
            dependsOn: "date_td"
        },
        {
            marker: "rod_yob1",
            type: "datey",
            dependsOn: "rod_yob1"
        },
        {
            marker: "rod_yob2",
            type: "datey",
            dependsOn: "rod_yob2"
        },
        {
            marker: "rod_yob3",
            type: "datey",
            dependsOn: "rod_yob3"
        },
        {
            marker: "rod_yob4",
            type: "datey",
            dependsOn: "rod_yob4"
        },
        {
            marker: "rod_yob5",
            type: "datey",
            dependsOn: "rod_yob5"
        },
        {
            marker: "rod_yob6",
            type: "datey",
            dependsOn: "rod_yob6"
        },
        {
            marker: "educ",
            type: "tableValue",
            tableName: "okin",
            dependsOn: "educ_full"
        }
    ]
}