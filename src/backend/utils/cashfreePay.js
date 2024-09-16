import { load } from '@cashfreepayments/cashfree-js';

let cashfree;

const initializeSDK = async () => {
  try {
    cashfree = await load({
      mode: 'sandbox', // or 'production' based on your environment
    });
    return cashfree; // Return the initialized cashfree object
  } catch (error) {
    console.error('Error initializing Cashfree SDK:', error);
    throw error;
  }
};

// Export a function to get the initialized cashfree object
export const getCashfreeInstance = async () => {
  if (!cashfree) {
    await initializeSDK();
  }
  return cashfree
};
