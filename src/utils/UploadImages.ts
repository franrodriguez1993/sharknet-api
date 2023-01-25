import { google } from "googleapis";
import streamifier from "streamifier";
import googleImageInterface from "../interfaces/imageInterface/imgGD.interface";

//VARIABLES:
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_GD;

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
      console.log(e.message);
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
      console.log(e.message);
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
      console.log(e.message);
    }
  }
}
