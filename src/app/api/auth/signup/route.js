// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   const existingUser = await prisma.user.findUnique({ where: { email } });

//   if (existingUser) {
//     return NextResponse.json({ error: "User already exists" }, { status: 400 });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await prisma.user.create({
//     data: {
//       email,
//       password: hashedPassword,
//     },
//   });

//   return NextResponse.json(user, { status: 201 });
// }



// Using MongoDB
import bcrypt from 'bcryptjs';
import User from '@/models/User'; // Assuming the User model is already set up for Mongoose
import connectMongo from '@/lib/mongodb'

import { NextResponse } from 'next/server';

export async function POST(req) {

  connectMongo();

  try {
    const { email, password } = await req.json();

    // Check if the email or password is missing
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in MongoDB
    const user = new User({
      email,
      password: hashedPassword,
    });
    await user.save();

    // Return the created user
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
