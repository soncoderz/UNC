import { NextResponse } from 'next/server';
import { formatResponse, formatError, isValidEmail } from '@/utils/helpers';

/**
 * POST /api/contact
 * Xử lý form liên hệ
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        formatError('Name, email, and message are required', 400),
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        formatError('Invalid email format', 400),
        { status: 400 }
      );
    }

    // Trong thực tế, sẽ lưu vào database hoặc gửi email
    const contactData = {
      id: `contact-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    console.log('New contact submission:', contactData);

    return NextResponse.json(
      formatResponse(contactData, 'Contact form submitted successfully'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      formatError('Failed to process contact form'),
      { status: 500 }
    );
  }
}
