import { authState, isAuthed } from '@/lib/seo/auth';
import { json } from '@/lib/seo/api';

export async function GET(req: Request) {
  const state = await authState();
  const host = (req.headers.get('host') ?? '').split(':')[0].toLowerCase();
  const local = host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
  return json({
    authed: await isAuthed(),
    configured: state.configured,
    viaEnv: state.viaEnv,
    canSetup: !state.configured && local,
  });
}
