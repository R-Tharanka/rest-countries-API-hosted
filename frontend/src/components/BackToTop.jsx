import { useEffect, useState } from 'react';
import { ArrowUpIcon } from 'lucide-react';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisible = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        visible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition duration-300"
                aria-label="Back to top"
            >
                <ArrowUpIcon className="w-5 h-5" />
            </button>
        )
    );
}
