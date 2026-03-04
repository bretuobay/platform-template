import { redirect } from 'next/navigation';

import { clearTemplateAuthSession } from '../../lib/template-auth';

export const dynamic = 'force-dynamic';

export default async function LogoutPage() {
  await clearTemplateAuthSession();
  redirect('/login');
}
