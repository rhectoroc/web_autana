import React, { useState, useEffect, useRef } from 'react';

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
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        console.log('reCAPTCHA Initializing with Site Key:', sitekey);

        const renderWidget = () => {
            if (containerRef.current && window.grecaptcha && window.grecaptcha.render) {
                try {
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
                    console.log('reCAPTCHA Rendered successfully. Widget ID:', widgetId);
                } catch (err) {
                    console.error('reCAPTCHA render error:', err);
                    setLoadError(true);
                }
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

            let attempts = 0;
            const checkInterval = setInterval(() => {
                attempts++;
                if (window.grecaptcha && window.grecaptcha.render) {
                    clearInterval(checkInterval);
                    renderWidget();
                } else if (attempts > 150) { // 15 seconds timeout
                    clearInterval(checkInterval);
                    console.warn('reCAPTCHA failed to load. Ad-blocker might be blocking it.');
                    setLoadError(true);
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

    if (loadError) {
        return (
            <div className="text-center my-4 text-xs text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">
                No se pudo cargar la verificación de seguridad reCAPTCHA. 
                <br />
                Por favor, desactiva tu bloqueador de anuncios (AdBlock) e intenta de nuevo.
            </div>
        );
    }

    return (
        <div className="flex justify-center my-4 min-h-[78px]">
            <div ref={containerRef} className="g-recaptcha" />
        </div>
    );
};
