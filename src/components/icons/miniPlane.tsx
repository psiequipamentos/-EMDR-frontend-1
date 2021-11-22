import React from "react";



export default class MiniPlane extends React.Component<any, any>{


    render() {

        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        )
    }
}