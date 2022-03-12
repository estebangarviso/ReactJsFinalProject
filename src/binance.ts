/**
 * @see https://docs.binance.org/api-reference/dex-api/ws-connection.html
 * @see https://testnet.binance.vision/
 */
class Binance {
  private ws: WebSocket;
  private wsSubscriptions: { [key: string]: any } = {};
  private wsSubscriptionsCount: number = 0;

  constructor(stream?: string) {
    this.ws =
      new WebSocket('wss://testnet.binance.vision/ws') ||
      new WebSocket('wss://testnet.binance.vision/ws/' + stream);
    this.ws.onopen = this.onOpen;
    this.ws.onmessage = this.onMessage;
    this.ws.onerror = this.onError;
    this.ws.onclose = this.onClose;

    this.sendAllTickers();
  }

  public changeStream(stream: string) {
    this.ws.close();
    this.ws = new WebSocket('wss://testnet.binance.vision/ws/' + stream);
    this.ws.onopen = this.onOpen;
    this.ws.onmessage = this.onMessage;
    this.ws.onerror = this.onError;
    this.ws.onclose = this.onClose;
  }

  private onOpen = (event: Event) => {
    console.log('WebSocket connected');
  };

  private onMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    console.log('WebSocket message', data);
    if (data.stream) {
      const stream = data.stream;
      if (stream.indexOf('@trade') > -1) {
        const symbol = stream.split('@trade')[0];
        const trade = data.data;
        console.log('trade', trade);
      }
    }
  };

  private onError = (event: Event) => {
    console.log('WebSocket error', event);
  };

  public onClose = (event: CloseEvent) => {
    console.log('WebSocket closed', event);
  };

  public close() {
    this.ws.close();
  }

  public isConnected() {
    return this.ws.readyState === WebSocket.OPEN;
  }

  public send(data: any) {
    if (this.isConnected()) {
      this.ws.send(JSON.stringify(data));
    }
  }

  private sendAllTickers() {
    this.ws.send(
      JSON.stringify({
        method: 'SUBSCRIBE',
        params: ['!ticker@arr'],
        id: this.wsSubscriptionsCount,
      })
    );
  }

  public unsubscribeAllTickers() {
    this.ws.send(
      JSON.stringify({
        method: 'UNSUBSCRIBE',
        params: ['!ticker@arr'],
        id: this.wsSubscriptionsCount,
      })
    );
  }

  public subscribeToTicker(symbol: string) {
    if (this.wsSubscriptionsCount === 0) {
      this.ws.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: ['!ticker@arr'],
          id: this.wsSubscriptionsCount + 1,
        })
      );
    }
    this.wsSubscriptionsCount++;
    this.wsSubscriptions[symbol] = this.wsSubscriptionsCount;
    this.ws.send(
      JSON.stringify({
        method: 'SUBSCRIBE',
        params: [`${symbol.toLowerCase()}@ticker`],
        id: this.wsSubscriptionsCount,
      })
    );
  }

  public unsubscribeFromTicker(symbol: string) {
    this.ws.send(
      JSON.stringify({
        method: 'UNSUBSCRIBE',
        params: [this.wsSubscriptions[symbol]],
        id: this.wsSubscriptionsCount,
      })
    );
    delete this.wsSubscriptions[symbol];
    this.wsSubscriptionsCount--;
  }

  public subscribeToTrades(symbol: string) {
    if (this.wsSubscriptionsCount === 0) {
      this.ws.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: ['!trade'],
          id: this.wsSubscriptionsCount,
        })
      );
    }
    this.wsSubscriptionsCount++;
    this.wsSubscriptions[symbol] = this.wsSubscriptionsCount;
    this.ws.send(
      JSON.stringify({
        method: 'SUBSCRIBE',
        params: ['!trade', symbol],
        id: this.wsSubscriptionsCount,
      })
    );
  }

  public unsubscribeFromTrades(symbol: string) {
    this.ws.send(
      JSON.stringify({
        method: 'UNSUBSCRIBE',
        params: [this.wsSubscriptions[symbol]],
        id: this.wsSubscriptionsCount,
      })
    );
    delete this.wsSubscriptions[symbol];
    this.wsSubscriptionsCount--;
  }
}
const binance = new Binance();
export default binance;
