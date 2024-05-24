import { useLoaderData } from '@remix-run/react';

export const loader = () => {
  const params = new URLSearchParams();
  params.append('client_id', process.env.NOONA_CLIENT_ID!);
  params.append('response_type', 'code');
  params.append('redirect_uri', `${process.env.APP_BASE_URL!}/oauth/callback`);
  params.append('scope', 'events:write');

  return { consentScreenUrl: `${process.env.CONSENT_SCREEN_URL!}?${params.toString()}`, };
};

const Login = () => {
  const { consentScreenUrl } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl  font-bold mb-8">Welcome to Workflowy</h1>
      <a href={consentScreenUrl} className="flex gap-4 items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md focus:outline-none text-xl">
        <span>Login with Noona</span>
      </a>
    </div>
  );
}

export default Login;