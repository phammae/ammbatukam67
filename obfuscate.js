const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');

// Read App.js
const code = fs.readFileSync('./src/App.js', 'utf8');

// Obfuscate (medium level - good for CTF)
const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.5,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.3,
    debugProtection: false,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: false,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
}).getObfuscatedCode();

// Save
fs.writeFileSync('./src/App.obfuscated.js', obfuscatedCode);

console.log('✅ Obfuscation complete!');
console.log('📁 Output: src/App.obfuscated.js');