// using native fetch in Node 20
const API_BASE = 'http://localhost:5000/api';

const runTest = async () => {
    console.log('🚀 Starting Automated System Test...');

    // 1. Register User
    const uniqueUser = `testuser_${Date.now()}@example.com`;
    const password = 'password123';
    console.log(`\n1. Registering User: ${uniqueUser}`);
    
    let token = '';
    let userId = '';

    try {
        const regRes = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test Parent', email: uniqueUser, password })
        });
        
        const regData = await regRes.json();
        if (!regRes.ok) throw new Error(regData.message || 'Registration failed');
        
        console.log('✅ Registration Successful');
        token = regData.token;
        userId = regData._id;

    } catch (e) {
        console.error('❌ Registration Failed:', e.message);
        process.exit(1);
    }

    // 2. Add Child
    console.log('\n2. Adding Child: "Automated Baby"');
    let childId = '';
    
    try {
        const childRes = await fetch(`${API_BASE}/children`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: 'Automated Baby',
                dob: '2024-01-01',
                gender: 'Male',
                bloodGroup: 'B+'
            })
        });

        const childData = await childRes.json();
        if (!childRes.ok) throw new Error(childData.message || 'Add Child failed');
        
        console.log('✅ Child Added Successful');
        childId = childData._id;

    } catch (e) {
        console.error('❌ Add Child Failed:', e.message);
        process.exit(1);
    }

    // 3. Verify Schedule Generation
    console.log('\n3. Verifying Schedule Generation...');
    let vaccineId = '';

    try {
        const getChildRes = await fetch(`${API_BASE}/children/${childId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const childProfile = await getChildRes.json();
        if (!childProfile.schedule || childProfile.schedule.length === 0) {
            throw new Error('No vaccination schedule generated');
        }

        console.log(`✅ Schedule Generated with ${childProfile.schedule.length} vaccines`);
        
        const firstVaccine = childProfile.schedule[0];
        console.log(`   - First Vaccine: ${firstVaccine.vaccineName} | Status: ${firstVaccine.status}`);
        vaccineId = firstVaccine._id;

    } catch (e) {
        console.error('❌ Schedule Verification Failed:', e.message);
        process.exit(1);
    }

    // 4. Update Vaccine Status
    console.log('\n4. Updating Vaccine Status to "Completed"...');

    try {
        const updateRes = await fetch(`${API_BASE}/vaccines/${vaccineId}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: 'Completed' })
        });

        const updateData = await updateRes.json();
        if (!updateRes.ok) throw new Error(updateData.message || 'Update failed');

        if (updateData.status === 'Completed' && updateData.completionDate) {
            console.log('✅ Vaccine Updated Successfully to "Completed"');
        } else {
            throw new Error('Status mismatch after update');
        }

    } catch (e) {
        console.error('❌ Vaccine Update Failed:', e.message);
        process.exit(1);
    }

    console.log('\n✨ ALL TESTS PASSED SUCCESSFULLY! ✨');
};

runTest();
