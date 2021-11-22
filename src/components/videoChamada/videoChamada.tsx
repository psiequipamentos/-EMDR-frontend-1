import React from 'react'

interface ChamadaState{ }

interface ChamadaProps{ }

export default class videoChamada extends React.Component<ChamadaProps, ChamadaState>{
  constructor(props:ChamadaProps){
    super(props)
  }

  render(){
    return(
      <div>
        <div id="videoContainer"> Ai chavi </div>
      </div>
    )
  }
}