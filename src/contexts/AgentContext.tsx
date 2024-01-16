/**
 * @file AgentContext.tsx
 * @author Higor Grigorio <higorgrigorio@gmail.com>
 * @date 2023-12-18
 *
 * @changelog
 *  - 2023-12-18 - Higor Grigorio
 *    - Create AgentContext.tsx.
 */
import React from "react";


type AgentContextProps = {
    agent: 'mobile' | 'desktop' | null;
    setAgent: (agent: 'mobile' | 'desktop' | null) => void;
    isLoaded: boolean;
};

export const AgentContext = React.createContext<AgentContextProps>({} as AgentContextProps);

export const AgentProvider: React.FC = ({children}) => {
    const [agent, setAgent] = React.useState<AgentContextProps['agent']>(null);

    React.useEffect(() => {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent) ||
            window.innerWidth < 768
        ) {
            setAgent("mobile");
        } else {
            setAgent("desktop");
        }
    })

    return (
        <AgentContext.Provider value={{agent, setAgent, isLoaded: !!agent}}>
            {children}
        </AgentContext.Provider>
    );
};
