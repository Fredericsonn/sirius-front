// src/pages/ConsumptionLifestyleFeedback.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import { spring } from '../util'; // <-- Verify this path is correct for your project structure

// Helper function to format item data
const formatItem = (item) => {
    // Ensure a unique key. Prioritize item.id, then machine.id, fallback to generating one (not ideal for stability)
    const id = item.id || item.machine?.id || `${Date.now()}-${Math.random()}`;
    const name = item.name || item.machine?.name || 'Unnamed Item';
    // Provide a fallback image path if item.machine.img is missing
    const img = item.machine?.img || '/placeholder-image.png';

    return {
        id,
        nom: name,
        img: img,
        // Keep original data if needed for submission later
        originalData: item,
    };
};


const ConsumptionLifestyleFeedback = () => {
    const { consumptionId } = useParams(); // Get consumptionId from URL parameter
    const navigate = useNavigate(); // Hook for navigation (e.g., after submission)
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    // State for the feedback inputs for the selected item
    const [minTime, setMinTime] = useState('');
    const [maxTime, setMaxTime] = useState('');
    const [isMinTimeObligated, setIsMinTimeObligated] = useState(true);
    const [isMaxTimeObligated, setIsMaxTimeObligated] = useState(true);

    // Fetch consumption items when the component mounts or consumptionId changes
    useEffect(() => {
        if (!consumptionId) {
            setError('Consumption ID is missing in the URL.');
            setLoading(false);
            return;
        }

        const getItems = async () => {
            setLoading(true);
            setError(null);
            setSelectedItem(null); // Reset selection on new ID/load
            // Reset form state as well
            setMinTime('');
            setMaxTime('');
            setIsMinTimeObligated(true);
            setIsMaxTimeObligated(true);

            try {
                // Fetch items for the specific consumption
                const response = await spring.get(`/consumptions/${consumptionId}/items`);
                // Assuming response.data is the array of items from the backend
                const formattedItems = response.data.map(formatItem);
                setItems(formattedItems);
            } catch (err) {
                console.error("Error fetching consumption items:", err);
                setError('Failed to load consumption items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        getItems();
    }, [consumptionId]); // Re-run effect if consumptionId changes

    // Handler when an item image is clicked
    const handleItemSelect = (item) => {
        setSelectedItem(item);
        // Reset feedback form state when a new item is selected
        setMinTime('');
        setMaxTime('');
        setIsMinTimeObligated(true);
        setIsMaxTimeObligated(true);
    };

    // Handler for "Not Obligated" button for minimum time
    const handleNotObligatedMin = () => {
        setMinTime('0'); // Set value to 0
        setIsMinTimeObligated(false); // Set flag to false, disabling input
    };

    // Handler for "Not Obligated" button for maximum time
    const handleNotObligatedMax = () => {
        setMaxTime('0'); // Set value to 0
        setIsMaxTimeObligated(false); // Set flag to false, disabling input
    };

    // Determine if the "Next" button should be enabled
    const isNextEnabled = selectedItem &&
                         (minTime !== '' || !isMinTimeObligated) && // Min has value OR is not obligated
                         (maxTime !== '' || !isMaxTimeObligated) && // Max has value OR is not obligated
                         // Ensure max time >= min time only if both are obligated and numbers
                         (!isMinTimeObligated || !isMaxTimeObligated || Number(maxTime) >= Number(minTime));


    // --- ACTION: Implement your API call here ---
    // Function to handle the submission of feedback
    const handleNext = async () => {
        if (!isNextEnabled) return;

        // Prepare data for submission
        const feedbackData = {
            itemId: selectedItem.id, // Ensure selectedItem.id is the unique identifier backend expects
            // Parse times to numbers, defaulting to 0 if empty or not obligated
            minUsageHours: isMinTimeObligated ? (parseFloat(minTime) || 0) : 0,
            maxUsageHours: isMaxTimeObligated ? (parseFloat(maxTime) || 0) : 0,
            isMinObligated: isMinTimeObligated,
            isMaxObligated: isMaxTimeObligated,
            // You might want to send the original item data or parts of it too
            // originalItem: selectedItem.originalData
        };

        console.log("Submitting feedback:", feedbackData);

        try {
            setLoading(true); // Optional: show loading state during submission
            // *** Replace with your actual API endpoint and method (e.g., POST) ***
            const response = await spring.post(`/consumptions/${consumptionId}/feedback`, feedbackData);
            // *** Check backend response structure ***
            console.log("Feedback submission successful:", response.data);

            // --- TODO: Decide post-submission behavior ---
            alert(`Feedback for ${selectedItem.nom} submitted successfully!`);

            // Example: Navigate back to the main consumption page
            // navigate(`/tracer/consumptions/${consumptionId}`);

            // Example: Clear selection to allow feedback for another item
            // setSelectedItem(null);
            // setMinTime('');
            // setMaxTime('');
            // setIsMinTimeObligated(true);
            // setIsMaxTimeObligated(true);

        } catch (err) {
            console.error("Error submitting feedback:", err);
            setError("Failed to submit feedback. Please check your connection or try again.");
            // Keep form state so user doesn't lose input on error
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    // ---- Render Logic ----

    if (loading && items.length === 0) { // Show loading only on initial load
        return <div className="p-6 text-center">Loading consumption items...</div>;
    }

    // Display general error if loading failed
    if (error && items.length === 0) {
        return <div className="p-6 text-center text-red-600">Error: {error}</div>;
    }

    return (
        <main className="flex flex-col md:flex-row min-h-screen p-4 md:p-6 gap-4 md:gap-6 bg-base-100 text-base-content"> {/* Adjust bg/text colors */}

            {/* Left Section: Item Selection */}
            <section className="w-full md:w-1/3 lg:w-1/4 flex flex-col border-r border-base-300 md:pr-4">
                <h1 className="text-lg md:text-xl font-semibold mb-2">
                    Your Consumption Lifestyle
                </h1>
                <p className="text-sm md:text-md mb-4 text-gray-600">Select an item to provide usage details:</p>
                {/* Display fetch error specific to loading if it occurred after initial render */}
                 {error && items.length > 0 && (
                      <div className="p-2 mb-2 text-sm text-red-600 bg-red-100 border border-red-300 rounded">Error: {error}</div>
                 )}
                <div className="flex flex-wrap gap-3 overflow-y-auto flex-grow pr-1"> {/* Added flex-grow and pr */}
                    {items.length === 0 && !loading && (
                        <p className="text-gray-500 italic">No items found for this consumption record.</p>
                    )}
                    {items.map((item) => (
                        <div
                            key={item.id} // Crucial for React list updates
                            onClick={() => handleItemSelect(item)}
                            className={`p-1 border-2 rounded-md cursor-pointer hover:border-primary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-all duration-150 ease-in-out ${
                                selectedItem?.id === item.id ? 'border-primary scale-105 shadow-md' : 'border-base-300'
                            }`}
                            title={`Select ${item.nom}`} // Tooltip for accessibility
                            tabIndex={0} // Make it focusable
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleItemSelect(item)} // Keyboard accessibility
                        >
                            <img
                                src={item.img}
                                alt={item.nom}
                                className="w-20 h-20 md:w-24 md:h-24 object-contain bg-gray-100 rounded"
                                // Add error handling for images
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop if placeholder also fails
                                    e.target.src = '/placeholder-image.png'; // Fallback image
                                }}
                                loading="lazy" // Lazy load images
                            />
                             {/* Optional: Show name below image for clarity */}
                             <p className="text-xs text-center mt-1 truncate w-20 md:w-24">{item.nom}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Right Section: Feedback Form (shown when an item is selected) */}
            <section className="w-full md:w-2/3 lg:w-3/4 flex flex-col relative">
                {selectedItem ? (
                    <div className="flex flex-col items-center flex-grow p-4 rounded-lg bg-base-200 shadow"> {/* Added bg and padding */}
                        {/* Selected Item Display */}
                        <img
                            src={selectedItem.img}
                            alt={selectedItem.nom}
                            className="w-36 h-36 md:w-48 md:h-48 object-contain mb-4 bg-gray-100 rounded-lg border border-base-300"
                             onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.png';
                             }}
                        />
                        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">{selectedItem.nom}</h2>

                        {/* Minimum Time Question */}
                        <div className="mb-6 w-full max-w-md px-2">
                            <label htmlFor="minTime" className="block text-sm font-medium text-gray-700 mb-1">
                                Minimum *required* usage per day (hours)?
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    id="minTime"
                                    value={minTime}
                                    onChange={(e) => {
                                        setMinTime(e.target.value);
                                        // Re-enable if user types after clicking not obligated
                                        if (!isMinTimeObligated) setIsMinTimeObligated(true);
                                    }}
                                    disabled={!isMinTimeObligated || loading} // Disable during submission too
                                    className="input input-bordered w-full flex-grow disabled:bg-base-300 disabled:cursor-not-allowed" // Use daisyUI classes if applicable
                                    min="0"
                                    step="0.1" // Allow decimal hours like 0.5
                                    placeholder="e.g., 0.5 (for 30 mins)"
                                />
                                <button
                                    onClick={handleNotObligatedMin}
                                    disabled={loading} // Disable during submission
                                    className={`btn btn-sm whitespace-nowrap ${
                                        isMinTimeObligated
                                        ? 'btn-outline btn-secondary' // Style for active state
                                        : 'btn-primary' // Style for inactive/"Not Obligated" selected state
                                    }`}
                                >
                                    Not Required
                                </button>
                            </div>
                        </div>

                        {/* Maximum Time Question */}
                        <div className="mb-8 w-full max-w-md px-2">
                            <label htmlFor="maxTime" className="block text-sm font-medium text-gray-700 mb-1">
                                Maximum *possible* usage per day (hours)?
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    id="maxTime"
                                    value={maxTime}
                                    onChange={(e) => {
                                        setMaxTime(e.target.value);
                                         // Re-enable if user types after clicking not obligated
                                        if (!isMaxTimeObligated) setIsMaxTimeObligated(true);
                                    }}
                                    disabled={!isMaxTimeObligated || loading} // Disable during submission
                                    className="input input-bordered w-full flex-grow disabled:bg-base-300 disabled:cursor-not-allowed" // Use daisyUI classes if applicable
                                    // Max must be >= Min if Min is obligated and a valid number
                                    min={isMinTimeObligated && minTime !== '' && parseFloat(minTime) >= 0 ? minTime : "0"}
                                    step="0.1"
                                    placeholder="e.g., 2"
                                />
                                <button
                                    onClick={handleNotObligatedMax}
                                     disabled={loading} // Disable during submission
                                    className={`btn btn-sm whitespace-nowrap ${
                                        isMaxTimeObligated
                                        ? 'btn-outline btn-secondary' // Style for active state
                                        : 'btn-primary' // Style for inactive/"Not Obligated" selected state
                                    }`}
                                >
                                    No Max / Not Used
                                </button>
                            </div>
                             {/* Validation message if max < min (only if both are obligated numbers) */}
                            {isMinTimeObligated && isMaxTimeObligated && maxTime !== '' && minTime !== '' && Number(maxTime) < Number(minTime) && (
                                <p className="text-red-500 text-xs mt-1">Maximum time cannot be less than minimum time.</p>
                            )}
                        </div>

                        {/* Submit Button Area */}
                        <div className="mt-auto w-full flex justify-end max-w-md pt-4 px-2"> {/* Use mt-auto to push to bottom */}
                            <button
                                onClick={handleNext}
                                disabled={!isNextEnabled || loading} // Disable if not valid OR if loading (submitting)
                                className="btn btn-success font-semibold px-8" // Use daisyUI success button class
                            >
                                {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Submit Feedback'}
                            </button>
                        </div>
                    </div>
                ) : (
                    // Placeholder when no item is selected
                    <div className="flex justify-center items-center h-full text-gray-500 flex-grow bg-base-200 rounded-lg shadow p-4">
                        <p className="text-center">Select an item from the left panel <br/> to provide its typical daily usage details.</p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default ConsumptionLifestyleFeedback;