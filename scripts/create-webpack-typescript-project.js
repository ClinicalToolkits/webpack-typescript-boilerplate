#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const projectName = args[0];
const targetPath = args[1] || process.cwd();

if (!projectName) {
  console.log('Please provide a project name.');
  console.log('Usage: create-project my-project /path/to/directory');
  process.exit(1);
}

const fullPath = path.join(targetPath, projectName);

if (fs.existsSync(fullPath)) {
  console.log(`Directory ${fullPath} already exists. Please choose a different project name or path.`);
  process.exit(1);
}

// Clone the boilerplate using degit
execSync(`npx degit ClinicalToolkits/webpack-typescript-boilerplate "${fullPath}"`, { stdio: 'inherit' });

// Navigate to the new project directory
process.chdir(fullPath);

// Initialize a new Git repository
execSync('git init', { stdio: 'inherit' });
execSync(`git remote add origin https://github.com/ClinicalToolkits/${projectName}.git`, { stdio: 'inherit' });

// Update package.json with the new project name
const packageJsonPath = path.join(fullPath, 'package.json');
const packageJson = require(packageJsonPath);

// Update the name field
packageJson.name = projectName;

// Update the repository field
packageJson.repository = {
  type: "git",
  url: `git+https://github.com/your-org/${projectName}.git`
};

// Optionally, update other fields like "bugs" or "homepage"
packageJson.bugs = {
  url: `https://github.com/your-org/${projectName}/issues`
};
packageJson.homepage = `https://github.com/your-org/${projectName}#readme`;

// Write the updated package.json back to the file system
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Copy .env.example to .env
fs.copyFileSync('.env.example', '.env');

// Install dependencies
execSync('npm install', { stdio: 'inherit' });

console.log(`Project ${projectName} created successfully at ${fullPath}.`);
