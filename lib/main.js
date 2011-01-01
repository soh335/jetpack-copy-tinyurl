var contextMenu = require('context-menu');
var clipboard = require('clipboard');
var xhr = require('xhr');
var notifications = require('notifications');

exports.main = function() {
    var myItem = contextMenu.Item({
        label: "copy tinyurl",
        context: contextMenu.SelectorContext("a[href]"),
        contentScript:  'on("click", function(node, data) {' +
                        '   postMessage(node.href);'+
                        '});',
        onMessage: function(mes) {
            var req = new xhr.XMLHttpRequest();
            var url = "http://tinyurl.com/api-create.php?url=";
            req.open("GET", url+encodeURI(mes));
            req.send(null);
            req.onreadystatechange = function() {
                if (req.readyState == 4 ) {
                    if (req.status == 200) {
                        clipboard.set(req.responseText);
                        notify("successed!");
                    }
                    else {
                        notify("faild!");
                    }
                }
            };
        }
    });
};

function notify(text) {
    notifications.notify({
        title: "CopyTinyURL",
        text: text
    });
}
