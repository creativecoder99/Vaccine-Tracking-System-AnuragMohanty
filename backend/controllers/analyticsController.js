const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Child = require('../models/Child');
const SchoolDetails = require('../models/SchoolDetails');
const VaccinationSchedule = require('../models/VaccinationSchedule'); // Assuming you have this or similar logic

// @desc    Get Global Stats for Admin
// @route   GET /api/analytics/admin
// @access  Private (Admin Only)
const getAdminStats = asyncHandler(async (req, res) => {
    console.log('Fetching Admin Stats...');
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalSchools = await User.countDocuments({ role: 'school' });
    const totalChildren = await Child.countDocuments({});

    // Mocking vaccination stats for now as we don't have a direct "VaccineRecord" model yet
    // In a real app, you'd aggregate from VaccinationSchedule where status = 'Completed'
    const vaccinationsAdministered = await VaccinationSchedule.countDocuments({ status: 'Completed' });
    const vaccinationsPending = await VaccinationSchedule.countDocuments({ status: 'Pending' });

    console.log({
        totalUsers,
        totalChildren,
        vaccinationsAdministered,
        vaccinationsPending
    });

    res.json({
        totalUsers,
        totalSchools,
        totalChildren,
        vaccinationsAdministered,
        vaccinationsPending,
        userGrowth: [ // Mock data for chart
            { name: 'Jan', users: 10 },
            { name: 'Feb', users: 25 },
            { name: 'Mar', users: 40 },
            { name: 'Apr', users: 55 },
            { name: 'May', users: 80 },
            { name: 'Jun', users: totalUsers },
        ]
    });
});

// @desc    Get School Stats
// @route   GET /api/analytics/school
// @access  Private (School Only)
const getSchoolStats = asyncHandler(async (req, res) => {
    console.log('Fetching School Stats for user:', req.user.id);
    // Find all children linked to this school (user.id)
    const totalStudents = await Child.countDocuments({ user: req.user.id });
    
    // Get simple gender distribution
    const boys = await Child.countDocuments({ user: req.user.id, gender: 'Male' });
    const girls = await Child.countDocuments({ user: req.user.id, gender: 'Female' });

    res.json({
        totalStudents,
        genderDistribution: [
            { name: 'Boys', value: boys },
            { name: 'Girls', value: girls },
        ],
        vaccinationCoverage: [ // Mock percentages
            { name: 'Fully Vaccinated', value: 70 },
            { name: 'Partially Vaccinated', value: 20 },
            { name: 'Unvaccinated', value: 10 },
        ]
    });
});

// @desc    Get Parent Stats
// @route   GET /api/analytics/parent
// @access  Private (Parent Only)
const getParentStats = asyncHandler(async (req, res) => {
   console.log('Stats Request: User ID:', req.user.id);
   const children = await Child.find({ user: req.user.id });
   console.log(`Found ${children.length} children for user`);
   
   const stats = await Promise.all(children.map(async (child) => {
       const total = await VaccinationSchedule.countDocuments({ child: child._id });
       const completed = await VaccinationSchedule.countDocuments({ child: child._id, status: 'Completed' }); // Check 'Completed' casing
       
       console.log(`Child: ${child.name} (${child._id}) - Total: ${total}, Completed: ${completed}`);

       return {
           name: child.name,
           total,
           completed,
           pending: total - completed,
           percentage: total === 0 ? 0 : Math.round((completed / total) * 100)
       };
   }));

   console.log('Sending Parent Stats:', stats);
   res.json(stats);
});

module.exports = {
    getAdminStats,
    getSchoolStats,
    getParentStats
};
