const API_URL = 'http://localhost:5000/api';

const verifyAnalytics = async () => {
    try {
        console.log('--- Starting Analytics Verification ---');

        // 1. Register/Login Admin
        console.log('Attempting to get Admin Token...');
        let token;
        
        try {
            // Try Login first
            const loginRes = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'admin@vaccinotify.com',
                    password: 'adminpassword'
                })
            });
            
            if (loginRes.ok) {
                const data = await loginRes.json();
                token = data.token;
                console.log('Login Successful.');
            } else {
                 console.log('Login failed (' + loginRes.status + '), trying to register...');
                 // Try Register
                const regRes = await fetch(`${API_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: 'Admin User',
                        email: 'admin@vaccinotify.com',
                        password: 'adminpassword',
                        role: 'admin'
                    })
                });

                if (!regRes.ok) {
                    const err = await regRes.text();
                     throw new Error(`Registration Failed: ${err}`);
                }
                const data = await regRes.json();
                token = data.token;
                console.log('Registration Successful.');
            }
        } catch (e) {
            console.error('Auth Error:', e.message);
            return;
        }

        // 2. Fetch Admin Analytics
        console.log('\nFetching Admin Analytics...');
        const adminRes = await fetch(`${API_URL}/analytics/admin`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!adminRes.ok) {
             const err = await adminRes.text();
             throw new Error(`Admin Analytics Fetch Failed: ${err}`);
        }

        const adminData = await adminRes.json();
        console.log('Admin Analytics Data:', JSON.stringify(adminData, null, 2));

         // 3. Register/Login Parent for Parent Stats Verification
         console.log('\nAttempting to get Parent Token...');
         let parentToken;
         const parentEmail = 'parent@test.com';
         
         try {
             const ploginRes = await fetch(`${API_URL}/auth/login`, {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({
                     email: parentEmail,
                     password: 'password123'
                 })
             });
             
             if (ploginRes.ok) {
                 const data = await ploginRes.json();
                 parentToken = data.token;
                 console.log('Parent Login Successful.');
             } else {
                 console.log('Parent Login failed, registering...');
                 const pregRes = await fetch(`${API_URL}/auth/register`, {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({
                         name: 'Parent User',
                         email: parentEmail,
                         password: 'password123',
                         role: 'user'
                     })
                 });
                 if (!pregRes.ok) throw new Error('Parent Reg Failed');
                 const data = await pregRes.json();
                 parentToken = data.token;
                 console.log('Parent Registration Successful.');
             }

             // Fetch Parent Analytics
             console.log('\nFetching Parent Analytics...');
             const parentRes = await fetch(`${API_URL}/analytics/parent`, {
                headers: { Authorization: `Bearer ${parentToken}` }
            });

            if (!parentRes.ok) {
                 const err = await parentRes.text();
                 throw new Error(`Parent Analytics Fetch Failed: ${err}`);
            }
            const parentData = await parentRes.json();
            console.log('Parent Analytics Data:', JSON.stringify(parentData, null, 2));

         } catch (e) {
             console.error('Parent Flow Error:', e.message);
         }

    } catch (error) {
        console.error('Verification Failed:', error.message);
    }
};

verifyAnalytics();
