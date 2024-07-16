import { verifyJwt } from '@/helpers/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.headers.get('Authorization') ?? '';
    const decoded = verifyJwt(accessToken);

    if (!accessToken || !decoded)
      return NextResponse.json({
        status: 401,
        message: 'You are not authorized to get this data!',
      });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      result: error,
      message: 'Something went wrong while trying to load the posts.',
    });
  }
}
