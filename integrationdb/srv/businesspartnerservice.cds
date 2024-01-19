using {API_BUSINESS_PARTNER as api} from './external/API_BUSINESS_PARTNER';

namespace com.ladera.businessservice;



entity A_BusinessPartner as projection on api.A_BusinessPartner{
   key PersonFullName,
   key BusinessPartner ,
  Customer,
  Supplier,
  AcademicTitle,
  AuthorizationGroup,
  BusinessPartnerCategory,
  BusinessPartnerGrouping,
  BusinessPartnerName,
  BusinessPartnerUUID,
  CorrespondenceLanguage,
  FirstName,
  MiddleName,
  LastName,
  AdditionalLastName,
  BusinessPartnerFullName,
  Initials,
  FormOfAddress,
  Industry,
  InternationalLocationNumber1,
  InternationalLocationNumber2,
  IsFemale,
  IsMale,
  IsNaturalPerson,
  IsSexUnknown,
  GenderCodeName,Language,LegalForm,OrganizationBPName1,OrganizationBPName2,OrganizationBPName3,OrganizationBPName4,
  OrganizationFoundationDate,OrganizationLiquidationDate,SearchTerm1,SearchTerm2,BirthDate,
  BusinessPartnerBirthDateStatus,BusinessPartnerBirthplaceName,BusinessPartnerDeathDate,
  BusinessPartnerIsBlocked,BusinessPartnerType,ETag,GroupBusinessPartnerName1,GroupBusinessPartnerName2,IndependentAddressID,
  InternationalLocationNumber3,NameCountry,
  NameFormat,PersonNumber,IsMarkedForArchiving,BusinessPartnerIDByExtSystem,BusinessPartnerPrintFormat,BusinessPartnerOccupation,
  BusPartMaritalStatus,BusPartNationality,BusinessPartnerBirthName,BusinessPartnerSupplementName,NaturalPersonEmployerName,
  LastNamePrefix,LastNameSecondPrefix,BPDataControllerIsNotRequired,TradingPartner,
  
  to_BPCreditWorthiness,
  to_BPDataController,to_BPFinServicesReporting,to_BPFiscalYearInformation,to_BPRelationship,to_BuPaIdentification,
  to_BuPaIndustry,to_BusinessPartner,to_BusinessPartnerAddress ,to_BusinessPartnerBank,to_BusinessPartnerContact,
  to_BusinessPartnerRating,to_BusinessPartnerRole,to_BusinessPartnerTax,to_BusPartAddrDepdntTaxNmbr,to_Customer,
  to_PaymentCard,to_Supplier,
  
  
  
}

entity A_BusinessPartnerAddress as projection on api.A_BusinessPartnerAddress{
    BusinessPartner,
  AddressID,
  CityName,
  CityCode,
  Country,
  District,
  ValidityEndDate,
  ValidityStartDate,
  AuthorizationGroup,AddressUUID,AdditionalStreetPrefixName,AdditionalStreetSuffixName,AddressTimeZone,
  CareOfName,CompanyPostalCode,DeliveryServiceNumber,DeliveryServiceTypeCode,FormOfAddress,FullName,
  HomeCityName,HouseNumber,HouseNumberSupplementText,Language,POBox,POBoxDeviatingCityName,POBoxDeviatingCountry,
  POBoxDeviatingRegion,POBoxIsWithoutNumber,POBoxLobbyName,POBoxPostalCode,Person,PostalCode,PrfrdCommMediumType,
  Region,StreetName,StreetPrefixName,TaxJurisdiction,TransportZone,AddressIDByExternalSystem,CountyCode,
  TownshipCode,TownshipName,
  to_AddressUsage,
  to_BPAddrDepdntIntlLocNumber,
  to_BPIntlAddressVersion,
  to_EmailAddress as EmailAssociation,
  to_FaxNumber,
  to_MobilePhoneNumber,
  to_PhoneNumber,
  to_URLAddress
  
}

entity A_AddressEmailAddress as projection on api.A_AddressEmailAddress{
  AddressID,
  Person,
  EmailAddress ,
  IsDefaultEmailAddress

}

entity A_AddressFaxNumber as projection on api.A_AddressFaxNumber{

  key AddressID ,
  key Person ,
  key OrdinalNumber,
  IsDefaultFaxNumber,
  FaxCountry ,
  FaxNumber ,
  FaxNumberExtension ,
  InternationalFaxNumber,
  

}

entity A_AddressHomePageURL as projection on api.A_AddressHomePageURL{

  key AddressID as ID,
   Person as Person,
   OrdinalNumber,
  ValidityStartDate,
   IsDefaultURLAddress,
  SearchURLAddress,
  AddressCommunicationRemarkText,
  URLFieldLength,
  WebsiteURL
  
}

entity A_AddressPhoneNumber as projection on api.A_AddressPhoneNumber{

   key AddressID,
  key Person,
  key OrdinalNumber,
  DestinationLocationCountry,
  IsDefaultPhoneNumber,
  PhoneNumber,
  PhoneNumberExtension,
  InternationalPhoneNumber,
  PhoneNumberType,
  AddressCommunicationRemarkText

}

entity A_BPAddrDepdntIntlLocNumber as projection on api.A_BPAddrDepdntIntlLocNumber{
key AddressID,
key BusinessPartner,
InternationalLocationNumber1,
InternationalLocationNumber2,
InternationalLocationNumber3


}

entity A_BPContactToAddress as projection on api.A_BPContactToAddress{
key RelationshipNumber,
key BusinessPartnerCompany,
key BusinessPartnerPerson,
key ValidityEndDate,
key AddressID,
AddressNumber,
AdditionalStreetPrefixName,
AdditionalStreetSuffixName,
AddressTimeZone,
CareOfName,
CityCode,
CityName,
CompanyPostalCode,
Country,
County,
DeliveryServiceNumber,
DeliveryServiceTypeCode,
District,
FormOfAddress,
FullName,
HomeCityName,
HouseNumber,
HouseNumberSupplementText,
Language,
POBox,
POBoxDeviatingCityName,
POBoxDeviatingCountry,
POBoxDeviatingRegion,
POBoxIsWithoutNumber,
POBoxLobbyName,
POBoxPostalCode,
Person,
PostalCode,
PrfrdCommMediumType,
Region,
StreetName,
StreetPrefixName,
TaxJurisdiction,
TransportZone,
AddressRepresentationCode,
ContactPersonBuilding,
ContactPersonPrfrdCommMedium,
ContactRelationshipDepartment,
ContactRelationshipFunction,
CorrespondenceShortName,
Floor,
InhouseMail,
IsDefaultAddress,
RoomNumber,
to_EmailAddress,
to_FaxNumber,
to_MobilePhoneNumber,
to_PhoneNumber,
to_URLAddress

}

entity A_BPContactToFuncAndDept as projection on  api.A_BPContactToFuncAndDept{
  key RelationshipNumber,
  key BusinessPartnerCompany,
  key BusinessPartnerPerson,
  key ValidityEndDate,
  ContactPersonAuthorityType,
  ContactPersonDepartment,
  ContactPersonDepartmentName,
  ContactPersonFunction,
  ContactPersonFunctionName,
  ContactPersonRemarkText,
  ContactPersonVIPType,
  EmailAddress,
  FaxNumber,
  FaxNumberExtension,
  PhoneNumberExtension,
  PhoneNumber,
  RelationshipCategory
}


entity A_BusinessPartnerBank as projection on api.A_BusinessPartnerBank{
key BusinessPartner, key BankIdentification,
BankCountryKey,BankName,BankNumber,SWIFTCode,BankControlKey,BankAccountHolderName,BankAccountName,IBAN,
IBANValidityStartDate,BankAccount,BankAccountReferenceText,CollectionAuthInd,CityName,AuthorizationGroup


}





