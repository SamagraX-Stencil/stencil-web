"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.JsonTable = void 0;
var _index = require("./index");
var meta = {
  title: "Molecule/JsonToTable",
  component: _index.JsonToTable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  },
  args: {
    json: {
      personalDetails: {
        "Aadhaar Card No": "5592****6433",
        "Farmer Category": "SMF",
        "Applicant Name": "MALAR GARNAYAK",
        "Father Name": "ISWAR GARNAYAK",
        District: "ANGUL",
        Block: "KANIHA",
        GP: "KUILEI",
        Village: "Kulei"
      },
      buttons: [{
        id: 0,
        type: "kalia_grievance_status",
        aadhar: "Aadhar number - 559207276433",
        textInEnglish: "Grievance Status",
        text: "Grievance Status"
      }, {
        id: 1,
        type: "kalia_eligibility_criteria",
        aadhar: "Aadhar number - 559207276433",
        textInEnglish: "Eligibility Criteria",
        text: "Eligibility Criteria"
      }, {
        id: 2,
        type: "kalia_benefit_disbursal_history",
        aadhar: "Aadhar number - 559207276433",
        textInEnglish: "Benefit Disbursal History",
        text: "Benefit Disbursal History"
      }]
    }
  }
};
var _default = exports.default = meta;
// export const LoggedIn: Story = {
//   args: {
//     json: {
//       name: 'Jane Doe',
//     },
//   },
// };

var JsonTable = exports.JsonTable = {};