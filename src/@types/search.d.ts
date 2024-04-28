interface searchPayload {
  workorderSearchAttribute: {
    jobDivaStartId: string | null;
    jobDivaJobNumber: string | null;
    vmsId: string | null;
    provider: {
      id: string | null;
      jobDivaCandidateId: string | null;
      zenDeskContactId: string | null;
      s4BusinessPartnerID: string | null;
      companyName: string | null;
      firstName: string | null;
      lastName: string | null;
      emailAddress: string | null;
      phoneNumber: string | null;
    };
    buyer: {
      name: string | null;
    };
  };
  limit: number;
}
interface searchResultResponse {
  data: {
    count: number;
    results: ResultsEntity[];
  };
  errors: errorObj[] | [];
  correlationId: string;
}

interface name {
  fname: string | null;
  lname: string | null;
}

interface ResultsEntity {
  id: string;
  externalIds?: ExternalIdsEntity[] | null;
  provider: Provider;
  name: string;
  buyer: Buyer;
  statementOfWork?: StatementOfWork | null;
  currentPayRate: CurrentPayRateOrCurrentBillRate;
  currentBillRate: CurrentPayRateOrCurrentBillRate;
  unitOfMeasure: string;
  startDate: StartDate;
}

interface ExternalIdsEntity {
  system: string;
  type: string;
  value: string;
  url: string;
}
interface Provider {
  id: string;
  externalIds?: ExternalIdsEntity[] | null;
  firstName: string;
  lastName: string;
  emailAddresses?: string[] | null;
  phoneNumbers?: PhoneNumbersEntity[] | null;
  engagementType: string;
}
interface PhoneNumbersEntity {
  type: string;
  number: string;
}
interface Buyer {
  id: string;
  name: string;
}
interface Error {
  code: string;
  name?: string;
  fieldPath: string;
  path: string | null;
  type: string;
  message: string;
  logs: string;
}

interface CurrentPayRateOrCurrentBillRate {
  localized: string;
  culture: string;
  currency: string;
  value: string;
  raw: number;
}
interface StartDate {
  localized: string;
  value: string;
  culture: string;
  timeZone: string;
  raw: number;
}
interface hoursDataObj {
  date: string | null;
  hours: string | null;
}
interface sickLeaveData {
  hours: number | string | null;
  date: {
    culture: string;
    raw: string | null;
  };
}

interface saveNonPSL {
  operator: { mboId: string | null; email: string | null } | null;
  payAmount?: { currency: string | null; raw: string | null } | null;
  billAmount?: { currency: string | null; raw: string | null } | null;
  workorder: { jobDivaStartId: string | null };
  effectiveDate?: { culture: string | null; raw: string | null } | null;
}

interface savePSL {
  workorder: { jobDivaStartId: string | null };
  paidSickLeave?: sickLeaveData[];
  operator: { mboId: string | null; email: string | null } | null;
}

interface confirmPageData {
  operator: { mboId: string | null; email: string | null } | null;
  workorder: { jobDivaStartId: string | null };
  paidSickLeave: sickLeaveData[] | null;
  effectiveDate: { culture: string | null; raw: string | null } | null;
  payAmount: { currency: string | null; raw: string | null } | null;
  billAmount: { currency: string | null; raw: string | null } | null;
}
