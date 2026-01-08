'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/lib/types';
import { getFromStorage, setToStorage } from '@/lib/utils';
import { currentUser as defaultUser } from '@/lib/data';

interface AuthContextType extends AuthState {
    signIn: (email: string) => void;
    signUp: (email: string, name: string) => void;
    signOut: () => void;
    updateProfile: (updates: Partial<User>) => void;
    requestToJoin: (experienceId: string) => void;
    toggleWave: (companionId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'workingname_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
    });
    const [isLoaded, setIsLoaded] = useState(false);

    // Load auth state from localStorage on mount
    useEffect(() => {
        const stored = getFromStorage<AuthState>(AUTH_STORAGE_KEY, {
            isAuthenticated: false,
            user: null,
        });
        setAuthState(stored);
        setIsLoaded(true);
    }, []);

    // Persist auth state changes
    useEffect(() => {
        if (isLoaded) {
            setToStorage(AUTH_STORAGE_KEY, authState);
        }
    }, [authState, isLoaded]);

    const signIn = (email: string) => {
        // For demo, just log in with the default user
        setAuthState({
            isAuthenticated: true,
            user: { ...defaultUser, email },
        });
    };

    const signUp = (email: string, name: string) => {
        setAuthState({
            isAuthenticated: true,
            user: {
                ...defaultUser,
                id: `user-${Date.now()}`,
                email,
                name,
                verificationStatus: 'basic',
                badges: ['Email verified'],
            },
        });
    };

    const signOut = () => {
        setAuthState({
            isAuthenticated: false,
            user: null,
        });
    };

    const updateProfile = (updates: Partial<User>) => {
        if (authState.user) {
            setAuthState({
                ...authState,
                user: { ...authState.user, ...updates },
            });
        }
    };

    const requestToJoin = (experienceId: string) => {
        if (!authState.user) return;
        const currentRequests = authState.user.requests || [];
        // Prevent duplicate requests
        if (currentRequests.some((r: { experienceId: string }) => r.experienceId === experienceId)) return;

        const newRequest = {
            experienceId,
            status: 'pending' as const,
            date: new Date().toISOString()
        };

        setAuthState({
            ...authState,
            user: {
                ...authState.user,
                requests: [...currentRequests, newRequest]
            },
        });
    };

    const toggleWave = (companionId: string) => {
        if (!authState.user) return;
        const currentWaves = authState.user.wavedCompanions || [];

        let updatedWaves: string[];
        if (currentWaves.includes(companionId)) {
            updatedWaves = currentWaves.filter((id: string) => id !== companionId);
        } else {
            updatedWaves = [...currentWaves, companionId];
        }

        setAuthState({
            ...authState,
            user: {
                ...authState.user,
                wavedCompanions: updatedWaves
            },
        });
    };

    // Don't render children until we've loaded from storage
    if (!isLoaded) {
        return null;
    }

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                signIn,
                signUp,
                signOut,
                updateProfile,
                requestToJoin,
                toggleWave,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
