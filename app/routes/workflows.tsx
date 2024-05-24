import { Link, useLoaderData } from '@remix-run/react';
import { Workflow as WorkflowIcon, Trash, CalendarCheck, CircleCheckBig } from 'lucide-react';

import { json } from '@remix-run/node';
import { protectEndpoint } from '~/utils/protect-endpoint';
import { getCompanyIdFromCookie } from '~/utils/session-helpers';
import * as database from '~/shared/database';

export const loader = async ({ request }) => {
  await protectEndpoint(request);
  const companyId = await getCompanyIdFromCookie(request);
  const workflows = await database.getWorkflowsByCompanyId(companyId);
  return json({ workflows });
};

const Workflow = () => {
  const { workflows } = useLoaderData<typeof loader>();

  return (
    <WorkFlowTemplate>
      {workflows.length === 0 ? (
        <div className="flex justify-center items-center h-64 bg-white shadow-lg rounded-lg">
          <div className="text-center">
            <WorkflowIcon className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <p className="text-gray-500 mb-2">No workflows yet.</p>
            <p className="text-gray-400 mb-6">Send automated custom emails, SMS alerts, Zapier triggers plus so much more.</p>
            <CreateButton />
          </div>
        </div>
      ) : (
        <>
          {workflows.map((workflow, index) => (
            <div key={index} className="flex justify-between shadow rounded-lg w-full p-4 hover:bg-gray-100 my-2">
              <div className="flex items-center">
                <div className="px-4">
                  <WorkflowIcon className="w-full h-full text-gray-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{workflow.name}</h2>
                  <p className="text-gray-600">Trigger: {workflow.trigger}</p>
                  <p className="text-gray-600">Action: {workflow.action}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Trash className="w-8 text-gray-700 hover:text-red-500 hover:cursor-pointer" />
              </div>
            </div>
          ))}
          <div className="my-4">
            <CreateButton />
          </div>
        </>
      )}
    </WorkFlowTemplate>
  );
};

const CreateButton = () => {
  return (
    <Link to="/wizard">
      <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200">
        Create workflow
      </button>
    </Link>
  );
};

const WorkFlowTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Workflows</h1>
        <div className="flex gap-1">
          <Link to="/scheduled">
            <button className="flex border-2 rounded-xl p-2 hover:bg-gray-300 text-sm items-center gap-1 w-[120px] justify-center">
              <CalendarCheck className="w-4" /> Scheduled
            </button>
          </Link>
          <Link to="/sent">
            <button className="flex border-2 rounded-xl p-2 hover:bg-gray-300 text-sm items-center gap-1 w-[120px] justify-center">
              <CircleCheckBig className="w-4" /> Sent
            </button>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Workflow;
