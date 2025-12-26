import { readContract } from 'wagmi/actions'

// Contract ABI for IOU token holder functions
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
    "name": "allIOUs",
    "outputs": [{
      "components": [
        {"name": "holder", "type": "address"},
        {"name": "balance", "type": "uint256"}
      ],
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  }
];

export const getAllIOUs = async (iouAddress) => {
  if (!iouAddress) {
    return [];
  }

  try {
    // Get the length of holders array
    const lengthData = await readContract({
      address: iouAddress,
      abi: IOU_TOKEN_ABI,
      functionName: 'getlen'
    });

    const holdersCount = lengthData[0]; // First element is holders count
    
    if (!holdersCount || holdersCount === 0n) {
      return [];
    }

    const IOUs = [];
    
    // Fetch all IOU holders
    for (let i = 0; i < holdersCount; i++) {
      try {
        const holder = await readContract({
          address: iouAddress,
          abi: IOU_TOKEN_ABI,
          functionName: 'allIOUs',
          args: [i]
        });
        
        if (holder) {
          IOUs.push({
            holder: holder.holder,
            balance: holder.balance
          });
        }
      } catch (error) {
        console.error(`Error fetching IOU holder at index ${i}:`, error);
        // Continue with other holders even if one fails
      }
    }

    console.log('IOUs:', IOUs);
    return IOUs;
  } catch (error) {
    console.error('Error fetching IOUs:', error);
    return [];
  }
};