// app/api/join-waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, name, program } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    // --- IMPORTANT: Replace this with your actual backend logic ---
    // Example: Store in a database, add to an email list, send a notification.
    console.log(`New waitlist sign-up:`);
    console.log(`Email: ${email}`);
    console.log(`Name: ${name || 'N/A'}`);
    console.log(`Program: ${program}`);

    // Simulate a database save or external API call
    // await saveEmailToDatabase({ email, name, program }); // Your function here
    // await addToEmailMarketingList(email); // Your function here

    // Simulate success
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    return NextResponse.json({ message: 'Successfully joined waitlist!' }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}