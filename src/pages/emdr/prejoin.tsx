import DailyIframe, { DailyParticipantsObject } from "@daily-co/daily-js";
import "../../styles/prejoin.css"
import axios from "axios";
import React from "react";

interface iStates {
  url: string;
}

export default class Prejoin extends React.Component<any, iStates> {
  private url;
  private callObject;
  local_ref: any;
  remote_ref: any;
  constructor(props: any) {
    super(props);
    this.state = {
      url: "",
    };
    this.url = "http://localhost:3002/daily/new-room";
    this.callObject = DailyIframe.createCallObject();
    this.createCall = this.createCall.bind(this);
    this.joinCall = this.joinCall.bind(this);
    this.participants = this.participants.bind(this);
    this.start = this.start.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.entrar = this.entrar.bind(this);
  }
  handleChange = (event: any) =>
    this.setState({ [event.target.name]: event.target.value } as any);
  async createCall() {
    this.setState({ url: "criando..." });
    return new Promise((resolve, reject) => {
      axios({
        url: this.url,
        method: "POST",
      })
        .then((response: any) => {
          this.setState({ url: response.data.url });
          resolve(response.data.url);
        })
        .catch((response_error: any) => reject(response_error.data.error));
    });
  }

  joinCall(url: any) {
    console.log(url);
    return new Promise((resolve, reject) =>
      this.callObject
        .join({ url })
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    );
  }

  participants(): DailyParticipantsObject {
    return this.callObject.participants();
  }

  async start() {
    try {
      const room_url = await this.createCall();
      console.log(room_url);
    } catch (err) {}
  }

  async entrar() {
    try {
      await this.joinCall(this.state.url);
    } catch (err) {
      console.log(err);
    }
  }
  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream: any) => {
        let video: any = document.querySelector("video");
        video.srcObject = stream;
      });
    this.callObject.on("participant-updated", async (event) => {
      if (event?.participant.video && event.participant.audio) {
        const streams = this.callObject.participants();
        let callItems: any = {};
        let callAudioItems: any = {};
        for (const [id, participant] of Object.entries(streams)) {
          callItems[id] = {
            videoTrack: participant.tracks.video.track,
          };
        }

        for (const [id, participant] of Object.entries(streams)) {
          callAudioItems[id] = {
            audioTrack: participant.tracks.audio.track,
          };
        }

        if (Object.keys(callItems).length >= 2) {
          let videoStreams: any = {};
          let audioStreams: any = {};
          for (const [id] of Object.entries(callItems) as any) {
            if (id !== "local" && !videoStreams[id]) {
              videoStreams[id] = document.createElement("video");
            }
          }
          for (const [id] of Object.entries(callAudioItems) as any) {
            if (id !== "local" && !audioStreams[id]) {
              audioStreams[id] = document.createElement("audio");
            }
          }

          for (const [id, videoStreamer] of Object.entries(
            videoStreams
          ) as any) {
            videoStreamer.setAttribute("class", "video-small");
            videoStreamer.setAttribute("width", "100px");
            videoStreamer.setAttribute("autoplay", "true");
            videoStreamer.setAttribute("id", id);
            const users_containers: any =
              document.getElementById("users-container");
            users_containers.appendChild(videoStreamer);
            const videoStream = new MediaStream();
            videoStream.addTrack(callItems[id].videoTrack);
            videoStreamer.srcObject = videoStream;
          }

          for (const [id, audioStreamer] of Object.entries(
            audioStreams
          ) as any) {
            audioStreamer.setAttribute("autoplay", "true");
            audioStreamer.setAttribute("id", id);
            const audioStream = new MediaStream();
            audioStream.addTrack(callAudioItems[id].audioTrack);
            audioStreamer.srcObject = audioStream;
          }
        }
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <video className="prejoin-camera" autoPlay={true}></video>
        {/* <h2>URL: {this.state.url}</h2>
        <button onClick={this.createCall}>criar link</button>
        <br /> */}
        <button className="px-5 py-3 m-5 text-sm font-semibold text-white bg-gray-900 border border-gray-300 rounded hover:shadow-lg hover:bg-gray-800 hover:text-gray-100" onClick={() => this.joinCall(this.state.url)}>Entrar</button>
        {/* <input onChange={this.handleChange} name="url"></input> */}
        {/*   <button onClick={this.entrar}>join</button>
        <button onClick={this.participants}>participantes </button> */}
        <p className="text-white">https://twitter.com/Rukaszu/status/1468348807322681345</p>
        <div id="users-container"></div>
      </React.Fragment>
    );
  }
}
