const { app, Menu } = require('electron')

let expectedMenu

if (app.commandLine.hasSwitch('custom-menu')) {
  expectedMenu = new Menu()
  Menu.setApplicationMenu(expectedMenu)
} else if (app.commandLine.hasSwitch('null-menu')) {
  expectedMenu = null
  Menu.setApplicationMenu(null)
}

app.on('ready', () => {
  setImmediate(() => {
    process.stdout.write(JSON.stringify(Menu.getApplicationMenu() === expectedMenu))
    process.stdout.end()

    app.quit()
  })
})
