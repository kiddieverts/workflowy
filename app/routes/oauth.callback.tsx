import StepTemplate from "~/components/StepTemplate";
import * as database from '~/shared/database';
import * as api from '~/shared/api';
import { useNavigate } from '@remix-run/react';
import { storage } from '~/utils/session-helpers';
import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const action = url.searchParams.get('action');
  const id_token = url.searchParams.get('id_token');
  const scopes = url.searchParams.getAll('scope') ?? [];

  if (id_token) {
    if (action === 'uninstall') {
      // TODO: Cleanup resources after user uninstalls.
    } else {
      // User clicked 'Open' in 'Noona HQ'. Redirect user to Home
      return redirect(`/home?id_token=${id_token}&action=${action}`);
    }
  }

  // If no code is provided, redirect to the login
  if (!code) {
    return redirect('/');
  }

  // User just clicked 'Install' in 'Noona HQ' so we onboard the user:
  const token = await api.codeTokenExchange(code);
  const accessToken = token.access_token;
  const user = await api.getUserFromToken(accessToken);
  const companyId = user.companies![0];

  const session = await storage.getSession(request.headers.get("Cookie"));

  session.set('userId', user.id);
  session.set('companyId', companyId);
  session.set('noonaAccessToken', accessToken);

  const cookieHeader = await storage.commitSession(session);

  await database.storeOAuthToken(companyId, token);
  await api.createWebhook(accessToken, companyId);

  return json({}, {
    headers: {
      "Set-Cookie": cookieHeader,
    },
  });
}

const Onboarding = () => {
  const navigate = useNavigate();

  return <StepTemplate question="Workflowy installed" onContinue={() => navigate("/workflows")}>
    <div className="p-4">
      You can now start creating workflows, send out custom emails and so much more.
    </div>
  </StepTemplate>
}

export default Onboarding;

