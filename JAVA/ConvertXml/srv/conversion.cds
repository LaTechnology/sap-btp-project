namespace JAVA.ConvertXml.srv;

using { my.converter as my } from '../db/Entities';




service ConversionService {
    action convertJsonToXml(inputJson: String) returns String;
    entity Conversions as projection on my.Conversion;
    entity Users as projection on my.User;
}