namespace my.converter;

entity Conversion {
    key id: UUID;
    inputJson: String;
    outputXml: String;
    conversionTimestamp: Timestamp;
    status: String;
}

entity User {
    key userId: UUID;
    username: String;
    email: String;
    createdAt: Timestamp;
    lastLogin: Timestamp;
}

entity UserConversion {
    userId: Association to User;
    conversionId: Association to Conversion;
}


