import React, { useEffect, useRef } from 'react';

interface ReCAPTCHAProps {
    sitekey: string;
    onChange: (token: string | null) => void;
}

declare global {
    interface Window {
        grecaptcha: any;
    }
}

export const ReCAPTCHA: React.FC<ReCAPTCHAProps> = ({ sitekey, onChange }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<number | null>(null);

    useEffect(() => {
        const renderWidget = () => {
            if (containerRef.current && window.grecaptcha && window.grecaptcha.render) {
                containerRef.current.innerHTML = '';
                const widgetId = window.grecaptcha.render(containerRef.current, {
                    sitekey: sitekey,
                    callback: (token: string) => {
                        onChange(token);
                    },
                    'expired-callback': () => {
                        onChange(null);
                    },
                    'error-callback': () => {
                        onChange(null);
                    }
                });
                widgetIdRef.current = widgetId;
            }
        };

        if (window.grecaptcha && window.grecaptcha.render) {
            renderWidget();
        } else {
            let script = document.getElementById('recaptcha-script') as HTMLScriptElement;
            if (!script) {
                script = document.createElement('script');
                script.id = 'recaptcha-script';
                script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
                script.async = true;
                script.defer = true;
                document.body.appendChild(script);
            }

            const checkInterval = setInterval(() => {
                if (window.grecaptcha && window.grecaptcha.render) {
                    clearInterval(checkInterval);
                    renderWidget();
                }
            }, 100);

            return () => {
                clearInterval(checkInterval);
            };
        }

        return () => {
            if (widgetIdRef.current !== null && window.grecaptcha && window.grecaptcha.reset) {
                try {
                    window.grecaptcha.reset(widgetIdRef.current);
                } catch (e) {
                    console.warn('reCAPTCHA reset failed:', e);
                }
            }
        };
    }, [sitekey, onChange]);

    return (
        <div className="flex justify-center my-4">
            <div ref={containerRef} className="g-recaptcha" />
        </div>
    );
};
