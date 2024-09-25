import { execSync } from 'child_process';
import * as process from 'node:process';
import * as dotenv from 'dotenv';
import * as path from 'path';

export default async function globalSetup() {
  execSync('docker-compose -f docker-compose.test.yml up -d');
  console.log(process.env.DATABASE_URL);
}
