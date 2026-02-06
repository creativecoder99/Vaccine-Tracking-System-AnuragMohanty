const nodemailer = require('nodemailer');
const cron = require('node-cron');
const VaccinationSchedule = require('../models/VaccinationSchedule');
const NotificationLog = require('../models/NotificationLog');
const Child = require('../models/Child');
const User = require('../models/User');

// Configure Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail or your SMTP provider
  auth: {
    user: process.env.EMAIL_USER, // Add these to .env later
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Skipping Email: No credentials provided');
      return true; // Mock success
    }
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    return true;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
};

const checkUpcomingVaccinations = async () => {
  console.log('Running daily vaccination check...');
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  // Find vaccines due tomorrow
  const upcomingVaccines = await VaccinationSchedule.find({
    dueDate: {
      $gte: tomorrow,
      $lt: dayAfterTomorrow,
    },
    status: 'Pending',
  });

  for (const vaccine of upcomingVaccines) {
    const child = await Child.findById(vaccine.child);
    if (!child) continue;

    const parent = await User.findById(child.user);
    if (!parent) continue;

    const message = `Reminder: ${child.name} is due for ${vaccine.vaccineName} vaccination tomorrow (${tomorrow.toLocaleDateString()}).`;

    // Send Email
    const emailSent = await sendEmail(parent.email, 'Vaccination Reminder', message);

    // Log Notification
    await NotificationLog.create({
      child: child._id,
      schedule: vaccine._id,
      channel: 'Email',
      message: message,
      status: emailSent ? 'Sent' : 'Failed',
    });
  }
};

// Initialize Cron Job (Runs every day at 9:00 AM)
const initNotificationService = () => {
  cron.schedule('0 9 * * *', () => {
    checkUpcomingVaccinations();
  });
  console.log('Notification Service initialized: Running daily at 9:00 AM');
};

module.exports = { initNotificationService, checkUpcomingVaccinations };
