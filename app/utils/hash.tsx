import crypto from 'crypto';

const signSha256withSecret = (data, secret) => crypto.createHmac('sha256', secret).update(data).digest('hex');

export const signSha256 = (data) => signSha256withSecret(`${process.env.SALT}|${data}`, process.env.SECRET);

export const verifyHashFromHeader = (data: string, headers) => {
    const hashFromHeader = headers.get('x-workflowy-hash');
    const actualHash = signSha256(data);

    if (hashFromHeader !== actualHash) {
        throw new Response("Unauthorized", { status: 401 });
    }
}