/**
 * usage : node index.js name_dir_on_server url_path port username password
 *
 * ex : node index.js /srv/www/netex-data netex-data 8888 user password
 *
 */
var express = require("express")
var ss = require("serve-static")
var ba = require("basic-auth")

const args = process.argv;

var app = express()

app.use(entry)
app.use(args[ 2 ], ss(args[ 3 ]))
app.listen(args[ 4 ])

function entry(req, res, next) {
  var objUser = ba(req)
  if (objUser === undefined || objUser.name !== args[ 5 ] || objUser.pass !== args[ 6 ]) {
    res.set("WWW-Authenticate", "Basic realm=Authorization Required")
    res.status(401).end()
  } else {
    next()
  }
}