const cds = require('@sap/cds')


module.exports = class AdminService extends cds.ApplicationService {

  async init(){
    console.log('AdminService inside');
    const csn1=await cds.compile('*');
    console.log('csn1',csn1);
    const csn2=await cds.compile('file:db');
    console.log('csn2',csn2);
    const csn3=await cds.compile(['db','app','srv']);
    console.log('csn3',csn3);
    // const csn4=await cds.compile('app');  // currently I dont have anything in app folder so "No models found in . Waiting for some to arrive" message will be provided
    // console.log('csn4',csn4);
    const csn5=await cds.compile('file:package.json');
    console.log('csn5',csn5);
    const csn6=await cds.compile(CDL`
    using {cuid} from '@sap/cds/common';
  entity Foo : cuid { foo:String }
  entity Bar as projection on Foo;
  extend Foo with { bar:String }
  `)
  console.log('csn6',csn6);
  const csn7 = cds.compile ({
    'db/schema.cds': `
      using {cuid} from '@sap/cds/common';
      entity Foo : cuid { foo:String }
    `,
    'srv/services.cds': `
      using {Foo} from '../db/schema';
      entity Bar as projection on Foo;
      extend Foo with { bar:String }
    `,
    '@sap/cds/common.csn': `
      {"definitions":{
        "cuid": { "kind": "aspect", "elements": {
          "ID": { "key":true, "type": "cds.UUID" }
        }}
      }}
    `,
  })
  console.log('csn7',csn7);
  const csn8=await cds.compile('file:db',{ min:true, docs:true }).then(cds.minify)
  console.log('csn8',csn8);
  }



  // init() {
  //   const generics = console.log('Inside Admin Service');//... all static method with prefix 'handle_'
  //   for (let each of generics) this[each].call(this)
  //   return super.init()
  // }

  // static handle_authorization() {}
  // static handle_etags() {}
  // static handle_validations() {}
  // static handle_temporal_data() {}
  // static handle_localized_data() {}
  // static handle_managed_data() {}
  // static handle_paging() {}
  // static handle_fiori() {}
  // static handle_crud() {}
}