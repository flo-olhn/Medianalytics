import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log('request received:', req.method);
  console.log(req.url);
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get('access_token');
  const expiresIn = searchParams.get('expires_in');
  //const userId = searchParams.get('user_id');
  return NextResponse.json({
    accessToken,
    expiresIn,
    //userId,
  });
  /*
  const url = "https://www.facebook.com/v20.0/dialog/oauth";
  const params = new URLSearchParams({
    client_id: "1506990123556068",
    display: "page",
    extras: JSON.stringify({ setup: { channel: 'IG_API_ONBOARDING' } }),
    redirect_uri: 'https://localhost:3000/dashboard',
    response_type: "token",
    scope: "instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement",
  }).toString();

  const redirectUrl = `${url}?${params}`;
  return NextResponse.redirect(redirectUrl);*/
}

/*
export async function POST(req: Request) {
  //const url = "https://www.facebook.com/v20.0/dialog/oauth?client_id=1506990123556068&display=page&extras={'setup':{'channel':'IG_API_ONBOARDING'}}&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement";
  const url = '/api/facebook';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Error fetching data from Facebook' }, { status: response.status });
    }

    const data = await response.json();
    console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error during fetch:', error);
    return NextResponse.json({ error: 'Internal Sever Error' }, { status: 500 });
  }
}
*/

//export { handler as GET, handler as POST };