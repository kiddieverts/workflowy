import { json } from '@remix-run/node';
import * as database from '~/shared/database';
import { verifyHashFromHeader } from '~/utils/hash';
import { runAction } from '~/utils/run-action';

// This function is invoked by an external scheduler/cron at an interval.

export const action = async ({ request }) => {
  verifyHashFromHeader("workflowy", request.headers);
  const now = new Date();
  const scheduledTasks = await database.getScheduledTasks(now);

  for (const s of scheduledTasks) {
    const { wf, event } = s;
    await runAction(wf, event);
    // Remove the document after running the task
    await database.deleteScheduledTask(s.id);
  }

  return json({ ranAt: now });
}


