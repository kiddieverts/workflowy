import { Link, json, useLoaderData } from "@remix-run/react";
import { ArrowLeft, Zap } from "lucide-react";

import * as database from '~/shared/database';
import { protectEndpoint } from "~/utils/protect-endpoint";

import { getCompanyIdFromCookie } from "~/utils/session-helpers";

export const loader = async ({ request }) => {
  await protectEndpoint(request);
  const companyId = await getCompanyIdFromCookie(request)
  const sent = await database.getSentByCompanyId(companyId);
  return json({ sent });
};

const Sent = () => {
  const { sent } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Link to="/workflows">
            <button className="flex text-white  bg-blue-500 rounded-full p-2 hover:bg-blue-600 text-sm items-center gap-1   justify-center">
              <ArrowLeft />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Sent</h1>
        </div>
      </div>
      <div>
        {sent.map((s, index) => <>
          <div key={index} className="flex justify-between shadow rounded-lg w-full p-4 hover:bg-gray-100 my-2">
            <div className="flex items-center">
              <div className="px-4">
                <Zap className="w-full h-full text-gray-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{s.wf.name}</h2>
                <p className="text-gray-600">Trigger: {s.wf.trigger}</p>
                <p className="text-gray-600">Action: {s.wf.action}</p>
                <p className="text-gray-600">Sent at: {new Date(s.dt).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
            </div>
          </div>
        </>)}
      </div>
    </div>
  );
};

export default Sent