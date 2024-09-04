import BlinkingSpinner from '@samagra-x/stencil-molecules/lib/blinking-spinner';
import { JsonToTable } from '@samagra-x/stencil-molecules/lib/json-to-table';
import React from 'react';
const data = {
  personalDetails: {
    'Aadhaar Card No': '5592****6433',
    'Farmer Category': 'SMF',
    'Applicant Name': 'MALAR GARNAYAK',
    'Father Name': 'ISWAR GARNAYAK',
    District: 'ANGUL',
    Block: 'KANIHA',
    GP: 'KUILEI',
    Village: 'Kulei',
  },
  buttons: [
    {
      id: 0,
      type: 'kalia_grievance_status',
      aadhar: 'Aadhar number - 559207276433',
      textInEnglish: 'Grievance Status',
      text: 'Grievance Status',
    },
    {
      id: 1,
      type: 'kalia_eligibility_criteria',
      aadhar: 'Aadhar number - 559207276433',
      textInEnglish: 'Eligibility Criteria',
      text: 'Eligibility Criteria',
    },
    {
      id: 2,
      type: 'kalia_benefit_disbursal_history',
      aadhar: 'Aadhar number - 559207276433',
      textInEnglish: 'Benefit Disbursal History',
      text: 'Benefit Disbursal History',
    },
  ],
};
const molecule = () => {
  return (
    <>
      <p>ankit</p>
      <BlinkingSpinner spinerStyle={{ backgroundColor: 'red' }} />
      <JsonToTable json={data} />
    </>
  );
};

export default molecule;
