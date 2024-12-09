using {Family.db as fam} from '../db/schema';

service processor{
    entity Parent as projection on fam.Parents;

    entity Child as projection on fam.Childs;

    entity GrandChilds as projection on fam.GrandChilds;
}

annotate processor.Parent with @odata.draft.enabled;
annotate processor.Child with @odata.draft.enabled;
annotate processor.GrandChilds with @odata.draft.enabled;

// annotate processor with @(requires: 'support');