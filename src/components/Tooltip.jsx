import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Tooltip — reusable floating tooltip
 *
 * Props:
 *   content   – JSX or string to render inside the tooltip
 *   position  – 'top' | 'bottom' | 'left' | 'right'  (default 'top')
 *   children  – the trigger element
 */
const Tooltip = ({ content, position = 'top', children }) => {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);

    const show = () => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        let top = 0;
        let left = 0;

        switch (position) {
            case 'bottom':
                top = rect.bottom + scrollY + 8;
                left = rect.left + scrollX + rect.width / 2;
                break;
            case 'left':
                top = rect.top + scrollY + rect.height / 2;
                left = rect.left + scrollX - 8;
                break;
            case 'right':
                top = rect.top + scrollY + rect.height / 2;
                left = rect.right + scrollX + 8;
                break;
            default: // top
                top = rect.top + scrollY - 8;
                left = rect.left + scrollX + rect.width / 2;
        }

        setCoords({ top, left });
        setVisible(true);
    };

    const hide = () => setVisible(false);

    // Close on scroll / resize
    useEffect(() => {
        if (!visible) return;
        const close = () => setVisible(false);
        window.addEventListener('scroll', close, true);
        window.addEventListener('resize', close);
        return () => {
            window.removeEventListener('scroll', close, true);
            window.removeEventListener('resize', close);
        };
    }, [visible]);

    const transformMap = {
        top: 'translate(-50%, -100%)',
        bottom: 'translate(-50%, 0)',
        left: 'translate(-100%, -50%)',
        right: 'translate(0, -50%)',
    };

    return (
        <>
            <span
                ref={triggerRef}
                onMouseEnter={show}
                onMouseLeave={hide}
                onFocus={show}
                onBlur={hide}
                className="inline-flex"
            >
                {children}
            </span>

            {visible && createPortal(
                <div
                    style={{
                        position: 'absolute',
                        top: coords.top,
                        left: coords.left,
                        transform: transformMap[position],
                        zIndex: 9999,
                        pointerEvents: 'none',
                    }}
                >
                    <div
                        className="rounded-xl border text-sm shadow-xl px-3 py-2"
                        style={{
                            background: '#1e293b',
                            borderColor: '#334155',
                            color: '#f1f5f9',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {content}
                    </div>
                </div>,
                document.body,
            )}
        </>
    );
};

export default Tooltip;
