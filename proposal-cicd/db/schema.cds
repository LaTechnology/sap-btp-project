    namespace com.ladera.sap.btp.contract.proposal.systems;
using{cuid,managed} from '@sap/cds/common';

entity PS_USER{
    key id                                :   Integer;
    emailId                               :   String(50);
    password                              :   String(50);
    createdBy                             :   String(50);
    createdAt                             :   Timestamp;
    modifiedBy                            :   String(50);
    modifiedAt                            :   Timestamp;
}

entity PS_VENDOR_ORG{
    key id                                :   UUID;
    name                                  :   String(100);
    logo                                  :   LargeBinary;
    website                                 :   String;
        createdBy                             :   String(50);
    createdAt                             :   Timestamp;
    modifiedBy                            :   String(50);
    modifiedAt                            :   Timestamp;

    PS_VENDOR_ORG_CONTACT                 :   Association to many PS_VENDOR_ORG_CONTACT on PS_VENDOR_ORG_CONTACT.PS_VENDOR_ORG=$self;
    // PS_DETAILS                            :   Association to PS_DETAILS;
    
}
entity PS_VENDOR_ORG_CONTACT{
    key id                                :   UUID;
    addressLine1                          :   String(30);
    addressLine2                          :   String(50);
    addressLine3                          :   String(50);
    city                                  :   String(50);
    pincode                               :   String(50);
    state                                 :   String(50);
    country                               :   String(50);
    contact_person_1_mobileNumber         :   String(50);
    contact_person_1_telephoneNumber      :   String(50);
    contact_person_1_emailId              :   String(50);
    contact_person_2_mobileNumber         :   String(50);
    contact_person_2_telephoneNumber      :   String(50);
    contact_person_2_emailId              :   String(50);
        createdBy                             :   String(50);
    createdAt                             :   Timestamp;
    modifiedBy                            :   String(50);
    modifiedAt                            :   Timestamp;
    PS_VENDOR_ORG                     :   Association to PS_VENDOR_ORG;
    
}
//NOTE: CLIENT OR CALLED CUSTOMER
entity PS_CUSTOMER_ORG{
    key id                                 :   UUID;
    name                                   :   String(100);
    logo                                   :   LargeBinary;
    website                                 :   String;
            createdBy                             :   String(50);
    createdAt                             :   Timestamp;
    modifiedBy                            :   String(50);
    modifiedAt                            :   Timestamp;

    PS_CUSTOMER_ORG_CONTACT                :   Association to many PS_CUSTOMER_ORG_CONTACT on PS_CUSTOMER_ORG_CONTACT.PS_CUSTOMER_ORG=$self;
    // PS_DETAILS                             :   Association to PS_DETAILS;
}


entity PS_CUSTOMER_ORG_CONTACT{
    key id                                 :   UUID;
    addressLine1                           :   String(30);
    addressLine2                           :   String(50);
    addressLine3                           :   String(50);
    city                                   :   String(50);
    pincode                                :   String(50);
    state                                  :   String(50);
    country                                :   String(50);
    contact_person_1_mobileNumber          :   String(50);
    contact_person_1_telephoneNumber       :   String(50);
    contact_person_1_emailId               :   String(50);
    contact_person_2_mobileNumber          :   String(50);
    contact_person_2_telephoneNumber       :   String(50);
    contact_person_2_emailId               :   String(50);
            createdBy                             :   String(50);
    createdAt                             :   Timestamp;
    modifiedBy                            :   String(50);
    modifiedAt                            :   Timestamp;
    PS_CUSTOMER_ORG                         :   Association to PS_CUSTOMER_ORG;  
}

entity PS_DETAILS{
    key id                                 :   Integer;
    referenceId                            :   String;
    projectName                            :   String;
    PS_PROJECT_TYPE                        :   Association to  one PS_PROJECT_TYPE;
    proposedDate                           :   Date;
    validTillDate                          :   Date;
    proposedBy                             :   String;
    proposerRole                           :   String;
    proposerDepartment                     :   String;
    createdBy                              :   String(50);
    createdAt                              :   Timestamp;
    modifiedBy                             :   String(50);
    modifiedAt                             :   Timestamp;
    PS_MAIN_SECTION                        :   Association to many PS_MAIN_SECTION on PS_MAIN_SECTION.PS_DETAILS =$self;
    // PS_VENDOR_ORG                           :   Association to PS_VENDOR_ORG ;
    // PS_CUSTOMER_ORG                         :   Association to PS_CUSTOMER_ORG;
    PS_TEMPLATE                            :   Association to many PS_TEMPLATE on PS_TEMPLATE.PS_DETAILS=$self;

}
//sap_btp_rfpn
//sap_btp_rfpui
//sap_btp_rfpj
//sap_btp_rfpj_temp

entity PS_MAIN_SECTION{
    key id                                 :   Integer;
    title                                  :   String;
    description                            :   String; //text area
    section_image                          :   LargeString;
    table_data                              :LargeString;
    tableArea                               :LargeString;
    createdBy                              :   String(50);
    createdAt                              :   Timestamp;
    modifiedBy                             :   String(50);
    modifiedAt                             :   Timestamp;
    PS_DETAILS                             :   Association to PS_DETAILS;
    section_table                          :   LargeBinary ;
    PS_SUB_SECTION                             :   Association to many PS_SUB_SECTION on PS_SUB_SECTION.PS_MAIN_SECTION=$self;

}

entity PS_SUB_SECTION{
   key id                                  :   Integer;
    sub_title                              :   String;
    sub_description                        :   LargeString; 
    sub_section_image                      :   LargeString;
    sub_table_data                          : LargeString;
    createdBy                              :   String(50);
    createdAt                              :   Timestamp;
    modifiedBy                             :   String(50);
    modifiedAt                             :   Timestamp;
    // PS_DETAILS                             :   Association to PS_DETAILS;
    sub_section_table                      :   LargeBinary ;
    PS_MAIN_SECTION                         :   Association to one PS_MAIN_SECTION;

}

entity PS_PROJECT_TYPE{
    key id                                 :   Integer;
    projectType                            :   String;

}

entity PS_TEMPLATE{
    Key id                                 :   Integer;
    name                                   :   String;
    description                            :   String;
    createdBy                              :   String(50);
    createdAt                              :   Timestamp;
    modifiedBy                             :   String(50);
    modifiedAt                             :   Timestamp;
    PS_DETAILS                             :   Association to one PS_DETAILS;

    
}
