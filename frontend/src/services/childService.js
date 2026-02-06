import axios from 'axios';

const API_URL = '/api/children/';

// Create new child
const createChild = async (childData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, childData, config);
  return response.data;
};

// Get user children
const getChildren = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update child
const updateChild = async (childId, childData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + childId, childData, config);
  return response.data;
};

// Delete child
const deleteChild = async (childId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + childId, config);
  return response.data;
};

const childService = {
  createChild,
  getChildren,
  updateChild,
  deleteChild,
};

export default childService;
