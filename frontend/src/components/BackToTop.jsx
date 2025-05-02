import { useEffect, useState } from 'react';
import { ArrowUpIcon } from 'lucide-react';

// BackToTop component displays a button that scrolls the page to the top when clicked.
// The button becomes visible when the user scrolls down a certain distance.
export default function BackToTop() {
    // State to track the visibility of the "Back to Top" button
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Function to toggle the visibility of the button based on scroll position
        const toggleVisible = () => {
            setVisible(window.scrollY > 300); // Show button if scrolled more than 300px
        };

        // Add scroll event listener to monitor user's scroll position
        window.addEventListener('scroll', toggleVisible);

        // Cleanup function to remove the event listener when the component unmounts
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    // Function to smoothly scroll the page to the top
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        // Render the button only if it is set to be visible
        visible && (
            <button
                onClick={scrollToTop} // Attach the scrollToTop function to the button's onClick event
                className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition duration-300"
                aria-label="Back to top" // Accessibility label for screen readers
            >
                <ArrowUpIcon className="w-5 h-5" /> {/* Icon for the button */}
            </button>
        )
    );
}
