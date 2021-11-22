import React from "react";

interface IPlaneProps {
    plane_style: string;
}

export default class Plane extends React.Component<any, any>{

    constructor(props: IPlaneProps) {
        super(props);
        console.log('paper plane');
    }

    render() {

        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={this.props.plane_style} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        )
    }
}