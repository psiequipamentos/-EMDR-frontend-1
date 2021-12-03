import React from "react";
import { Socket } from "socket.io-client";
import { createNoSubstitutionTemplateLiteral } from "typescript";
import sound1 from "../../assets/musicas/dripping-faucet-no-3-drop.mp3";
import sound2 from "../../assets/musicas/gently-rippling-stream-in-the.mp3";
import sound3 from "../../assets/musicas/ocean-waves-light-surf-on.mp3";
import sound4 from "../../assets/musicas/shower-in-filled-bathtub.mp3";
import sound5 from "../../assets/musicas/sparkling-stream-in-the-quiet.mp3";
import sound6 from "../../assets/musicas/sparrow-chirps-3-times-in-a.mp3";
import sound7 from "../../assets/musicas/stone-throwing-in-water.mp3";
import sound8 from "../../assets/musicas/underwater-image-of-a-river.mp3";

import sound9 from "../../assets/tons/104242970.mp3";
import sound10 from "../../assets/tons/108001370.mp3";
import sound11 from "../../assets/tons/108001386.mp3";
import sound12 from "../../assets/tons/115054166.mp3";
import sound13 from "../../assets/tons/147775842.mp3"
import sound14 from "../../assets/tons/218248983.mp3"
import sound15 from "../../assets/tons/88495192.mp3"
import sound16 from "../../assets/tons/89096439.mp3"
import sound17 from "../../assets/tons/90586315.mp3"

import SelectCustom from "../../components/inputs/select-custom";

interface ISoundProps {
  ControlsVisibility: boolean;
  soundBalance: number;
  play: boolean;
  velocity: number;
  socket: any;
}

interface ISoundState {
  play: boolean;
  sound: any;
  soundList: any;
  volume: any;
  stereoNode: any;
  audioNode: any;
  playbackRate: any
}

const musicas = [
  { name: "dripping faucet no 3 drop", value: sound1 },
  { name: "gently rippling stream in the", value: sound2 },
  { name: "ocean waves light surf on", value: sound3 },
  { name: "shower in filled bathtub", value: sound4 },
  { name: "sparkling stream in the quiet", value: sound5 },
  { name: "sparrow chirps 3 times-in a", value: sound6 },
  { name: "stone throwing in water", value: sound7 },
  { name: "underwater image of a river", value: sound8 },
];

const toques = [
  { name: "som 1", value: sound9 },
  { name: "som 2", value: sound10 },
  { name: "som 3", value: sound11 },
  { name: "som 4", value: sound12 },
  { name: "som 5", value: sound13 },
  { name: "som 6", value: sound14 },
  { name: "som 7", value: sound15 },
  { name: "som 8", value: sound16 },
  { name: "som 9", value: sound17 },
];

const semSom = [{ name: "Selecione um som", value: "Selecione um som" }];

const allSounds = [
  { name: "Selecione um som", value: "Selecione um som" },
  { name: "dripping faucet no 3 drop", value: sound1 },
  { name: "gently rippling stream in the", value: sound2 },
  { name: "ocean waves light surf on", value: sound3 },
  { name: "shower in filled bathtub", value: sound4 },
  { name: "sparkling stream in the quiet", value: sound5 },
  { name: "sparrow chirps 3 times-in a", value: sound6 },
  { name: "stone throwing in water", value: sound7 },
  { name: "underwater image of a river", value: sound8 },
];

const soundTypes = [
  { name: "Tipo de som", value: semSom },
  { name: "Toques", value: toques },
  { name: "Músicas", value: musicas },
];

export default class EmdrSounds extends React.Component<
  ISoundProps,
  ISoundState
> {
  constructor(props: ISoundProps) {
    super(props);

    this.state = {
      sound: sound1,
      soundList: allSounds,
      volume: 0.1,
      stereoNode: {},
      play: false,
      audioNode: '',
      playbackRate: 1
    };
    this.handleAudio = this.handleAudio.bind(this);
    this.handleType = this.handleType.bind(this);
    this.deleteAudio = this.deleteAudio.bind(this);
    this.createAudio = this.createAudio.bind(this);
    this.audioHandler = this.audioHandler.bind(this);
    this.connectStereo = this.connectStereo.bind(this)
    this.play = this.play.bind(this)
  }

  
  handleAudio(event: any) {
    const name = event.target.name
    const value = event.target.value
    this.deleteAudio();
    this.setState({ sound : value } as any, () =>
      this.createAudio(this.state.sound)
    );

    const url = window.location.href;
    const user_type = url.split("/").reverse()[0];
    if(user_type === 'psicologo'){
      const data_to_send = {
        property: name,
        value: value
      }
      this.props.socket.emit('audio-handler', data_to_send)
  }
  }

  handleType(event: any) {
    this.setState({ soundList: JSON.parse(event.target.value) } as any);
  }

  audioHandler(config: number) {
    if (this.state.play && this.state.stereoNode) {
      let value = 0
      if (config > 1 || config < -1) {
        value = config / 10
        if (value > 0.7) { value = 1 }
        else if (value < -1) { value = -1 }
      }
      else { value = config }
      if (this.state.stereoNode) {
        this.state.stereoNode.pan.value = value.toFixed(1);
        return this.state.stereoNode.pan.value.toFixed(1);
      }
    }
  }

  connectStereo(audio: any) {
    const AudioContext: any = window.AudioContext;
    const audio_context: AudioContext = new AudioContext();
    if (audio) {
      const track = audio_context.createMediaElementSource(audio);
      const StereoNode = new StereoPannerNode(audio_context, { pan: 0 });
      this.setState({
        stereoNode: StereoNode,
      });
      track.connect(StereoNode).connect(audio_context.destination);
    }
  }

  deleteAudio() {
    const audio = document.querySelector("audio");
    audio?.remove();
  }

  createAudio(sound: any) {
    const controls = document.querySelector(".controls");
    const defaultSound = sound;
    const audioHandler = document.querySelector(".audioHandler");
    const audio = document.createElement("audio");
    const source = document.createElement("source");
    if (!this.props.ControlsVisibility) {
      controls?.classList.add("hidden");
    } else {
      controls?.classList.remove("hidden");
    }
    audio.classList.add('hidden')
    source.src = defaultSound.toString();
    source.type = "audio/mpeg";
    audio.controls = false;
    audio.loop = true;
    audio.autoplay = this.state.play;
    audio.volume = this.state.volume;
    audio.playbackRate = this.state.playbackRate
    this.connectStereo(audio)
    audio.append(source);
    audioHandler?.append(audio);
    this.setState({ audioNode: audio })
    
  }

  setVolume(value: number) {
    const audio = document.querySelector('audio');
    if (audio) {
      this.setState({ volume: value / 100 }, () => audio.volume = this.state.volume)
      
      //**SOCKET
      //TODO SOUND-HANDLER
    }
  }

  // setPlayback() {
  //   const audio = document.querySelector('audio');
  //   const velocity = this.props.velocity / 10
  //   // console.log(velocity)
  //   if (audio) {
  //     if(velocity > 2){
  //       audio.playbackRate = 2
  //     } else if(velocity < 0.5){
  //       audio.playbackRate = 0.5
  //     } else{
  //       audio.playbackRate = velocity
  //     }
  //   }
  // }

  play(playStatus: boolean) {
    const audio = document.querySelector("audio");
    if (this.state.stereoNode && audio) {
      if (playStatus) {
        audio.play()
        this.setState({ play: true })
      }
      else {
        audio.pause()
        this.setState({ play: false })
      }
    }
  }

  componentDidMount() {
    this.createAudio(allSounds[0].value);
    this.props.socket.on("audio-handler", (data:any) => this.play(this.props.play));
  }

  render() {
    return (
      <div className="relative top-0 left-0 z-50 grid items-center grid-cols-12 gap-4 lg:bg-gray-900 controls">
        <select
          className="col-span-6 p-3 text-black rounded outline-none lg:col-span-2"
          name="sound"
          onChange={this.handleType}
        >
          {soundTypes.map((item: any, index: any) => (
            <option
              className="p-3 text-gray-900"
              key={index + "sound"}
              value={JSON.stringify(item.value)}
            >
              {item.name}
            </option>
          ))}
        </select>
        <div className="col-span-6 lg:col-span-2">

          {/* {this.audioHandler(this.props.soundBalance)}
          <br />
          {this.props.play ? 'true' : 'false'}
          <br />
          {'volume' + this.state.volume} */}

          <SelectCustom
            options={this.state.soundList}
            handleChange={(event: any) => this.handleAudio(event)}
          />
        </div>

        <div className="col-span-6 lg:col-span-2">
          <label>Volume <br />
            <input type="range"
              min={0} max={100}
              value={this.state.volume * 100}
              name="volume"
              onChange={event => this.setVolume(+event.target.value)} />
          </label>
        </div>

        <div className="hidden">
          {this.audioHandler(this.props.soundBalance)}
          {this.props.play !== this.state.play ? this.play(this.props.play) : null}
          {/* {this.setPlayback()} */}
        </div>

        <button className="p-1 border" onClick={() => this.setVolume(0)}>mudo</button>

        <div className="col-span-12 mx-10 audioHandler lg:col-span-4"></div>

      </div>
    );
  }
}