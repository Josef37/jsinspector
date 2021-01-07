const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

const reportFile = path.join(__dirname, 'data/report.json')
const reportRaw = fs.readFileSync(reportFile)
const report = JSON.parse(reportRaw)

app.use(cors())

app.get('/ids', (req, res) => {
    const ids = report.map(({ id }) => id)
    res.json(ids)
})

app.get('/item/:id', (req, res) => {
    const item = report.find(item => item.id === req.params.id)
    if (item) res.json(item)
    else res.status(404).send(`Item with ${req.params.id} not found`)
})

app.get('/item/diff/:id/:first/:second', (req, res) => {
    const item = report.find(item => item.id === req.params.id)
    const instance1 = item.instances[req.params.first]
    const instance2 = item.instances[req.params.second]
    const { path1, path2 } = writeInstancesToTemp(instance1, instance2)
    exec(`git diff --no-index --unified=1000 ${path1} ${path2}`, (error, stdout, stderr) => {
        // When using --no-index, git exits with code 1, when there is a difference
        if (error && error.code !== 1) res.status(500).send(error.message)
        else if (stderr) res.status(500).send(stderr)
        else res.send(stdout)
    })
})

function writeInstancesToTemp(instance1, instance2) {
    const tempDir = path.join(__dirname, 'temp')
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir)
    const path1 = path.join(tempDir, 'instance1.js')
    const path2 = path.join(tempDir, 'instance2.js')
    fs.writeFileSync(path1, instance1.code)
    fs.writeFileSync(path2, instance2.code)
    return { path1, path2 }
}

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
