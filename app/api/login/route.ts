import prisma from '@/helpers/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { signJwtAccessToken } from '@/helpers/jwt';

export async function POST(request: NextRequest) {
  try {
    const { mobile } = await request.json();

    if (!mobile) return NextResponse.json({ status: 400, message: 'Both fields are required!' });

    const user = await prisma.user.findFirst({
      where: { mobile },
    });

    if (!user) return NextResponse.json({ status: 400, message: 'user not found!' });

    if (mobile === user.mobile) {
      const accessToken = signJwtAccessToken(user);
      return NextResponse.json({ status: 200, data: { ...user, accessToken } });
    } else return NextResponse.json({ status: 400, message: 'Password incorrect' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error,
      message: 'Something went wrong while trying to log in',
    });
  }
}
