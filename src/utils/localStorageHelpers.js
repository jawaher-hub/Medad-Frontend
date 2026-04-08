// Keys for localStorage
const STORAGE_KEYS = {
  REQUESTED_DONATIONS: 'requestedDonations',
  ASSIGNED_REP: 'assignedRep_',
  DELIVERY_CONFIRMATION: 'delivery_',
  RATING_FEEDBACK: 'rating_',
  CHARITY_PROFILE: 'charityProfile',
  FILTER_PREFERENCES: 'charityFilters'
};

// ============ REQUESTED DONATIONS ============

// Get all requested donation IDs
export const getRequestedDonations = () => {
  const data = localStorage.getItem(STORAGE_KEYS.REQUESTED_DONATIONS);
  return data ? JSON.parse(data) : [];
};

// Add a donation request
export const addRequestedDonation = (donationId) => {
  const requests = getRequestedDonations();
  if (!requests.includes(donationId)) {
    requests.push(donationId);
    localStorage.setItem(STORAGE_KEYS.REQUESTED_DONATIONS, JSON.stringify(requests));
  }
  return requests;
};

// Check if a donation was requested
export const isDonationRequested = (donationId) => {
  const requests = getRequestedDonations();
  return requests.includes(donationId);
};

// Remove a donation request (if needed)
export const removeRequestedDonation = (donationId) => {
  let requests = getRequestedDonations();
  requests = requests.filter(id => id !== donationId);
  localStorage.setItem(STORAGE_KEYS.REQUESTED_DONATIONS, JSON.stringify(requests));
  return requests;
};

// ============ ASSIGN REPRESENTATIVE ============

// Save assigned representative for a specific request
export const saveAssignedRepresentative = (requestId, representativeData) => {
  const key = STORAGE_KEYS.ASSIGNED_REP + requestId;
  const dataToSave = {
    ...representativeData,
    savedAt: new Date().toISOString()
  };
  localStorage.setItem(key, JSON.stringify(dataToSave));
};

// Get assigned representative for a specific request
export const getAssignedRepresentative = (requestId) => {
  const key = STORAGE_KEYS.ASSIGNED_REP + requestId;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Check if representative is assigned for a request
export const hasAssignedRepresentative = (requestId) => {
  const key = STORAGE_KEYS.ASSIGNED_REP + requestId;
  return localStorage.getItem(key) !== null;
};

// Delete assigned representative (if request is cancelled)
export const deleteAssignedRepresentative = (requestId) => {
  const key = STORAGE_KEYS.ASSIGNED_REP + requestId;
  localStorage.removeItem(key);
};

// ============ DELIVERY CONFIRMATION ============

// Save delivery confirmation for a specific request
export const saveDeliveryConfirmation = (requestId, deliveryData) => {
  const key = STORAGE_KEYS.DELIVERY_CONFIRMATION + requestId;
  const dataToSave = {
    ...deliveryData,
    confirmedAt: new Date().toISOString()
  };
  localStorage.setItem(key, JSON.stringify(dataToSave));
};

// Get delivery confirmation for a specific request
export const getDeliveryConfirmation = (requestId) => {
  const key = STORAGE_KEYS.DELIVERY_CONFIRMATION + requestId;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Check if delivery is confirmed for a request
export const isDeliveryConfirmed = (requestId) => {
  const key = STORAGE_KEYS.DELIVERY_CONFIRMATION + requestId;
  return localStorage.getItem(key) !== null;
};

// ============ RATING AND FEEDBACK ============

// Save rating for a delivery
export const saveRating = (deliveryId, ratingData) => {
  const key = STORAGE_KEYS.RATING_FEEDBACK + deliveryId;
  const dataToSave = {
    ...ratingData,
    submittedAt: new Date().toISOString()
  };
  localStorage.setItem(key, JSON.stringify(dataToSave));
};

// Get rating for a delivery
export const getRating = (deliveryId) => {
  const key = STORAGE_KEYS.RATING_FEEDBACK + deliveryId;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Check if rating is already submitted for a delivery
export const hasSubmittedRating = (deliveryId) => {
  const key = STORAGE_KEYS.RATING_FEEDBACK + deliveryId;
  return localStorage.getItem(key) !== null;
};

// ============ CHARITY PROFILE ============

// Save charity profile data
export const saveCharityProfile = (profileData) => {
  localStorage.setItem(STORAGE_KEYS.CHARITY_PROFILE, JSON.stringify(profileData));
};

// Get charity profile data
export const getCharityProfile = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CHARITY_PROFILE);
  return data ? JSON.parse(data) : null;
};

// ============ FILTER PREFERENCES ============

// Save user's filter preferences (for Browse Feed)
export const saveFilterPreferences = (filters) => {
  localStorage.setItem(STORAGE_KEYS.FILTER_PREFERENCES, JSON.stringify(filters));
};

// Get user's filter preferences
export const getFilterPreferences = () => {
  const data = localStorage.getItem(STORAGE_KEYS.FILTER_PREFERENCES);
  return data ? JSON.parse(data) : {
    searchTerm: '',
    selectedCategory: 'All',
    sortBy: 'newest'
  };
};

// ============ UTILITY FUNCTIONS ============

// Clear all charity-related data (logout)
export const clearAllCharityData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    // Only remove items that start with our keys
    for (let i = 0; i < localStorage.length; i++) {
      const storageKey = localStorage.key(i);
      if (storageKey && (storageKey === key || storageKey.startsWith(key))) {
        localStorage.removeItem(storageKey);
      }
    }
  });
};

// Get all completed requests (with all data)
export const getAllCompletedRequests = () => {
  const completedRequests = [];
  
  // Loop through all localStorage items
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    
    // Check for delivery confirmations
    if (key && key.startsWith(STORAGE_KEYS.DELIVERY_CONFIRMATION)) {
      const requestId = key.replace(STORAGE_KEYS.DELIVERY_CONFIRMATION, '');
      const delivery = getDeliveryConfirmation(requestId);
      const representative = getAssignedRepresentative(requestId);
      const rating = getRating(requestId);
      
      completedRequests.push({
        requestId,
        delivery,
        representative,
        rating,
        completedAt: delivery?.confirmedAt
      });
    }
  }
  
  return completedRequests.sort((a, b) => 
    new Date(b.completedAt) - new Date(a.completedAt)
  );
};

// Get statistics from localStorage data
export const getStats = () => {
  const requestedDonations = getRequestedDonations();
  let confirmedDeliveries = 0;
  let submittedRatings = 0;
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(STORAGE_KEYS.DELIVERY_CONFIRMATION)) {
      confirmedDeliveries++;
    }
    if (key && key.startsWith(STORAGE_KEYS.RATING_FEEDBACK)) {
      submittedRatings++;
    }
  }
  
  return {
    totalRequests: requestedDonations.length,
    confirmedDeliveries,
    submittedRatings,
    completionRate: requestedDonations.length > 0 
      ? Math.round((confirmedDeliveries / requestedDonations.length) * 100) 
      : 0
  };
};

// Export all keys for debugging
export { STORAGE_KEYS };