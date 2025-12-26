import { readContract } from 'wagmi/actions'

// Contract ABI for IOU token feedback functions
const IOU_TOKEN_ABI = [
  {
    "inputs": [],
    "name": "getlen",
    "outputs": [
      {"name": "holdersCount", "type": "uint256"},
      {"name": "feedbacksCount", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "index", "type": "uint256"}],
    "name": "allFeedbacks",
    "outputs": [{
      "components": [
        {"name": "id", "type": "uint256"},
        {"name": "rating", "type": "uint8"},
        {"name": "comment", "type": "string"},
        {"name": "timestamp", "type": "uint256"},
        {"name": "reviewer", "type": "address"}
      ],
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  }
];

export const getFeedbacks = async (iouAddress) => {
  if (!iouAddress) {
    return [];
  }

  try {
    // Get the length of feedbacks array
    const lengthData = await readContract({
      address: iouAddress,
      abi: IOU_TOKEN_ABI,
      functionName: 'getlen'
    });

    const feedbacksCount = lengthData[1]; // Second element is feedbacks count
    
    if (!feedbacksCount || feedbacksCount === 0n) {
      return [];
    }

    const feedbacks = [];
    
    // Fetch all feedbacks
    for (let i = 0; i < feedbacksCount; i++) {
      try {
        const feedback = await readContract({
          address: iouAddress,
          abi: IOU_TOKEN_ABI,
          functionName: 'allFeedbacks',
          args: [i]
        });
        
        if (feedback) {
          feedbacks.push({
            id: feedback.id,
            rating: feedback.rating,
            comment: feedback.comment,
            timestamp: feedback.timestamp,
            reviewer: feedback.reviewer
          });
        }
      } catch (error) {
        console.error(`Error fetching feedback at index ${i}:`, error);
        // Continue with other feedbacks even if one fails
      }
    }

    return feedbacks;
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return [];
  }
};