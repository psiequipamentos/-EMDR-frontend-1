import React from "react";
import SelectCustom from "../../components/inputs/select-custom";
import EmdrSounds from "./emdrSounds";
import WebsocketServer from "../../ws/server";

interface IEmdrProps{
  ControlsVisibility: boolean
  }

interface IEmdrState {
  canvas: any;
  canvasWidth: number;
  canvasHeight: number;

  position: any;
  sacadicPosition: any;
  direction: any;
  velocity: number;
  stop: boolean;
  playSound: boolean;
  visibility: boolean;
  sacadicSide: string;

  circleSize: number;
  circleColor: string;

  intervalo: number;

  directionStatus: string;
  directionAux: string;

  countMovements: any;
  auxCount: any;

  balanceSound: number;
}

const buttonStyle =
  "z-30 p-10 mx-1 border rounded lg:p-1 hover:bg-white hover:text-black";

let playInterval: any;
let sacadicTimeOut: any;

const MovementNumber = [8, 16, 30, 44, 62, "infinito"];
const SelectNumber = [
  { name: "8", value: 8 },
  { name: "16", value: 16 },
  { name: "30", value: 30 },
  { name: "44", value: 44 },
  { name: "62", value: 62 },
  { name: "infinito", value: "infinito" },
];

const MovementTypes = [
  "horizontal",
  "vertical",
  "diagonal1",
  "diagonal2",
  "sacadico",
];
const SelectMovement = [
  { name: "horizontal", value: "horizontal" },
  { name: "vertical", value: "vertical" },
  { name: "diagonal1", value: "diagonal1" },
  { name: "diagonal2", value: "diagonal2" },
  { name: "sacadico", value: "sacadico" },
];

const centerX = (document.documentElement.clientWidth - 5) / 2 - 45;
const centerY = (document.documentElement.clientHeight - 5) / 2;
const init_ws = new WebsocketServer();
const url = window.location.href;
const user_type = url.split("/").reverse()[0];
init_ws.run(user_type);
const socket = init_ws.socket;


export default class Emdr extends React.Component<IEmdrProps, IEmdrState> {
  constructor(props: IEmdrProps) {
    super(props);
    this.state = {
      canvas: React.createRef(),
      canvasWidth: document.documentElement.clientWidth - 5,
      canvasHeight: document.documentElement.clientHeight - 5,

      position: { x: centerX, y: centerY },
      sacadicPosition: { x: centerX, y: centerY },
      direction: { x: 0, y: 0, dir: "none", lastDir: "none" },
      velocity: 3,
      stop: true,
      playSound: false,
      visibility: true,
      sacadicSide: "left",

      circleSize: 20,
      circleColor: "#32CD32",

      intervalo: 10,


      directionStatus: 'stop',
      directionAux: 'horizontal',

      countMovements: MovementNumber[0],
      auxCount: MovementNumber[0],

      balanceSound: 0,
    };

    this.moveBalls = this.moveBalls.bind(this);
    this.drawBalls = this.drawBalls.bind(this);
    this.setDirection = this.setDirection.bind(this);
    this.changeMovement = this.changeMovement.bind(this)
    this.setAuxDirection = this.setAuxDirection.bind(this);
    this.horizontalMovement = this.horizontalMovement.bind(this);
    this.verticalMovement = this.verticalMovement.bind(this);
    this.diagonalMovement = this.diagonalMovement.bind(this);
    this.sacadicMovement = this.sacadicMovement.bind(this);
    this.sacadicAux = this.sacadicAux.bind(this);
    this.setVelocity = this.setVelocity.bind(this);
    this.chageVelocity = this.chageVelocity.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
    this.top = this.top.bind(this);
    this.bottom = this.bottom.bind(this);
    this.isInCenterX = this.isInCenterX.bind(this);
    this.isInCenterY = this.isInCenterY.bind(this);
    this.isInLeft = this.isInLeft.bind(this);
    this.isInRight = this.isInRight.bind(this);
    this.isOnTop = this.isOnTop.bind(this);
    this.isOnBottom = this.isOnBottom.bind(this);
    this.stop = this.stop.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.isNotMoving = this.isNotMoving.bind(this);
    this.setColor = this.setColor.bind(this);
    this.balanceX = this.balanceX.bind(this);
  }

  componentDidMount() {
    const ctx = this.state.canvas.current.getContext("2d");
    playInterval = setInterval(() => this.moveBalls(ctx), this.state.intervalo);

     //**SOCKET
    socket.on("ball-handler", (data) => this.setState({[data.property]:data.value} as any));
   

  }

  setColor(event: any) {
    this.setState({ circleColor: event.target.value });

     //**SOCKET
      const data_to_send = {
        property: "circleColor",
        value: event.target.value,
      };
      socket.emit("ball-handler", data_to_send);
      
    
  }

  drawBalls(ctx: any, clear: any) {
    if (clear === true) {
      ctx.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
    }
    ctx.beginPath();
    ctx.fillStyle = this.state.circleColor;
    ctx.arc(
      this.state.position.x,
      this.state.position.y,
      this.state.circleSize,
      0,
      Math.PI * 2,
      true
    );
    ctx.arc(
      this.state.position.x + this.state.circleSize * 2 + 50,
      this.state.position.y,
      this.state.circleSize,
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();
    ctx.fill();
  }

  left() {
    return this.state.circleSize;
  }
  right() {
    return this.state.canvasWidth - this.state.circleSize;
  }
  top() {
    return this.state.circleSize;
  }
  bottom() {
    return this.state.canvasHeight - this.state.circleSize;
  }

  isInCenterX() {
    return (
      this.state.position.x > centerX - 10 &&
      this.state.position.x < centerX + 10
    );
  }
  isInCenterY() {
    return (
      this.state.position.y > centerY - 10 &&
      this.state.position.y < centerY + 10
    );
  }
  isInLeft() {
    return this.state.position.x < this.state.circleSize;
  }
  isInRight() {
    return (
      this.state.position.x >
      this.state.canvasWidth - this.state.circleSize * 8 + 50
    );
  }
  isOnTop() {
    return this.state.position.y < this.state.circleSize;
  }
  isOnBottom() {
    return (
      this.state.position.y > this.state.canvasHeight - this.state.circleSize
    );
  }

  show() {
    this.setState({ visibility: true });

    //**SOCKET
    const data_to_send = {
      property:'visibility',
      value:true
    }
    socket.emit('ball-handler', data_to_send)
  }
  hide() {
    this.setState({ visibility: false });

    //**SOCKET
      const data_to_send = {
        property:'visibility',
        value:false
      }
      socket.emit('ball-handler', data_to_send)
  }

  setVelocity(variable: any, velocity: any) {
    if (this.state.direction[variable] > 0) {
      this.setState({ direction: { [variable]: velocity } });

      //**SOCKET
      const data_to_send = {
        property:'direction',
        value: { [variable]: velocity }
      }
      socket.emit('ball-handler', data_to_send)
    } else {
      this.setState({ direction: { [variable]: -velocity } });

      //**SOCKET
      const data_to_send = {
        property:'direction',
        value: { [variable]: -velocity }
      }
      socket.emit('ball-handler', data_to_send)
    }
  }

  chageVelocity(velocity: number) {
    this.setState({ velocity: velocity });

     //**SOCKET
    const data_to_send = {
      property:'velocity',
      value: velocity 
    }
    socket.emit('ball-handler', data_to_send)
    
    if (this.state.direction.x && !this.state.direction.y) {
      this.setVelocity("x", velocity);
    }
    if (this.state.direction.y && !this.state.direction.x) {
      this.setVelocity("y", velocity);
    }

    if (this.state.direction.y && this.state.direction.x) {
      if (this.state.direction.x > 0 && this.state.direction.y > 0) {
        this.setState({
          direction: {
            x: velocity,
            y: velocity,
            lastDir: this.state.direction.lastDir,
          },
        });

         //**SOCKET
        const data_to_send = {
          property:'direction',
          value: this.state.direction
        }
        socket.emit('ball-handler', data_to_send)
      } else if (this.state.direction.x < 0 && this.state.direction.y < 0) {
        this.setState({
          direction: {
            x: -velocity,
            y: -velocity,
            lastDir: this.state.direction.lastDir,
          },
        });

         //**SOCKET
        const data_to_send = {
          property:'direction',
          value: this.state.direction
        }
        socket.emit('ball-handler', data_to_send)
      }
    }
  }

  startMovement(x: number, y: number, dir: string) {
    this.setState({
      direction: {
        x: x,
        y: y,
        dir: dir,
        lastDir: this.state.direction.lastDir,
      },
      stop: false,
    });
    // console.log(this.state.directionStatus, this.state.direction.lastDir)
    if (
      this.state.directionStatus !== this.state.direction.lastDir ||
      !this.state.countMovements
    ) {
      this.setState({ countMovements: this.state.auxCount });
    }
    // else{
    //   this.setState({countMovements: this.state.countMovements - 1})
    // }
  }

  balanceX() {
    if (this.state.directionStatus === "sacadico") {
      if (this.state.sacadicPosition.x > centerX) {
        const balance = this.state.sacadicPosition.x / this.right();
        this.setState({ balanceSound: balance });
      } else {
        const balance = (1 - this.state.sacadicPosition.x / this.right()) * -1;
        this.setState({ balanceSound: balance });
      }
    } else {
      if (this.state.position.x > centerX) {
        const balance = this.state.position.x / this.right() - 0.1;
        this.setState({ balanceSound: balance });
      } else {
        const balance = (1 - this.state.position.x / this.right()) * -1 + 0.1;
        // console.log(this.state.position.x, balance.toFixed(2), centerX)
        this.setState({ balanceSound: balance });
      }
    }
  }

  changeMovement(){
    if(this.state.directionAux !== this.state.directionStatus){
      this.setState({stop: true}, () => setTimeout( ()=> this.play(), 700 ))
      //this.setState({stop: true}, () => this.setDirection(this.state.directionAux))
    }
  }

  horizontalMovement(movementDirection: number) {
    if (this.state.direction.x === 0) {
      this.startMovement(this.state.velocity, 0, "right");
    }
    if (this.isInCenterX()) { 
      if(!this.state.stop) { this.changeMovement() }
      if (this.state.stop) { this.stop(); this.setPlaySound(false) } 
    }

    if (this.isInLeft() && this.state.countMovements !== "infinito") {
      this.setState({ countMovements: this.state.countMovements - 1 });
    }

    if (this.isInLeft() || this.isInRight()) {
      this.state.direction.x = -this.state.direction.x;
    }

    this.state.position.x += this.state.direction.x * movementDirection;

    this.balanceX();
  }

  verticalMovement() {
    if (this.state.direction.y === 0) {
      this.startMovement(0, this.state.velocity, "right");
    }
    if (this.isInCenterY()) { 
      if (this.state.stop) { this.stop() }
      else{ this.changeMovement() } 
    }

    if (this.isOnTop() && this.state.countMovements !== 'infinito') {
      this.setState({ countMovements: this.state.countMovements - 1 })
    }

    if (this.isOnTop() && this.state.countMovements !== "infinito") {
      this.setState({ countMovements: this.state.countMovements - 1 });
    }

    if (this.isOnTop() || this.isOnBottom()) {
      // if (this.isOnTop()) { console.log('topo') }
      this.state.direction.y = -this.state.direction.y;
    }

    this.state.position.y += this.state.direction.y;
  }

  diagonalMovement(diagonalDirection: number) {
    if (this.isNotMoving()) {
      this.startMovement(this.state.velocity, this.state.velocity, "right");
    }

    if (this.isInCenterX() && this.isInCenterY()) { 
      if (this.state.stop) { this.stop(); this.setPlaySound(false) } 
      else{ this.changeMovement() } 
    }

    if (this.isOnTop() && this.state.countMovements !== "infinito") {
      this.setState({ countMovements: this.state.countMovements - 1 });
    }

    if (this.isOnTop() || this.isOnBottom()) {
      // if (this.isOnTop()) { console.log('topo diagonal') }
      this.state.direction.y = -this.state.direction.y;
      this.state.direction.x = -this.state.direction.x;
    }

    this.state.position.x += this.state.direction.x * diagonalDirection;
    this.state.position.y += this.state.direction.y;
    this.balanceX();
  }

  sacadicAux(side: string) {
    if (this.state.stop) {
      this.stop();
      this.setPlaySound(false);
    } else {
      if (side === "left") {
        this.state.position.x =
          this.state.canvasWidth - this.state.circleSize * 8 + 50; // lado direito
        this.setState({ sacadicSide: "right" });
      } else {
        this.state.position.x = this.state.circleSize; //lado esquerdo
        this.setState({ sacadicSide: "left" });
      }
    }
  }

  sacadicMovement() {
    if (this.state.direction.x === 0) {
      this.setState({
        direction: {
          x: this.state.velocity,
          y: 0,
          dir: "right",
          lastDir: this.state.direction.lastDir,
        },
        stop: false,
      });

      if (
        this.state.directionStatus !== this.state.direction.lastDir ||
        !this.state.countMovements
      ) {
        this.setState({ countMovements: this.state.auxCount });
      }
    }

    if(this.state.sacadicPosition.x > centerX - 10 && this.state.sacadicPosition.x < centerX + 10){
      if(!this.state.stop){ this.changeMovement() } 
    }

    if (
      this.state.sacadicPosition.x < this.state.circleSize &&
      this.state.countMovements !== "infinito"
    ) {
      this.setState({ countMovements: this.state.countMovements - 1 });
    }

    if (
      this.state.sacadicPosition.x < this.state.circleSize ||
      this.state.sacadicPosition.x >
        this.state.canvasWidth - this.state.circleSize * 8 + 50
    ) {
      this.state.direction.x = -this.state.direction.x;
      // console.log('tocou a borda')
      this.sacadicAux(this.state.sacadicSide);
    }

    this.state.sacadicPosition.x += this.state.direction.x;
    this.balanceX();
  }

  play() {
    if(this.isNotMoving()){
      this.setState({stop: false}, ()=> this.state.direction.x = 0)
      this.setDirection(this.state.directionAux)
    }
    // if (this.state.direction.dir === 'none') {
    //   this.setDirection(MovementTypes[0])
    // } else {
    //   this.setDirection(this.state.direction.lastDir)
    // }
  }

  pause() {
    this.setState({ stop: true });

     //**SOCKET
    const data_to_send = {
      property:'stop',
      value:true
    }
    socket.emit('ball-handler', data_to_send)
  }

  stop() {
    if (this.state.directionStatus === "sacadico") {
      this.setState({ sacadicPosition: { x: centerX, y: centerY } });
    }
    this.setState(
      {
        direction: { x: 0, y: 0, lastDir: this.state.directionStatus },
        directionStatus: "stop",
      },
      () => this.setPlaySound(false)
    );
    this.setState({ position: { x: centerX, y: centerY } });
  }

  isNotMoving() {
    return this.state.direction.x === 0 && this.state.direction.y === 0;
  }

  setDirection(direction: string) {
    if (this.isInCenterX() && this.isInCenterY() && this.isNotMoving()) {
      this.setState({ directionStatus: direction });

       //**SOCKET
      const data_to_send = {
        property:'directionStatus',
        value:direction
      }
      socket.emit('ball-handler', data_to_send)
    }
  }

  setAuxDirection(direction: string) {
    this.setState({ directionAux: direction })
  }

  verifyCount() {
    if (this.state.countMovements !== "infinito") {
      if (!this.state.countMovements) {
        this.setState({ stop: true });
      }
    }
  }

  setCounter(value: any) {
    this.setState({ countMovements: value, auxCount: value });

     //**SOCKET
    const data_to_send = {
      property:'countMovements',
      value:value
    }
    socket.emit('ball-handler', data_to_send)
    const data_to_send2 = {
      property:'auxCount',
      value:value
    }
    socket.emit('ball-handler', data_to_send2)
    
  }

  setPlaySound(value: boolean) {
    if(this.state.playSound !== value){
      this.setState({ playSound: value });
      
    const data_to_send={
      property:'playSound',
      value:this.state.playSound
    }
    socket.emit('audio-handler', data_to_send)
    }
    
  }

  moveBalls(ctx: any) {
    if (this.state.visibility) {
      this.drawBalls(ctx, true);
    } else {
      ctx.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
    }
    if (!this.state.countMovements) {
      this.setState({ stop: true });
    }
    if (this.state.directionStatus === "horizontal") {
      this.setPlaySound(true);
      this.horizontalMovement(1);
    }
    if (this.state.directionStatus === "diagonal2") {
      this.setPlaySound(true);
      this.diagonalMovement(-1);
    }
    if (this.state.directionStatus === "diagonal1") {
      this.setPlaySound(true);
      this.diagonalMovement(1);
    }
    if (this.state.directionStatus === "vertical") {
      this.setPlaySound(true);
      this.verticalMovement();
    }
    if (this.state.directionStatus === "sacadico") {
      this.setPlaySound(true);
      this.sacadicMovement();
    }
  }

  render() {
    return (
      <div className="grid items-center text-white">
        <div>
          <EmdrSounds velocity={this.state.velocity} play={this.state.playSound} soundBalance={this.state.balanceSound} ControlsVisibility={this.props.ControlsVisibility} socket = {socket} ></EmdrSounds>
          { this.props.ControlsVisibility?
          
          <div className="absolute bottom-0 left-0 z-30 grid items-center grid-cols-12 gap-4 ">

            <label className="col-span-6 lg:col-span-2"> Velocidade
              <input className="z-30 p-5 bg-red-500" type="range" name="velocity" min={1} value={this.state.velocity} max={20} onChange={(event) => this.chageVelocity(+event.target.value)} />
            </label>

            <div className="z-30 grid grid-cols-1 col-span-6 text-center lg:col-span-1 lg:grid-cols-1">
              <span>Contagem <br /> {this.state.countMovements !== 'infinito'? this.state.auxCount - this.state.countMovements : 'infinito'}</span>
            </div>
            <div className="z-30 grid grid-cols-1 col-span-6 text-center lg:col-span-1 lg:grid-cols-1">
            <label> Movimentos <br />
              <SelectCustom options={SelectNumber} handleChange={(event: any) => this.setCounter(event.target.value)} />
              </label>
            </div>

            <div className="z-30 grid grid-cols-1 col-span-6 text-center lg:col-span-1 lg:grid-cols-1">
              <label> Tipos <br />
                <SelectCustom options={SelectMovement} handleChange={(event: any) => this.setAuxDirection(event.target.value)} />
              </label>
            </div>

            <div className="z-30 grid grid-cols-1 col-span-6 ml-10 text-center lg:col-span-1 lg:grid-cols-1">
              <button className={buttonStyle + ' mb-1'} onClick={this.hide}> Hide </button>
              <button className={buttonStyle} onClick={this.show}> Show </button>
            </div>

            <div className="z-30 grid grid-cols-1 col-span-6 mr-10 text-center lg:col-span-1 lg:grid-cols-1">
              <button className={buttonStyle + ' mb-1'} onClick={this.play}> Play </button>
              <button className={buttonStyle} onClick={this.pause}> Stop </button>
            </div>

              <div className="grid grid-cols-1 col-span-6 lg:col-span-1">
                <input
                  className="z-30"
                  type="color"
                  name="circleColor"
                  onChange={(event) => this.setColor(event)}
                />
              </div>
            </div>
          : null}
          <canvas
            ref={this.state.canvas}
            className={`mx-auto border-2 absolute top-0 z-20 bg-gray-900`}
            width={this.state.canvasWidth}
            height={this.state.canvasHeight}
          ></canvas>
        </div>
      </div>
    );
  }
}
