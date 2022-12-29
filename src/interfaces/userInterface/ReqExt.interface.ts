import { Request } from "express";

export interface RequestExt extends Request {
  uid?: string;
  rol?: string;
}
