const cds=require('@sap/cds');
cds.app = require('express')()

cds.Event
module.exports=cds.service.impl(async function (){
    const {Books,Author}= this.entities
    console.log('Books');
    
    this.on('*',[Author,Books],async req=>{
        
            // console.log(req);
            const [ Books,Author ] = req.params
            // console.log(cds.context);
            console.log(Books);
            console.log(Author);

            // console.log(req.http);
            // let { res } = req.http
            // res.send('Hello!')

            const {uuid,decodeURI,read,fs,path,exists,isdir,isfile,write,copy,mkdirp,rmdir,rimraf,rm} = cds.utils
                let id = uuid(); //generate a new UUID everytime I click the  Books or Author
                console.log(id);
                let uri=decodeURI('%E0%A4%A') //non-decodable input return the input string instead of throwing URIErrors
                console.log(uri);
                let json = await fs.promises.readFile( path.join(cds.root,'package.json'), 'utf8')
                console.log(cds.root); //gives the current project location
                console.log(json); // reads the given package.json
                let pkg = await read ('package.json') //reads the files content 
                console.log(pkg);
                let file ='processor.js'
                // if(exists('processor.js')){  // If the file is present in the root directory(project directory) it gives true
                //     console.log('server.js is present');
                //     if (file) return fs.existsSync (path.resolve (cds.root,file))
                // return 'server.js is present'
                // }
                // else{
                //     if (file) return fs.existsSync (path.resolve (cds.root,file))
                //     console.log('server.js is not present');
                // return 'server.js is not present'
                // }
                let dir=isdir('app') //if the directory is present it gives its location
                let file2=isfile('package.json') //if the file is present it gives its location
                if(dir){
                    console.log(dir); //D:\Nitishraj_R\VS_Code_Programs\btp-project\sap-btp-project\CapireSample2\app
                    console.log('file2',file2); //file2 D:\Nitishraj_R\VS_Code_Programs\btp-project\sap-btp-project\CapireSample2\package.json
                    let entries = fs.readdirSync(dir)
                    console.log(entries);
                }
                else{
                    console.log('app is not present');
                }
                // await write ({foo:'bar'}) .to ('some','file.json')
                // await write ({foo:'bar'}) .to ('some/file.json')
                await write ('some/file.json', {foo:'bar'})  //writes the content into the destination file

                // await copy('db/data').to('dist','db','data')
                // await copy('db/data').to('dist/db/data')
                await copy('db/data','dist/db/data') //copies the src to dst, optionally with a fluent API. Both can be files or folders.

                // await mkdirp('dist2','db','data') //Creates a directory at the given path
                // await mkdirp('dist3/db/data')

                // await rmdir('dist3','db','data') //Deletes the directory at the given path, throwing an error if it doesn't exist.
                // await rmdir('dist2/db/data')

                await rimraf('dist2','db') //Deletes the directory at the given path, if exists, doing nothing, if not
                await rimraf('dist3/db')

                // await rm('dist','db','data')  //Deletes the file at the given path but it throws error???
                // await rm('dist3/db/data')
                console.log('path',path);
                if (exists('package.json')){  // The package.json is present in the root folder so it returns true
                    console.log('present');
                }
                else{
                    console.log('not present');
                }
            return cds.tx(req).run(req.query);
        });
    });
