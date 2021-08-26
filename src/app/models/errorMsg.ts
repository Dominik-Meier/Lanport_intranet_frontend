export class ErrorMsg {
  errorMsg: string;
  serverMsg: string;

  constructor(errorMsg: string, serverMsg: string) {
    this.errorMsg = errorMsg;
    this.serverMsg = serverMsg;
  }
}
