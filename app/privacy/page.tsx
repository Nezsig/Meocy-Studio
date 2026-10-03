import { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '../../lib/seo';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { PrivacyCollabSection } from '../../components/PrivacyCollabSection';
import { MilanLegalSection } from '../../components/LegalPolicyPage';

export const metadata: Metadata = pageMetadata({
  path: '/privacy',
  title: 'Privacy Policy — MEOCY',
  description:
    'How MEOCY Studio collects, uses and keeps personal data from project requests, collaboration forms and Milan photoshoot booking requests, and your rights under GDPR.',
});

export default function PrivacyPage() {
  return (
    <div className="min-h-full w-full bg-paper font-sans text-ink">
      <Nav />
      <main className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-tighter-display">
              Privacy Policy
            </h1>
            <p className="mt-4 text-[14px] text-slate2">
              Last updated: October 2026
            </p>

            <div className="mt-12 space-y-8 text-[16px] leading-relaxed text-slate2">
              <section>
                <h2 className="font-semibold text-ink">Who we are.</h2>
                <p className="mt-3">
                  MEOCY is a photography and content studio run by Chamila Prasanna, based in Milan,
                  Italy. For any privacy question, contact hello@meocy.com.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">What we collect.</h2>
                <p className="mt-3">
                  When you use our booking or contact form, we collect the details you provide —
                  your name, email address, phone number, and information about your project. We
                  also keep the emails you send us.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">How we use it.</h2>
                <p className="mt-3">
                  To reply to your enquiry, prepare quotes, schedule and deliver shoots, and send
                  you booking-related emails (such as your confirmation). We do not use your data
                  for advertising and we never sell it.
                </p>
              </section>

              <PrivacyCollabSection />

              <MilanLegalSection page="privacy" />

              <section>
                <h2 className="font-semibold text-ink">Legal basis (GDPR).</h2>
                <p className="mt-3">
                  We process your data to respond to your request and to take steps toward a
                  possible contract, and on the basis of your consent when you contact us.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">Who processes it for us.</h2>
                <p className="mt-3">
                  We use trusted service providers to run our website and email: Vercel (website
                  hosting), Resend (sending confirmation emails), Zoho Mail and Google (receiving
                  and managing email). They process data only on our behalf.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">Technical data.</h2>
                <p className="mt-3">
                  Our hosting provider (Vercel) processes standard technical data, such as IP
                  addresses, to deliver the website and keep it secure. When you send the
                  collaboration or Milan booking form, your IP address is also held briefly in server
                  memory to limit repeated submissions (spam protection); it is not stored in a
                  database or included in emails.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">How long we keep it.</h2>
                <p className="mt-3">
                  Only as long as needed to handle your enquiry or booking and to meet any legal or
                  accounting obligations, after which it is deleted.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">Your rights.</h2>
                <p className="mt-3">
                  You can ask us to access, correct, or delete your data, or object to its use, at
                  any time — just email hello@meocy.com. You also have the right to complain to the
                  Italian Data Protection Authority (Garante per la protezione dei dati personali).
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">Cookies.</h2>
                <p className="mt-3">
                  This website does not set its own cookies and does not use advertising, analytics
                  or tracking cookies. It stores one language preference (meocy-lang) in your
                  browser&apos;s local storage. See the{' '}
                  <Link href="/cookie-policy" className="underline underline-offset-2">
                    Cookie Policy
                  </Link>{' '}
                  for details.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-ink">Changes.</h2>
                <p className="mt-3">
                  We may update this policy; the latest date is shown above.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
