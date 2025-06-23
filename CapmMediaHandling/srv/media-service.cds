using { CapmMediaHandling.db as db } from '../db/shcema';

service MediaFile@(path:'/media') {
    entity MediaFile as projection on db.MediaFile;
    entity ImageFile as projection on db.ImageFile;

    action getCSVData(fileID: UUID) returns String;

}