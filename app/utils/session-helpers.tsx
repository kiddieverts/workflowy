import { createSessionStorage } from "@remix-run/node";
import * as database from "~/shared/database";

export const storage = createSessionStorage({
  cookie: {
    name: "__session",
    secrets: [process.env.SECRET],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
  createData: database.createSession,
  readData: database.readSession,
  updateData: database.updateSession,
  deleteData: database.deleteSession
});

export const getCompanyIdFromCookie = async (request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return session ? session.get('companyId') : null;
};

export const getAccessTokenFromCookie = async (request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return session ? session.get('noonaAccessToken') : null;
};
