import React from 'react';


export default function RatingCard({rating}) {
    return (
        <>
            <p className="text-right">{rating}/5</p>
        </>
    );
}