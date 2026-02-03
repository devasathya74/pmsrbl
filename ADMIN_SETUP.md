# Admin/Principal Login Setup Guide
## पुलिस मॉडर्न स्कूल - Admin User Creation & Management

---

## ✅ Admin Login System Complete!

### 🎯 What's Been Implemented

1. **Login Button on Homepage** - Navigation में login button added
2. **Role-Based Authentication** - Different dashboards for different roles
3. **Admin User Creation Page** - Firebase में admin/principal users बनाने के लिए
4. **Admin Dashboard** - Statistics और quick actions के साथ

---

## 📁 Files Created/Modified

### 1. **Homepage (index.html)**
**Changes:**
- Desktop navigation में "लॉगिन" button added
- Mobile menu में भी login link added
- Icon: `fa-user-lock`

**Location:** Between "शुल्क संरचना" and "प्रवेश लें"

---

### 2. **Login Page (pages/login.html)**
**Enhanced Features:**
- Role-based authentication
- Automatic dashboard redirection based on role
- User data fetching from Firestore
- Hindi role names in welcome message

**Roles Supported:**
- `admin` → `admin-dashboard.html`
- `principal` → `admin-dashboard.html`
- `teacher` → `teacher-dashboard.html`
- `parent` → `parent-dashboard.html`

---

### 3. **Create Admin Page (pages/create-admin.html)**
**Purpose:** Firebase में new admin/principal/teacher users बनाना

**Features:**
- User registration with role assignment
- Fields:
  - Name (required)
  - Email (required)
  - Password (required, min 6 chars)
  - Mobile Number (optional)
  - Role (required: admin/principal/teacher)
- Success message with user details
- Auto-saves user data to Firestore

**Access:** `http://localhost:8000/pages/create-admin.html`

---

### 4. **Admin Dashboard (pages/admin-dashboard.html)**
**Purpose:** Admin/Principal के लिए central dashboard

**Features:**
- **Access Control:** Only admin/principal roles can access
- **Statistics Cards:**
  - Total Admissions
  - Pending Applications
  - Contact Messages
  - Total Users
- **Quick Actions:**
  - Create New User
  - View Admissions
  - View Messages
- **Recent Admissions List:** Last 5 admissions with status
- **Logout Button:** Secure logout functionality

**Security:** Automatic redirect if user doesn't have admin/principal role

---

## 🔐 How to Create Admin/Principal User

### Method 1: Using Create Admin Page (Recommended)

1. **Open Create Admin Page:**
   ```
   http://localhost:8000/pages/create-admin.html
   ```

2. **Fill in Details:**
   - **Name:** डॉ. राजेश कुमार
   - **Email:** principal@pmsraebareli.com
   - **Password:** Principal@123 (minimum 6 characters)
   - **Mobile:** 9876543210 (optional)
   - **Role:** Select "Principal (प्रधानाचार्य)"

3. **Click "Create User"**

4. **Success!** User will be created in Firebase with:
   - Firebase Authentication account
   - Firestore user document with role

---

### Method 2: Using Firebase Console

1. **Go to Firebase Console:**
   ```
   https://console.firebase.google.com/project/pms25bn
   ```

2. **Create User in Authentication:**
   - Go to Authentication → Users
   - Click "Add user"
   - Enter email and password
   - Click "Add user"
   - Copy the User UID

3. **Add User Document in Firestore:**
   - Go to Firestore Database
   - Click "Start collection" (if first time) or navigate to `users` collection
   - Click "Add document"
   - Document ID: Paste the User UID from step 2
   - Add fields:
     ```
     email: "principal@pmsraebareli.com"
     name: "डॉ. राजेश कुमार"
     phone: "9876543210"
     role: "principal"
     createdAt: "2024-01-30T12:00:00Z"
     ```
   - Click "Save"

---

## 👥 User Roles Explained

### 1. **Admin (एडमिन)**
- Full access to all features
- Can create/edit/delete users
- Can approve/reject admissions
- Can view all data
- Dashboard: `admin-dashboard.html`

### 2. **Principal (प्रधानाचार्य)**
- Same as Admin
- Can manage school operations
- Can view reports and analytics
- Dashboard: `admin-dashboard.html`

### 3. **Teacher (शिक्षक)**
- Can view student data
- Can update attendance
- Can add marks
- Dashboard: `teacher-dashboard.html` (to be created)

### 4. **Parent (अभिभावक)**
- Can view child's information
- Can track admission status
- Can download documents
- Dashboard: `parent-dashboard.html` (to be created)

---

## 🔄 Login Flow

### For Admin/Principal:

1. User clicks "लॉगिन" button on homepage
2. Redirected to `pages/login.html`
3. Enters email and password
4. System authenticates with Firebase
5. Fetches user role from Firestore
6. Shows welcome message: "स्वागत है [Name]! आप [Role] के रूप में लॉगिन हो रहे हैं..."
7. Redirects to appropriate dashboard:
   - Admin/Principal → `admin-dashboard.html`
   - Teacher → `teacher-dashboard.html`
   - Parent → `parent-dashboard.html`

---

## 📊 Admin Dashboard Features

### Statistics Display:
- **Total Admissions:** Count of all admission applications
- **Pending Applications:** Applications waiting for approval
- **Contact Messages:** Total contact form submissions
- **Total Users:** All registered users

### Quick Actions:
- **Create New User:** Opens `create-admin.html`
- **View Admissions:** View all admission applications (coming soon)
- **View Messages:** View contact form messages (coming soon)

### Recent Admissions:
- Shows last 5 admission applications
- Displays: Student name, class, mobile, status, date
- Color-coded status badges:
  - Yellow: Pending
  - Green: Approved
  - Red: Rejected

---

## 🔒 Security Features

### 1. **Authentication Required:**
- All dashboard pages check if user is logged in
- Redirects to login page if not authenticated

### 2. **Role-Based Access Control:**
- Admin dashboard checks user role
- Only admin/principal can access
- Others are redirected to homepage with error message

### 3. **Secure Logout:**
- Logout button in dashboard
- Confirmation dialog before logout
- Clears session and redirects to homepage

### 4. **Password Requirements:**
- Minimum 6 characters
- Firebase handles password security

---

## 📝 Sample Admin Users

### Admin User:
```
Email: admin@pmsraebareli.com
Password: Admin@123
Role: admin
Name: Administrator
```

### Principal User:
```
Email: principal@pmsraebareli.com
Password: Principal@123
Role: principal
Name: डॉ. राजेश कुमार
```

### Teacher User:
```
Email: teacher@pmsraebareli.com
Password: Teacher@123
Role: teacher
Name: श्रीमती प्रिया शर्मा
```

---

## 🚀 Quick Start Guide

### Step 1: Create Admin User
```
1. Open: http://localhost:8000/pages/create-admin.html
2. Fill form with admin details
3. Click "Create User"
4. Note down the credentials
```

### Step 2: Test Login
```
1. Go to: http://localhost:8000
2. Click "लॉगिन" button in navigation
3. Enter admin email and password
4. You should see welcome message and redirect to admin dashboard
```

### Step 3: Explore Dashboard
```
1. View statistics
2. Check recent admissions
3. Try quick actions
4. Test logout functionality
```

---

## 🛠️ Troubleshooting

### Issue: "User not found" error
**Solution:** Make sure user is created in both Firebase Authentication AND Firestore

### Issue: "Access Denied" message
**Solution:** Check user role in Firestore. Must be 'admin' or 'principal'

### Issue: Dashboard not loading data
**Solution:** 
1. Check Firebase console for data
2. Verify Firestore security rules
3. Check browser console for errors

### Issue: Login button not visible
**Solution:** Clear browser cache and reload page

---

## 📱 Mobile Responsiveness

All pages are fully responsive:
- Login page adapts to mobile screens
- Admin dashboard stacks cards vertically
- Navigation menu shows hamburger icon
- Touch-friendly buttons and links

---

## 🔮 Future Enhancements

### Planned Features:
1. **Admission Management:**
   - View all applications
   - Approve/reject with comments
   - Send email notifications
   - Download application PDFs

2. **User Management:**
   - Edit user details
   - Change user roles
   - Deactivate users
   - Reset passwords

3. **Analytics:**
   - Admission trends
   - User activity logs
   - Popular pages
   - Conversion rates

4. **Reports:**
   - Monthly admission reports
   - Fee collection reports
   - Student demographics
   - Export to Excel/PDF

---

## 📞 Support

For admin setup issues:
- Check Firebase Console: https://console.firebase.google.com/project/pms25bn
- Review `FIREBASE_SETUP.md` for Firebase configuration
- Check browser console for error messages

---

## ✅ Checklist

Before going live, ensure:
- [ ] Admin user created successfully
- [ ] Login functionality tested
- [ ] Dashboard loads correctly
- [ ] Role-based redirection works
- [ ] Logout functionality works
- [ ] Firebase security rules configured
- [ ] All credentials documented securely

---

**Last Updated:** January 30, 2026  
**Status:** ✅ Fully Implemented and Ready to Use  
**Access:** Login button visible on homepage navigation
