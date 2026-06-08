import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface LazyViewportSectionProps {
    children: ReactNode;
    fallback?: ReactNode;
    minHeight?: string; // Standard min-height to prevent Layout Shift (CLS)
}

export const LazyViewportSection: React.FC<LazyViewportSectionProps> = ({ 
    children, 
    fallback = null, 
    minHeight = '300px' 
}) => {
    const [isIntersected, setIsIntersected] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            setIsIntersected(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersected(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '0px 0px -50px 0px', // Contract the bottom boundary to prevent trigger on page load
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={ref} style={{ minHeight: isIntersected ? 'auto' : minHeight }} className="w-full">
            {isIntersected ? children : fallback}
        </div>
    );
};
