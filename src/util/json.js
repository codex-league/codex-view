export function formatJson(json, options = {}) {
  let formatted = "";
  let pad = 0;
  let PADDING = "    ";

  options.newlineAfterColonIfBeforeBraceOrBracket =
    options.newlineAfterColonIfBeforeBraceOrBracket === true;
  options.spaceAfterColon = options.spaceAfterColon === false;

  if (typeof json !== "string") {
    json = JSON.stringify(json);
  } else {
    json = JSON.parse(json);
    json = JSON.stringify(json);
  }
  let reg = /([{}])/g;
  json = json.replace(reg, "\r\n$1\r\n");
  reg = /([[]])/g;
  json = json.replace(reg, "\r\n$1\r\n");
  reg = /(,)/g;
  json = json.replace(reg, "$1\r\n");
  reg = /(\r\n\r\n)/g;
  json = json.replace(reg, "\r\n");
  reg = /\r\n,/g;
  json = json.replace(reg, ",");
  if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
    reg = /:\r\n\{/g;
    json = json.replace(reg, ":{");
    reg = /:\r\n\[/g;
    json = json.replace(reg, ":[");
  }
  if (options.spaceAfterColon) {
    reg = /:/g;
    json = json.replace(reg, ":");
  }
  json.split("\r\n").forEach(function(node) {
    var i = 0,
      indent = 0,
      padding = "";

    if (node.match(/\{$/) || node.match(/\[$/)) {
      indent = 1;
    } else if (node.match(/\}/) || node.match(/\]/)) {
      if (pad !== 0) {
        pad -= 1;
      }
    } else {
      indent = 0;
    }

    for (i = 0; i < pad; i++) {
      padding += PADDING;
    }
    formatted += padding + node + "\r\n";
    pad += indent;
  });
  return formatted;
}
