import React from "react";
import Routes from "./routes";
import {AgentProvider} from "./contexts/AgentContext";

function App() {
    return <AgentProvider>
        <Routes/>
    </AgentProvider>
}

export default App;
