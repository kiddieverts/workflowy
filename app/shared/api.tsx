import { signSha256 } from "./hash";

const NOONA_BASE_PATH = 'https://api.noona.is/v1/hq';

export const getUserFromToken = async (token: string) => {
  const url = `${NOONA_BASE_PATH}/user`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
  });
  return await response.json();
}

export const codeTokenExchange = async (code: string) => {
  const NOONA_CLIENT_ID = process.env.NOONA_CLIENT_ID;
  const NOONA_CLIENT_SECRET = process.env.NOONA_CLIENT_SECRET;

  const url = `${NOONA_BASE_PATH}/oauth/token?client_id=${NOONA_CLIENT_ID}&client_secret=${NOONA_CLIENT_SECRET}`;
  const data = { code, grant_type: 'authorization_code' };

  const response = await fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
}

export const getEventTypesByCompanyId = async (companyId: string, token: string) => {
  const url = `${NOONA_BASE_PATH}/companies/${companyId}/event_types`;

  const response = await fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  const json = await response.json();
  return json.map(eventType => ({ id: eventType.id, title: eventType.title }));
}

export const getCustomer = async (customerId: string, token: string,) => {
  const url = `${NOONA_BASE_PATH}/customers/${customerId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export const createWebhook = async (token: string, companyId: string) => {
  const hash = signSha256(companyId);
  const webhook = {
    title: 'Workflowy event.created webhook',
    description: 'Workflowy event.created webhook. Do not delete unless you know what you are doing.',
    callback_url: `${process.env.APP_BASE_URL}/${process.env.CALLBACK_URL}`,
    events: ['event.created'],
    headers: [
      {
        key: 'x-workflowy-hash',
        values: [hash],
      },
    ],
    enabled: true,
    company: companyId
  };

  const url = `${NOONA_BASE_PATH}/webhooks`;

  const response = await fetch(url, {
    body: JSON.stringify(webhook),
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}