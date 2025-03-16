import { NextResponse } from 'next/server';
import { testEmailConnection, sendTestEmail } from '@/lib/email/test';

// DŮLEŽITÉ: Tento endpoint by neměl být dostupný v produkčním prostředí!
// V produkci byste měli tento soubor odstranit nebo přidat autentizaci

export async function GET(request: Request) {
  // Kontrola, zda jsme v development prostředí
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { success: false, message: 'Tento endpoint není dostupný v produkci' },
      { status: 403 }
    );
  }

  // Získání e-mailové adresy z URL parametrů
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { success: false, message: 'Chybí e-mailová adresa - použijte parametr ?email=vas@email.cz' },
      { status: 400 }
    );
  }

  try {
    // Otestování připojení
    const connectionTest = await testEmailConnection();

    if (!connectionTest) {
      return NextResponse.json(
        { success: false, message: 'Nepodařilo se připojit k SMTP serveru' },
        { status: 500 }
      );
    }

    // Odeslání testovacího e-mailu
    const emailSent = await sendTestEmail(email);

    if (emailSent) {
      return NextResponse.json(
        { success: true, message: `Testovací e-mail odeslán na adresu ${email}` },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Nepodařilo se odeslat testovací e-mail' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Chyba při testování e-mailu:', error);
    return NextResponse.json(
      { success: false, message: 'Došlo k neočekávané chybě při testování e-mailu' },
      { status: 500 }
    );
  }
}
