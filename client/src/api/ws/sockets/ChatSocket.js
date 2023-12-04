import WebSocket from './WebSocket';
import { CONSTANTS } from '../../../constants';
import {
  changeBlockStatusInStore,
} from '../../../store/slices/chatSlice';

class ChatSocket extends WebSocket {
  anotherSubscribes = () => {
    this.onChangeBlockStatus();
  };

  onChangeBlockStatus = () => {
    this.socket.on(CONSTANTS.CHANGE_BLOCK_STATUS, data => {
      this.dispatch(changeBlockStatusInStore(data.message));
    });
  };

  subscribeChat = id => {
    this.socket.emit('subscribeChat', id);
  };

  unsubscribeChat = id => {
    this.socket.emit('unsubscribeChat', id);
  };
}

export default ChatSocket;
