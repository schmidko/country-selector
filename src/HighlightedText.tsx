import React from 'react';

interface HighlightedTextProps {
    text: string;
    highlight: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, highlight }) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
        <span>
            {parts.map((part, index) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <span key={index} className="text-secondary">{part}</span>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </span>
    );
};

export default HighlightedText;