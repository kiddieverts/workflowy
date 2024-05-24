import { LoaderFunctionArgs, redirect } from '@remix-run/node';
// import * as jose from 'jose';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    try {
        // TODO: Verify signature against Noona public key
        // const url = new URL(request.url);
        // const idToken = jose.decodeJwt(url.searchParams.get('id_token')!);

        return redirect('/workflows');
    } catch (exception) {
        console.error(exception);
    }

    return new Response('Unauthorized', { status: 401 });
};
