
const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

// Find all JS files in build/static/js
const buildDir = path.join(__dirname, 'build', 'static', 'js');
const files = fs.readdirSync(buildDir).filter(f => f.endsWith('.js') && !f.endsWith('.map'));

console.log('🔐 Obfuscating build files...');

files.forEach(file => {
    const filePath = path.join(buildDir, file);
    const code = fs.readFileSync(filePath, 'utf8');
    
    console.log(`Processing: ${file}`);
    
    const obfuscated = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.5,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.3,
        debugProtection: false,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: false,
        renameGlobals: false,
        selfDefending: false,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 5,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
        transformObjectKeys: false,
        unicodeEscapeSequence: false
    }).getObfuscatedCode();
    
    fs.writeFileSync(filePath, obfuscated);
    console.log(`✅ Obfuscated: ${file}`);
});

console.log('🎉 All files obfuscated!');