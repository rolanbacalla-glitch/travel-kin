'use client';

import { useState, useEffect } from 'react';
import { sections } from '@/lib/data'; // fallback/initial data
import { Experience } from '@/lib/types';
import { experiences as initialExperiences } from '@/lib/data/experiences';

export function useExperiences() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('experiences');
        if (saved) {
            try {
                setExperiences(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse experiences', e);
                setExperiences(initialExperiences);
            }
        } else {
            setExperiences(initialExperiences);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever experiences change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('experiences', JSON.stringify(experiences));
        }
    }, [experiences, isLoaded]);

    const addExperience = (experience: Experience) => {
        setExperiences((prev: Experience[]) => [experience, ...prev]);
    };

    const updateExperience = (id: string, updates: Partial<Experience>) => {
        setExperiences((prev: Experience[]) =>
            prev.map((exp: Experience) => (exp.id === id ? { ...exp, ...updates } : exp))
        );
    };

    const deleteExperience = (id: string) => {
        setExperiences((prev: Experience[]) => prev.filter((exp: Experience) => exp.id !== id));
    };

    const getExperience = (id: string) => {
        return experiences.find((exp: Experience) => exp.id === id);
    };

    return {
        experiences,
        isLoaded,
        addExperience,
        updateExperience,
        deleteExperience,
        getExperience,
    };
}
