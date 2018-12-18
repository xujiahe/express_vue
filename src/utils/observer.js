class Observer {
  constructor(name) {
    this.name = name;
    this.path = '';
    this.timer = null;
    this.reconnectAttempts = 0;
    this.subs = new Map();
    this.messageList = [];
    this.needReconnect = true;
    this.subscribe.bind(this);
    this.unSubscribe.bind(this);
    this.openSocket.bind(this);
    this.reconnect.bind(this);
    this.invokeMessage.bind(this);
  }
  openSocket(path) {
    this.path = path
    this.ws = new WebSocket(`ws://${this.path}`);
    this.needReconnect = true;
    //开启
    this.ws.onopen = () => {
      this.reconnectAttempts = 0; //重连上后置为0
      console.log(`${this.name}的WebSocket开启成功`);
      this.messageList.length > 0 && this.messageList.forEach(message => {
        this.invokeMessage(message)
      })
    }
    this.ws.onmessage = (event) => {
      var jsonMessage = JSON.parse(event.data);
      const type = jsonMessage.messageType
      const subs = this.subs;
      if (subs.has(type)) {
        subs.get(type).call(this, jsonMessage.messageData)
      } else {
        let timer = setInterval(() => {
          if (subs.has(type)) {
            clearInterval(timer);
            subs.get(type).call(this, jsonMessage.messageData) //如果websocket已经连接发了数据，此时页面没有渲染，数据推可能延迟
          }
        }, 100)
      }
    };
    this.ws.onclose = () => {
      if (this.needReconnect) {
        console.log('WebSocket意外关闭,即将进行重连');
        this.reconnect();
      }
    };
  }
  closeSocket() {
    if (this.ws && this.ws.readyState === 1) {
      this.needReconnect = false;
      this.ws.close();
      console.log(`客户端主动关闭${this.name}的WebSocket`);
    }
  }
  reconnect() {
    if (!this.timer) {
      clearTimeout(this.timer);
    }
    if (this.reconnectAttempts > 10) { //限制最大重连12次
      window.location.replace('/support') //重连失败后跳转到错误页面
      return;
    }
    this.timer = setTimeout(() => {
      this.reconnectAttempts++;
      console.log('WebSocket重连：', this.reconnectAttempts + '次数');
      this.openSocket(this.path);
    }, 30000) //每隔5秒连接一次
  }
  invokeMessage(message) {
    let timer = setInterval(() => {
      if (this.ws && this.ws.readyState === 1) {
        clearInterval(timer);
        this.ws.send(JSON.stringify(message))
        console.log(`发送消息类型${message.messageType}，消息内容为${message.messageData}`);
      }
    }, 100)
  }
  sendMessage(type, message) {
    const data = {
      "messageType": type,
      "messageData": message
    }
    this.invokeMessage(data)
    this.addMessage(data)
  }
  addMessage(data) {
    const hasType = this.messageList.length > 0 && this.messageList.every((item) => {
      return item.messageType == data.messageType
    })
    if (hasType) { //如果存在直接修改原来的记录
      const index = this.messageList.findIndex((element) => {
        element.messageType == data.messageType
      })
      this.messageList.splice(index, 1, data)
    } else {
      this.messageList.push(data);
    }
  }
  subscribe(id, fn) {
    this.subs.set(id, fn);
    console.log('订阅主题', id);
  }
  unSubscribe(id) {
    if (this.subs.has(id)) {
      this.subs.delete(id)
    }
  }
}

export default Observer;