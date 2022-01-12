const moment = require("moment");
const stringToDOM = require("./stringToDOM");
const searchDATA = require("./searchDATA");

module.exports = (inputDATA) => {
  const $ = stringToDOM(inputDATA.data);
  const dataRows = $(".row");

  const wirdoTermFunc = (str) => {
    const arr = [];
    for (let i = 0; i < str.length; i++) {
      arr.push(str[i]);
    }
    console.log(arr);
    return arr.join("");
  };

  const dataValidation = (searchTerm, dataSet) => {
    const returnedInfo = searchDATA(searchTerm, dataSet);
    if (
      returnedInfo === undefined ||
      returnedInfo === "Invalid date" ||
      returnedInfo === ""
    ) {
      return "Not Available / Not Applicable";
    } else if (
      searchTerm === " Date of Incorporation :" ||
      searchTerm === "Date of Registration:" ||
      searchTerm === "Commercial License Validity Date:"
    ) {
      return moment(returnedInfo, "DD MM YYYY").format("DD/MM/YYYY");
    } else {
      return returnedInfo;
    }
  };

  const numberOfSharesWirdoTerm =
    "Number of Issued Shares:\n                                    ";

  const shareholdersWirdoTerm =
    "Shareholders:\n                                ";

  const companyDetailsObj = {};

  //==========BUSINESS DETAILS============

  companyDetailsObj.businessName = dataValidation("Name: ", dataRows);
  companyDetailsObj.tradingName = dataValidation("Trading Name:", dataRows);

  companyDetailsObj.statusOfRegistration = dataValidation(
    "Status of Registration:",
    dataRows
  );
  companyDetailsObj.registredNumber = dataValidation(
    "Registered Number: ",
    dataRows
  );
  companyDetailsObj.registredOffices = dataValidation(
    "Registered offices: ",
    dataRows
  );
  companyDetailsObj.typeOfLicense = dataValidation(
    "Type of License:",
    dataRows
  );

  companyDetailsObj.legalStructure = dataValidation(
    "Legal Structure:",
    dataRows
  );

  companyDetailsObj.dateOfIncorporation = dataValidation(
    " Date of Incorporation :",
    dataRows
  );
  (companyDetailsObj.dateOfRegistration = dataValidation(
    "Date of Registration:",
    dataRows
  )),
    (companyDetailsObj.dateOfDissolution = dataValidation(
      "Date of Dissolution:",
      dataRows
    )),
    (companyDetailsObj.commercialLicenseValidityDate = dataValidation(
      "Commercial License Validity Date:",
      dataRows
    )),
    (companyDetailsObj.directors = dataValidation("Directors:", dataRows));

  companyDetailsObj.shareholders = dataValidation(
    shareholdersWirdoTerm,
    dataRows
  );
  companyDetailsObj.companySecretary = dataValidation(
    "Company Secretary:",
    dataRows
  );

  companyDetailsObj.financialYearEnd = dataValidation(
    "Financial Year End:",
    dataRows
  );
  companyDetailsObj.classOfIssuedShares = dataValidation(
    "Class of Issued Shares:",
    dataRows
  );
  companyDetailsObj.nominalValueOfOneShare = dataValidation(
    "Nominal Value of One Share:",
    dataRows
  );
  companyDetailsObj.numberOfIssuedShares = dataValidation(
    numberOfSharesWirdoTerm,
    dataRows
  );

  companyDetailsObj.businessActivities = dataValidation(
    "Business activities:",
    dataRows
  );

  // console.log(companyDetailsObj);
  return companyDetailsObj;
};
