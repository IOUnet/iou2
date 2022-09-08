const ftp = require("basic-ftp")
const creds = require('../regru.json')


async function upload(server) {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access(server)
        console.log(await client.list())
        await client.ensureDir(server.dir0)
        await client.clearWorkingDir()
        await client.uploadFromDir("./build")
        await client.ensureDir(server.dir1)
        await client.clearWorkingDir()
        await client.uploadFromDir("./build")
        await client.ensureDir(server.dir2)
        await client.clearWorkingDir()
        await client.uploadFromDir("./build")
        await client.ensureDir(server.dir3)
        await client.clearWorkingDir()
        await client.uploadFromDir("./build")
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}

upload(creds);