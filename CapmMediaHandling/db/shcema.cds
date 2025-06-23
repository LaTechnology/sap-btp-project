namespace CapmMediaHandling.db;

using {cuid} from '@sap/cds/common';

entity MediaFile : cuid {
    @Core.ContentDisposition.Filename: fileName
    @Core.MediaType                  : mediaType
    content   : LargeBinary;
    fileName  : String;

    @Core.IsMediaType: true
    mediaType : String;
    url       : String;
}


entity ImageFile : cuid {
    @Core.MediaType: 'image/png' 
    content : LargeBinary;
    // fileName  : String;
    // @Core.IsMediaType: true
    // mediaType : String;
    // url       : String;
}
