const setEnv = () => {
    const fs = require('fs');
    const writeFile = fs.writeFileSync;

    const targetPath = './environment.ts';

    const envConfigFile = `export const environment = {
        BUNGIE_API_KEY: '${process.env.BUNGIE_API_KEY}',
        DEST_MEMBER_ID: '${process.env.DEST_MEMBER_ID}',
        HUNTER_CHAR_ID: '${process.env.HUNTER_CHAR_ID}'
    };`;

    console.log('The file `environment.ts` will be written with the following content: \n');
    writeFile(targetPath, envConfigFile, (err) => {
        if(err) {
            console.error(err);
            throw err;
        } else {
            console.log('File written successfully');
        }
    });
}

setEnv();