import { storage } from "./session-helpers";

export const protectEndpoint = async (request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));

  if (!session || !session.has("userId")) {
    throw new Response("Unauthorized", { status: 401 });
  }
};