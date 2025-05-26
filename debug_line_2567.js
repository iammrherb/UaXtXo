const fs = require('fs');
const content = fs.readFileSync('js/views/zero-trust-executive-platform.js', 'utf8');
const lines = content.split('\n');

console.log('\n=== Debugging Line 2567 ===');
console.log(`Total lines in file: ${lines.length}`);

if (lines.length > 2566) {
    console.log('\nLines around 2567:');
    for (let i = 2564; i < Math.min(2570, lines.length); i++) {
        const line = lines[i];
        const lineNum = i + 1;
        console.log(`${lineNum}: ${line}`);
        
        // Check for const issues
        if (line.match(/const\s+[a-zA-Z_]\w*\s*;/)) {
            console.log(`  ⚠️  Found const without initializer!`);
        }
        if (line.match(/const\s+[a-zA-Z_]\w*\s*$/)) {
            console.log(`  ⚠️  Found const at end of line without value!`);
        }
        if (line.match(/const\s+isPor$/)) {
            console.log(`  ⚠️  Found truncated 'const isPor'!`);
        }
    }
}
