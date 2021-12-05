import React from 'react'

interface ISelectProps{
  options: any
  handleChange: any
}

export default class SelectCustom extends React.Component<ISelectProps, any>{
  constructor(props: ISelectProps){
    super(props)
  }

  render(){
    return(
      <select className="p-2 text-sm font-semibold text-black rounded outline-none" name="sound" onChange={this.props.handleChange}>
          {this.props.options.map(
            (item: any, index: any) => <option className="p-3 text-gray-900" key={index + 'sound'} value={item.value}>{item.name}</option>
          )}
        </select>
    )
  }
}