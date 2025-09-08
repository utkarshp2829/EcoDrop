import emailjs from '@emailjs/browser';
import { auth } from '@/lib/firebase';

export interface ScheduleEmailData {
  date: string;
  time: string;
  stationName?: string;
  categories?: Record<string, number>;
}

export async function sendScheduleConfirmationEmail(data: ScheduleEmailData): Promise<void> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS env vars missing (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY)');
  }

  const formattedDate = data.date ? new Date(data.date).toLocaleDateString() : '';
  const categorySummary = data.categories
    ? Object.entries(data.categories)
        .map(([key, qty]) => `${key}: ${qty}`)
        .join(', ')
    : 'N/A';

  const rawEmail = auth.currentUser?.email ?? '';
  const userEmail = rawEmail.trim();
  if (!userEmail || !userEmail.includes('@')) {
    throw new Error('No email found for the logged-in Firebase user');
  }

  const templateParams: Record<string, unknown> = {
    // Provide multiple keys to accommodate different EmailJS template setups
    to_email: userEmail,
    to: userEmail,
    email: userEmail,
    subject: 'EcoDrop: Drop-off Appointment Confirmation',
    message: `Your drop-off is scheduled on ${formattedDate} at ${data.time} ${
      data.stationName ? `at ${data.stationName}` : ''
    }. Categories: ${categorySummary}.`,
    date: formattedDate,
    time: data.time,
    station: data.stationName ?? '',
    categories: categorySummary,
  };

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
  } catch (err: unknown) {
    // Surface a clearer error for the UI and console
    const errorMessage =
      (typeof err === 'object' && err !== null && 'text' in err && typeof (err as any).text === 'string')
        ? (err as any).text
        : (err instanceof Error ? err.message : 'Unknown error while sending email');
    console.error('EmailJS send failed:', err);
    throw new Error(`Email send failed: ${errorMessage}`);
  }
}