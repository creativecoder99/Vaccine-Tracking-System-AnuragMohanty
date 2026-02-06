const VaccinationSchedule = require('../models/VaccinationSchedule');

const VACCINES = [
  { name: 'BCG', ageDays: 0, description: 'Tuberculosis' },
  { name: 'Hepatitis B (Birth)', ageDays: 0, description: 'Hepatitis B' },
  { name: 'OPV 0', ageDays: 0, description: 'Polio' },
  { name: 'Pentavalent 1', ageDays: 42, description: 'Diphtheria, Pertussis, Tetanus, Hepatitis B, Hib' }, // 6 weeks
  { name: 'OPV 1', ageDays: 42, description: 'Polio' },
  { name: 'Rota 1', ageDays: 42, description: 'Rotavirus' },
  { name: 'Pentavalent 2', ageDays: 70, description: 'Diphtheria, Pertussis, Tetanus, Hepatitis B, Hib' }, // 10 weeks
  { name: 'OPV 2', ageDays: 70, description: 'Polio' },
  { name: 'Rota 2', ageDays: 70, description: 'Rotavirus' },
  { name: 'Pentavalent 3', ageDays: 98, description: 'Diphtheria, Pertussis, Tetanus, Hepatitis B, Hib' }, // 14 weeks
  { name: 'OPV 3', ageDays: 98, description: 'Polio' },
  { name: 'Rota 3', ageDays: 98, description: 'Rotavirus' },
  { name: 'Measles & Rubella 1', ageDays: 270, description: 'Measles, Rubella' }, // 9 months
  { name: 'Vitamin A 1', ageDays: 270, description: 'Vitamin A deficiency' },
];

const generateSchedule = async (childId, dob) => {
  const schedules = VACCINES.map((vaccine) => {
    const dueDate = new Date(dob);
    dueDate.setDate(dueDate.getDate() + vaccine.ageDays);

    return {
      child: childId,
      vaccineName: vaccine.name,
      description: vaccine.description,
      dueDate: dueDate,
      status: 'Pending',
    };
  });

  await VaccinationSchedule.insertMany(schedules);
};

module.exports = { generateSchedule };
