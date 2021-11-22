import React from 'react';

interface IIconLocalizar{
    StyleCustom: string
}

export default class IconLocalizar extends React.Component<IIconLocalizar, any>{
    constructor(props:IIconLocalizar){
        super(props)
    }

    render(){
        return(
            <div className={this.props.StyleCustom}>
                <svg  width="50" height="50" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.8889 41L1.00002 81L81 41L1.00002 1L9.8889 41ZM9.8889 41H45.4445" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        )
    }
}
