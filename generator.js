const fs = require("fs");
const path = require("path");

const TEMPLATE_DIR = "templates";
const ASSET_DIR = "assets";

var templates = fs.readdirSync(TEMPLATE_DIR);

function generateFile(p){
    var contents = fs.readFileSync(p, {encoding: "utf-8"});

    while(contents.indexOf("<!--$") != -1){
        var index = contents.indexOf("<!--$");
        var end = contents.indexOf("$-->");
        var command = contents.substring(index+5, end);
        var templateContents = generateFile(path.join(ASSET_DIR, command));
        contents = contents.substring(0, index) + templateContents + contents.substring(end+4);
    }

    return contents;
}


for(var t of templates){
    var generated = generateFile(path.join(TEMPLATE_DIR, t));
    if(!fs.existsSync("gh-pages"))
        fs.mkdirSync("gh-pages");
    fs.writeFileSync(path.join("gh-pages", t), generated)
}