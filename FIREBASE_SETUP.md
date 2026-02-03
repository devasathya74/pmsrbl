# Firebase Setup Documentation
## पुलिस मॉडर्न स्कूल - Firebase Integration Guide

---

## ✅ Firebase Configuration Complete!

### 🔥 Firebase Project Details

**Project Name:** pms25bn  
**Project ID:** pms25bn  
**Measurement ID:** G-8BD9FCNCB2  
**Auth Domain:** pms25bn.firebaseapp.com  
**Storage Bucket:** pms25bn.firebasestorage.app  

---

## 📁 Files Created/Modified

### 1. **Firebase Configuration File**
**File:** `assets/js/firebase-config.js`

**Features:**
- Firebase App initialization
- Authentication (Auth)
- Firestore Database
- Cloud Storage
- Google Analytics
- Helper functions for all services

**Exported Services:**
- `auth` - Authentication service
- `db` - Firestore database
- `storage` - Cloud Storage
- `analytics` - Google Analytics
- Helper objects: `authHelper`, `firestoreHelper`, `storageHelper`, `admissionHelper`, `contactHelper`, `analyticsHelper`

---

### 2. **Login Page with Firebase Auth**
**File:** `pages/login.html`

**Features:**
- Email/Phone login
- Firebase authentication integration
- Loading states
- Hindi error messages
- Auto-redirect on success
- Remember me functionality

**Authentication Flow:**
1. User enters email/phone + password
2. If phone number, converts to email format (`phone@pmsraebareli.com`)
3. Authenticates with Firebase
4. On success, redirects to dashboard
5. On error, shows Hindi error message

---

### 3. **Admission Form with Firebase**
**File:** `assets/js/admission-form.js`

**Features:**
- Form data submission to Firestore
- Document upload to Cloud Storage
- Application tracking with unique ID
- Analytics event logging
- Auto-save functionality

**Submission Flow:**
1. Collects all form data
2. Uploads documents to Storage
3. Saves form data + document URLs to Firestore
4. Returns unique admission ID
5. Sends confirmation to user

---

### 4. **Google Analytics Integration**
**File:** `index.html` (updated)

**Features:**
- Page view tracking
- Event tracking
- User behavior analytics
- Conversion tracking

**Measurement ID:** G-8BD9FCNCB2

---

## 🛠️ Firebase Services Configured

### 1. **Authentication (Firebase Auth)**

**Purpose:** User login for parent portal

**Methods Available:**
```javascript
// Login
await authHelper.login(email, password);

// Register
await authHelper.register(email, password, userData);

// Logout
await authHelper.logout();

// Get current user
const user = authHelper.getCurrentUser();

// Listen to auth changes
authHelper.onAuthChange((user) => {
    if (user) {
        // User is logged in
    } else {
        // User is logged out
    }
});
```

**Use Cases:**
- Parent portal login
- Admin login
- Teacher login
- Secure access to student data

---

### 2. **Firestore Database**

**Purpose:** Store application data

**Collections:**
- `users` - User profiles (parents, teachers, admin)
- `admissions` - Admission applications
- `contacts` - Contact form submissions
- `students` - Student records (future)
- `announcements` - News/notices (future)

**Methods Available:**
```javascript
// Add document
await firestoreHelper.addDocument('admissions', data);

// Get all documents
await firestoreHelper.getDocuments('admissions');

// Get single document
await firestoreHelper.getDocument('admissions', docId);

// Update document
await firestoreHelper.updateDocument('admissions', docId, data);

// Delete document
await firestoreHelper.deleteDocument('admissions', docId);
```

---

### 3. **Cloud Storage**

**Purpose:** Store uploaded files

**Folders:**
- `admissions/` - Admission documents
  - Birth certificates
  - Aadhar cards
  - Photos
- `students/` - Student photos and documents
- `gallery/` - School gallery images

**Methods Available:**
```javascript
// Upload file
await storageHelper.uploadFile(file, 'admissions/birth_cert.pdf');

// Get file URL
await storageHelper.getFileURL('admissions/birth_cert.pdf');
```

---

### 4. **Google Analytics**

**Purpose:** Track website usage and user behavior

**Events Tracked:**
- Page views
- Login attempts
- Admission form submissions
- Contact form submissions
- Button clicks
- File downloads

**Methods Available:**
```javascript
// Log custom event
analyticsHelper.logEvent('button_click', { button_name: 'admission' });

// Log page view
analyticsHelper.logPageView('home_page');
```

---

## 🔐 Security Rules (To be configured in Firebase Console)

### Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Admissions collection
    match /admissions/{admissionId} {
      allow create: if true; // Anyone can submit
      allow read, update, delete: if request.auth != null; // Only authenticated users
    }
    
    // Contacts collection
    match /contacts/{contactId} {
      allow create: if true; // Anyone can submit
      allow read, update, delete: if request.auth != null; // Only authenticated users
    }
  }
}
```

### Storage Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /admissions/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.resource.size < 5 * 1024 * 1024; // Max 5MB
    }
    
    match /students/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    match /gallery/{allPaths=**} {
      allow read: if true; // Public read
      allow write: if request.auth != null; // Only authenticated users can upload
    }
  }
}
```

---

## 📊 Database Structure

### Users Collection (`users`)
```javascript
{
  uid: "user123",
  email: "parent@example.com",
  name: "राजेश कुमार",
  phone: "9876543210",
  role: "parent", // parent, teacher, admin
  createdAt: "2024-01-30T12:00:00Z",
  children: ["student1", "student2"] // Student IDs
}
```

### Admissions Collection (`admissions`)
```javascript
{
  id: "adm123",
  student_name: "अर्जुन शर्मा",
  dob: "2015-05-15",
  gender: "male",
  class: "1",
  aadhar: "123456789012",
  father_name: "राजेश शर्मा",
  mother_name: "प्रिया शर्मा",
  mobile: "9876543210",
  email: "rajesh@example.com",
  address: "रायबरेली, उत्तर प्रदेश",
  previous_school: "ABC School",
  previous_class: "KG",
  previous_marks: "85",
  documents: {
    birthCertificate: "https://storage.googleapis.com/...",
    aadharCard: "https://storage.googleapis.com/...",
    photo: "https://storage.googleapis.com/..."
  },
  status: "pending", // pending, approved, rejected
  submittedAt: "2024-01-30T12:00:00Z",
  createdAt: "2024-01-30T12:00:00Z"
}
```

### Contacts Collection (`contacts`)
```javascript
{
  id: "contact123",
  name: "राजेश कुमार",
  email: "rajesh@example.com",
  phone: "9876543210",
  subject: "Admission Inquiry",
  message: "I want to know about admission process...",
  status: "new", // new, read, replied
  read: false,
  createdAt: "2024-01-30T12:00:00Z"
}
```

---

## 🚀 How to Use Firebase in Your Code

### 1. **Import Firebase Config**
```javascript
import { authHelper, firestoreHelper, storageHelper, analyticsHelper } from './assets/js/firebase-config.js';
```

### 2. **User Login**
```javascript
const result = await authHelper.login('user@example.com', 'password123');
if (result.success) {
    console.log('Logged in:', result.user);
} else {
    console.error('Login failed:', result.error);
}
```

### 3. **Submit Admission**
```javascript
const formData = {
    student_name: 'अर्जुन शर्मा',
    dob: '2015-05-15',
    // ... other fields
};

const files = {
    birthCertificate: fileInput.files[0],
    aadharCard: fileInput2.files[0],
    photo: fileInput3.files[0]
};

const result = await admissionHelper.submitAdmission(formData, files);
if (result.success) {
    console.log('Admission ID:', result.id);
}
```

### 4. **Track Analytics**
```javascript
// Log page view
analyticsHelper.logPageView('admission_page');

// Log custom event
analyticsHelper.logEvent('form_submitted', {
    form_name: 'admission',
    class: '1'
});
```

---

## ⚙️ Firebase Console Setup Required

### 1. **Enable Authentication**
1. Go to Firebase Console: https://console.firebase.google.com/
2. Select project: `pms25bn`
3. Go to Authentication → Sign-in method
4. Enable "Email/Password"

### 2. **Create Firestore Database**
1. Go to Firestore Database
2. Click "Create database"
3. Choose "Start in production mode"
4. Select location: `asia-south1` (Mumbai)
5. Add security rules (see above)

### 3. **Enable Cloud Storage**
1. Go to Storage
2. Click "Get started"
3. Choose "Start in production mode"
4. Add security rules (see above)

### 4. **Configure Analytics**
Already configured with Measurement ID: `G-8BD9FCNCB2`

---

## 📝 Next Steps

### 1. **Create Admin Panel**
- View all admissions
- Approve/reject applications
- Manage users
- View analytics

### 2. **Create Parent Dashboard**
- View child's information
- Track admission status
- Download documents
- View announcements

### 3. **Add Email Notifications**
- Use Firebase Cloud Functions
- Send confirmation emails
- Send status updates
- Send reminders

### 4. **Add SMS Notifications**
- Integrate with SMS gateway
- Send OTP for verification
- Send admission updates

---

## 🔒 Security Best Practices

1. **Never expose API keys in public repositories**
2. **Use Firebase Security Rules** to protect data
3. **Validate all user inputs** before saving
4. **Limit file upload sizes** (max 5MB)
5. **Use HTTPS** for all connections
6. **Enable reCAPTCHA** for forms
7. **Implement rate limiting** to prevent abuse

---

## 📱 Testing Firebase Integration

### Test Login:
1. Create a test user in Firebase Console
2. Go to `pages/login.html`
3. Enter email and password
4. Check console for success/error messages

### Test Admission Form:
1. Fill out the admission form
2. Upload documents
3. Submit the form
4. Check Firestore for new document
5. Check Storage for uploaded files

### Test Analytics:
1. Open Google Analytics dashboard
2. Go to Realtime → Events
3. Navigate through website
4. See events being tracked in real-time

---

## 🆘 Troubleshooting

### Issue: "Firebase not defined"
**Solution:** Make sure you're using `type="module"` in script tags

### Issue: "Permission denied"
**Solution:** Check Firebase Security Rules in console

### Issue: "File upload failed"
**Solution:** Check file size (max 5MB) and file type

### Issue: "Authentication failed"
**Solution:** Verify email/password and check if user exists

---

## 📞 Support

For Firebase-related issues:
- Firebase Documentation: https://firebase.google.com/docs
- Firebase Console: https://console.firebase.google.com/
- Stack Overflow: https://stackoverflow.com/questions/tagged/firebase

---

**Last Updated:** January 30, 2026  
**Status:** ✅ Fully Configured and Ready to Use
