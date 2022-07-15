// eslint-disable-next-line
const { readdirSync, readFileSync, writeFileSync } = require('fs')

function setNewAtoms() {
  const atomsFolder = 'public/styles'

  readdirSync(atomsFolder).forEach(file => {
    let fileData = readFileSync(`${atomsFolder}/index.js`).toString('utf8')
  
    if (file != 'index.js') {
      if (!fileData.includes(file)) {  
        fileData += `export * from './${file}'\n`
      }

      writeFileSync(`${atomsFolder}/index.js`, fileData)
    }
  })

}

setNewAtoms()