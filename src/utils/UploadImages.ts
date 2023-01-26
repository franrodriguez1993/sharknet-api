import { google } from "googleapis";
import streamifier from "streamifier";
import googleImageInterface from "../interfaces/imageInterface/imgGD.interface";
import serverConfigurations from "../config/configServer";
import logger from "./logger";
//VARIABLES:
const CLIENT_ID = serverConfigurations.google.client_id;
const CLIENT_SECRET = serverConfigurations.google.client_secret;

const REDIRECT_URI = serverConfigurations.google.redirect_uri;
const REFRESH_TOKEN = serverConfigurations.google.refresh_token;

//Cliente OAUTH:
const oauth2client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

//Conexión a Google Drive:
const drive = google.drive({ version: "v3", auth: oauth2client });

export default class UploadImages {
  /** GENERATE PUBLIC URL  **/
  async generatePublicURL(data: googleImageInterface) {
    try {
      //Create permission:
      await drive.permissions.create({
        fileId: data.id,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
      //Get URL:
      const result = await drive.files.get({
        fileId: data.id,
        fields: "webViewLink, webContentLink",
      });
      return result.data;
    } catch (e: any) {
      logger.error(e.message);
    }
  }

  /**  SUBIR IMAGEN **/
  async uploadFile(name: string = "fileImage", data: Buffer, folderID: string) {
    try {
      const stream = streamifier.createReadStream(data);
      const response = await drive.files.create({
        requestBody: {
          name: name,
          mimeType: "image/jpg",
          parents: [folderID],
        },
        media: {
          mimeType: "image/jpg",
          body: stream,
        },
      });
      const linksData = await this.generatePublicURL(response.data);
      return { imageId: response.data.id, linksData };
    } catch (e: any) {
      logger.error(e.message);
    }
  }

  /** BORRAR IMAGEN **/
  async deleteFile(id: string) {
    try {
      const response = await drive.files.delete({
        fileId: id,
      });
      return response.status;
    } catch (e: any) {
      logger.error(e.message);
    }
  }
}
