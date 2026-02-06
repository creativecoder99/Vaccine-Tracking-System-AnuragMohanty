import axios from 'axios';

const API_URL = '/api/vaccines/';
const CHILD_API_URL = '/api/children/';

// Get child details with schedule
const getChildDetails = async (childId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(CHILD_API_URL + childId, config);
  return response.data;
};

// Update vaccine status
const updateVaccineStatus = async (vaccineId, status, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + vaccineId, { status }, config);
  return response.data;
};

const vaccineService = {
  getChildDetails,
  updateVaccineStatus,
};

export default vaccineService;
