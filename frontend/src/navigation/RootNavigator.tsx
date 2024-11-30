import React from 'react';
import { useAuth } from "../context/AuthContext";
import TabNavigator from "./BottomTabs";
import LoginNavigator from "./LoginNavigator";

// Navigates user to the log in screen if seesion is not found (i.e. user not logged in)
export default function RootNavigator() {
    console.log('RootNavigator rendering');
    
    const { session, isLoading, isInSignupFlow } = useAuth();
    console.log('RootNavigator values:', {
        session: session,
        isLoading: isLoading,
        isInSignupFlow: isInSignupFlow
    });
    
    if (isLoading) {
        return null; // or some loading screen (maybe we make in future?)
    }

    if (isInSignupFlow) {
        return <LoginNavigator />
    }

    return session ? <TabNavigator /> : <LoginNavigator />;
}