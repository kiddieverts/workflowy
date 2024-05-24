import { json } from '@remix-run/node';
import { runAction } from '~/utils/run-action';
import * as api from '~/shared/api';
import * as database from '~/shared/database';
import { verifyHashFromHeader } from '~/utils/hash';

export const action = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const webhookPayload = await request.json();
  let event = webhookPayload.data;

  const companyId = event.company;
  verifyHashFromHeader(companyId, request.headers);

  event = await addCustomerEmailToEvent(companyId, event);
  const triggers = ['APPOINTMENT_BOOKED', 'TIME_BEFORE_APPOINTMENT', 'TIME_AFTER_APPOINTMENT'];
  const workflows = await database.getWorkflowsByCompanyIdAndTriggers(companyId, triggers);

  const now = workflows.filter(wf => wf.trigger === 'APPOINTMENT_BOOKED');
  const beforeEventStarts = workflows.filter(wf => wf.trigger === 'TIME_BEFORE_APPOINTMENT');
  const afterEventEnds = workflows.filter(wf => wf.trigger === 'TIME_AFTER_APPOINTMENT');

  // TODO: Handle timezones correctly

  for (const wf of now) {
    if (!isSameServiceType(wf, event)) continue;
    await runAction(wf, event);
  }

  for (const wf of beforeEventStarts) {
    if (!isSameServiceType(wf, event)) continue;

    const { days, hours, minutes } = wf.settings.interval;
    const dt = getDateOffset(event.starts_at, -days, -hours, -minutes);
    await addToSchedule(wf, event, dt);
  }

  for (const wf of afterEventEnds) {
    if (!isSameServiceType(wf, event)) continue;

    const { days, hours, minutes } = wf.settings.interval;
    const dt = getDateOffset(event.ends_at, days, hours, minutes);
    await addToSchedule(wf, event, dt);
  }

  return json({ message: 'Webhook received successfully' }, { status: 200 });
}

const addCustomerEmailToEvent = async (companyId, event) => {
  const oauthToken = await database.getOAuthTokenByCompanyId(companyId);
  const customer = await api.getCustomer(event.customer, oauthToken.access_token);
  event.customerEmail = customer.email;
  return event;
}

const isSameServiceType = (wf, event) => {
  // TODO: Handle when event has more than one event_types.
  return wf.settings.serviceType.includes(event.event_types[0].id);
}

const getDateOffset = (date, days, hours, minutes) => {
  const dt = new Date(date);
  dt.setDate(dt.getDate() + days);
  dt.setHours(dt.getHours() + hours);
  dt.setMinutes(dt.getMinutes() + minutes);
  return dt;
}

const addToSchedule = async (wf, event, timestamp) => {
  await database.addToScheduledTasks(wf, event, timestamp);
}

