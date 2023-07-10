const path = require('path')
path.root = (...p) => path.join(process.cwd(), ...p)
path.src = (...p) => path.join(process.cwd(), 'src', ...p)

module.exports = path