import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getMessGroupById } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-07-30.basil' });

export async function POST(req: NextRequest) {
  try {
    const { user_id, mess_group_id, room_type } = await req.json();
    if (!user_id || !mess_group_id || !['single', 'double'].includes(room_type)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    // Fetch mess group and price using manual function
    const messGroup = await getMessGroupById(mess_group_id);
    if (!messGroup) {
      return NextResponse.json({ error: 'Mess group not found' }, { status: 404 });
    }
    const price = room_type === 'single' ? messGroup.single_price : messGroup.double_price;
    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'bdt',
            product_data: {
              name: `${messGroup.name} (${room_type} room)`
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/mess/${mess_group_id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/mess/${mess_group_id}?canceled=1`,
      metadata: {
        user_id,
        mess_group_id,
        room_type,
      },
    });
    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to initiate booking' }, { status: 500 });
  }
}
