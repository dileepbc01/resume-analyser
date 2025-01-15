// import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { OnEvent } from '@nestjs/event-emitter';
// import { Server } from 'socket.io';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// export class FileUploadGateway {
//   @WebSocketServer()
//   server: Server;

//   @OnEvent('upload.progress')
//   handleUploadProgress(payload: { uploadId: string; progress: number }) {
//     this.server.emit(`upload-progress-${payload.uploadId}`, payload.progress);
//   }
// }
