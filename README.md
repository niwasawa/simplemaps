# simplemaps
Simple Maps Web Application Server

This code is experimental and unstable.

[![npm version](https://badge.fury.io/js/simplemaps.svg)](https://badge.fury.io/js/simplemaps)

This is a Simple Chizu (Simple Map) Web Application.
This uses Yahoo! JAPAN Developer Network YOLP(Map) Static Map API http://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/static.html

Installation
------------

```
npm install simplemaps
```

Using Sample Code
------------

One: Download example/app.js and example/template.html

```
wget https://raw.githubusercontent.com/niwasawa/simplemaps/master/example/app.js
wget https://raw.githubusercontent.com/niwasawa/simplemaps/master/example/template.html
```

Two: Modify appid at example/app.js

```
"appid": "<Your Application ID by Yahoo! JAPAN Developer Network>",
```

Three: Start Server by Node.js

```
node app.js
```

Four: Access Simple Maps Web Application Server

Access to http://localhost:8888/maps/ by your web browser.

![Sample: Simple Maps Web Application Server](https://github.com/niwasawa/simplemaps/raw/master/simplemap.png "Sample: Simple Maps Web Application Server")

