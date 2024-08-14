import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Fake data to seed the database
const users = [
  {
    mobile: '09159619974',
    first_name: 'علی',
    last_name: 'رادمنش',
    otp_code: '12345',
    otp_expiry: dayjs().add(2, 'minute').toISOString(),
  },
  {
    mobile: '09358916620',
    first_name: 'علی',
    last_name: 'رادمنش',
    otp_code: '54321',
    otp_expiry: dayjs().add(3, 'minute').toISOString(),
  },
];

// Define the main function that will handle database operations
async function main() {
  // Create new users in the database using Prisma Client
  for (const data of users) {
    const user = await prisma.user.create({
      data,
    });

    // Output the mobile of the newly created user
    console.log(`Created user: ${user.mobile}`);
  }
}

// Execute the main function and handle disconnection and errors
main()
  .then(() => prisma.$disconnect()) // Disconnect from the database on successful completion
  .catch(async (e) => {
    console.error(e); // Log any errors
    await prisma.$disconnect(); // Ensure disconnection even if an error occurs
    process.exit(1); // Exit the process with an error code
  });
