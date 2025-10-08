import prisma from '../src/generated/prisma/index.js';

(async () => {
  try {
    console.log('Import ok, attempting a simple query...');
    const databases = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Query OK:', databases);
    process.exit(0);
  } catch (e) {
    console.error('Prisma import/query error:', e);
    process.exit(1);
  }
})();
