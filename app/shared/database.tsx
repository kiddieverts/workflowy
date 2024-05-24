import { db } from '~/firebase.server';

export const getScheduledTasks = async (now: Date) => {
  const q = db.collection('schedule').where('timestamp', '<', now);
  const querySnapshot = await q.get();

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as any
  }));
}

export const deleteScheduledTask = async (id: string) => {
  await db.collection('schedule').doc(id).delete();
}

export const getScheduledTasksByCompanyId = async (companyId: string) => {
  const q = db.collection('schedule').where('companyId', '==', companyId);
  const querySnapshot = await q.get();

  return querySnapshot.docs.map(doc => doc.data());
}

export const getSentByCompanyId = async (companyId: string) => {
  const q = db.collection('sent').where('companyId', '==', companyId);
  const querySnapshot = await q.get();

  return querySnapshot.docs.map(doc => doc.data());
}

export const getWorkflowsByCompanyIdAndTriggers = async (companyId: string, triggers: string[]) => {
  const q = db.collection('workflows')
    .where('companyId', '==', companyId)
    .where('trigger', 'in', triggers);

  const querySnapshot = await q.get();
  return querySnapshot.docs.map(doc => doc.data());
}

export const addToScheduledTasks = async (wf, event, timestamp: Date) => {
  await db.collection('schedule').add({
    wf,
    event,
    timestamp,
    dt: timestamp.toISOString(),
    companyId: event.company
  });
}

export const addWorkflow = async (trigger: string, action: string, settings: any, name: string, companyId: string) => {
  const now = new Date();
  await db.collection('workflows').add({
    trigger,
    action,
    settings,
    name,
    companyId,
    dt: now.toISOString(),
    timestamp: now
  });
}

export const getWorkflowsByCompanyId = async (companyId: string) => {
  const q = db.collection('workflows').where('companyId', '==', companyId);
  const querySnapshot = await q.get();

  return querySnapshot.docs.map(doc => doc.data());
}

export const storeOAuthToken = async (companyId, token) => {
  const userRef = db.collection('oauth_tokens').doc(companyId);
  await userRef.set(token);
}

export const addToSent = async (wf, event, timestamp: Date) => {
  await db.collection('sent').add({
    wf,
    event,
    timestamp,
    dt: timestamp.toISOString(),
    companyId: event.company
  });
}

const prepSessionData = (data, expires) => expires ? { data, expires } : { data };

export const createSession = async (data, expires) => {
  const ref = await db.collection('sessions').add(prepSessionData(data, expires));
  return ref.id;
};

export const readSession = async (id) => {
  const session = await db.collection('sessions').doc(id).get();
  return session.exists ? session.data().data : null;
};

export const updateSession = async (id, data, expires) => {
  const ref = db.collection('sessions').doc(id);
  const d = await ref.get();

  if (!d.exists) {
    await db.collection('sessions').add(prepSessionData(data, expires));
  } else {
    await ref.set(prepSessionData(data, expires));
  }
};

export const deleteSession = async (id) => {
  await db.collection('sessions').doc(id).delete();
};

export const addAppToken = async (companyId, appToken) => {
  const ref = db.collection('apptokens').doc(companyId);
  await ref.set(appToken);
}

export const getOAuthTokenByCompanyId = async (companyId: string) => {
  const ref = db.collection('oauth_tokens').doc(companyId);
  const snap = await ref.get();
  return snap.data();
}