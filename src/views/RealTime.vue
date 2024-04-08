<template>
  <div>
    <input v-model="message" type="text" placeholder="Type a message..." />
    <button @click="sendMessage">Send</button>
    <ul>
      <li v-for="msg in messages" :key="msg.id">{{ msg }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";

export default {
  data() {
    return {
      message: "",
      messages: [],
    };
  },
  methods: {
    sendMessage() {
      // Send message to server
      // axios.post('', { text: this.message })
      //     .then(() => {
      //         this.message = '';
      //     })
      //     .catch((error) => {
      //         console.error('Error sending message:', error);
      //     });
    },
  },
  // mounted() {
  //     // Connect to server for realtime updates
  //     const socket = io('http://localhost:3000');
  //     socket.on('buses', (data) => {
  //         this.messages.push(data);
  //     });
  // }
};
</script>
