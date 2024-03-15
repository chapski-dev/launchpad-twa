export interface BlockpassKYCConnectOptions {
  env?: string
  refId?: string
  local_user_id?: string
  elementId?: string
  mainColor?: string
  email?: string
  token?: string
}

export interface BlockpassKYCConnectCallbacks {
  KYCConnectSuccess?: (data: any) => void
  KYCConnectCancel?: () => void
  KYCConnectClose?: () => void
  KYCConnectLoad?: () => void
  KYCConnectData?: (data: any) => void
}

export class BlockpassKYCConnect {
  clientId: string;
  env: string;
  refId: string;
  elementId: string;
  mainColor: string;
  email: string;
  token: string;
  url: string;
  source: string;
  button: HTMLElement;
  html: HTMLElement;
  body: HTMLElement;
  header: HTMLHeadElement;
  link: HTMLLinkElement;
  callbackKYCConnectSuccess: ((data: any) => void) | null;
  callbackKYCConnectCancel: (() => void) | null;
  callbackKYCConnectClose: (() => void) | null;
  callbackKYCConnectLoad: (() => void) | null;
  callbackKYCConnectData: ((data: any) => void) | null;
  container: HTMLDivElement | null;
  iframe: HTMLIFrameElement | null;

  constructor(clientId: string, options: BlockpassKYCConnectOptions = {}) {
      this.clientId = clientId;
      this.env = options.env || "prod";
      this.refId = options.refId || "";
      if (options.local_user_id) this.refId = options.local_user_id;
      this.elementId = options.elementId || "blockpass-kyc-connect";
      switch (this.env) {
          case "prod":
              this.url = "https://identity.blockpass.org/frontend";
              break;
          case "staging":
              this.url = "https://sandbox-identity.blockpass.org/frontend";
              break;
          case "qa":
              this.url = "https://qa-identity.blockpass.org/frontend";
              break;
          default:
              this.url = "https://identity.blockpass.org/frontend";
      }
      this.source = this.url + `/?clientId=${this.clientId}`;
      if (this.refId !== "") this.source += `&refId=${this.refId}`;
      if (options.mainColor !== undefined && options.mainColor !== "") this.source += `&mainColor=${options.mainColor}`;
      if (options.email !== undefined && options.email !== "") this.source += `&email=${encodeURIComponent(options.email)}`;
      if (options.token !== undefined && options.token !== "") this.source += `&token=${options.token}`;
      if (!this.clientId) throw new Error("missing clientId params");
      this.button = document.getElementById(this.elementId)!;
      this.html = document.getElementsByTagName("html")[0];
      this.body = document.getElementsByTagName("body")[0];
      this.header = document.getElementsByTagName("head")[0];
      this.link = document.createElement("link");
      this.link.setAttribute("rel", "prerender");
      this.link.setAttribute("href", this.source);
      this.header.appendChild(this.link);
      if (!this.button) throw new Error('Cannot find the button with id="' + this.elementId + '". Please add it in your html <body>');
      this.callbackKYCConnectSuccess = null;
      this.callbackKYCConnectCancel = null;
      this.callbackKYCConnectClose = null;
      this.callbackKYCConnectLoad = null;
      this.callbackKYCConnectData = null;
      this.container = null;
      this.iframe = null;
      this._initEventHandler();
  }

  startKYCConnect() {
      document.getElementById(this.elementId)!.removeEventListener("click", this._onBtnClickHandler);
      document.getElementById(this.elementId)!.addEventListener("click", this._onBtnClickHandler);
  }

  stopKYCConnect() {
      this.html.style.removeProperty("overflow");
      this.body.style.removeProperty("overflow");
      this.html.style.removeProperty("margin");
      this.body.style.removeProperty("margin");
      if (this.iframe) {
          this.iframe.remove();
          this.iframe = null;
      }
      if (this.container) {
          this.container.remove();
          this.container = null;
      }
      window.removeEventListener("message", this._onIframeMessageHandler);
  }

  on(event: keyof BlockpassKYCConnectCallbacks, callback: (() => void) | ((data: any) => void)) {
      switch (event) {
          case "KYCConnectSuccess":
              this.callbackKYCConnectSuccess = callback as (data: any) => void;
              break;
          case "KYCConnectCancel":
              this.callbackKYCConnectCancel = callback as () => void;
              break;
          case "KYCConnectClose":
              this.callbackKYCConnectClose = callback as () => void;
              break;
          case "KYCConnectLoad":
              this.callbackKYCConnectLoad = callback as () => void;
              break;
          case "KYCConnectData":
              this.callbackKYCConnectData = callback as (data: any) => void;
              break;
      }
  }

  private _appendIframe() {
      this.container = document.createElement("div");
      this.container.setAttribute("style", "z-index: 99999999999; width: 100%; height: 100%; overflow-y: auto; position: fixed; top: 0px; left: 0px; -webkit-overflow-scrolling: touch; line-height: 0;");
      document.body.appendChild(this.container);
      this.iframe = document.createElement("iframe");
      this.html.style.overflow = "hidden";
      this.body.style.overflow = "hidden";
      this.body.style.margin = "0";
      this.iframe.setAttribute("src", this.source);
      this.iframe.setAttribute("allowtransparency", "true");
      this.iframe.setAttribute("frameborder", "none");
      this.iframe.setAttribute("allow", "camera");
      this.iframe.setAttribute("border", "0");
      this.iframe.setAttribute("resize", "none");
      this.iframe.setAttribute("id", "blockpass-kyc-web");
      this.iframe.setAttribute("style", "z-index: 99999999999; width: 100%; height: 100%; overflow-x: hidden; overflow-y: auto; visibility: visible; margin: 0px; padding: 0px; border-color: transparent; border-width: 0; border-style: none; left: 0px; top: 0px; -webkit-tap-highlight-color: transparent;");
      this.container.appendChild(this.iframe).focus();
  }

  private _getEvents() {
      window.addEventListener("message", this._onIframeMessageHandler);
  }

  private _deleteToken() {
      let url = new URL(this.source);
      let searchParams = new URLSearchParams(url.search.slice(1));
      searchParams.delete("token");
      url = new URL(this.url + "/?" + searchParams);
      this.source = url.toString();
  }

  private _initEventHandler() {
      this._onBtnClickHandler = (e) => {
          this._appendIframe();
          this._getEvents();
          this._deleteToken();
      };

      this._onIframeMessageHandler = (e) => {
          if (!new URL("", e.origin).hostname.endsWith("blockpass.org")) return;
          const data = e.data || {};
          if (data === "KYCConnectSuccess" && typeof this.callbackKYCConnectSuccess === "function")
              this.callbackKYCConnectSuccess(this.getProp(data, "payload.customData.extraData", {}));
          else if (data === "KYCConnectCancel") {
              this.stopKYCConnect();
              if (typeof this.callbackKYCConnectCancel === "function")
                  this.callbackKYCConnectCancel();
          } else if (data === "KYCConnectClose") {
              this.stopKYCConnect();
              if (typeof this.callbackKYCConnectClose === "function")
                  this.callbackKYCConnectClose();
          } else if (data === "KYCConnectLoad" && typeof this.callbackKYCConnectLoad === "function") {
              this.callbackKYCConnectLoad();
          } else if (data.event === "KYCConnectData") {
              const eventData = this.getProp(data, "payload", {});
              if (typeof this.callbackKYCConnectData === "function")
                  this.callbackKYCConnectData(eventData);
          }
      };
  }

  private _onBtnClickHandler: (event: MouseEvent) => void;
  private _onIframeMessageHandler: (event: MessageEvent) => void;

  private getProp(obj: any, path: string | string[], defaultValue: any): any {
      let value = obj;
      const paths = Array.isArray(path) ? path : path.split(".");
      for (const p of paths) {
          if (value[p] === undefined) return defaultValue;
          value = value[p];
      }
      return value;
  }
};