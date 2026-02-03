// Firebase Configuration and Initialization
// Police Modern School - Firebase Setup

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC44UWR3RIeMeIG-pXkyPxvjPyn3GWA6oQ",
    authDomain: "pms25bn.firebaseapp.com",
    projectId: "pms25bn",
    storageBucket: "pms25bn.firebasestorage.app",
    messagingSenderId: "220014739322",
    appId: "1:220014739322:web:71ad71e4991d29cb7360c3",
    measurementId: "G-8BD9FCNCB2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// Export Firebase services
export {
    app,
    auth,
    db,
    storage,
    analytics,
    // Auth functions
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    // Firestore functions
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    // Storage functions
    ref,
    uploadBytes,
    getDownloadURL
};

// Helper Functions

// Authentication Helper
export const authHelper = {
    // Login user
    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Register new user
    async register(email, password, userData) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save additional user data to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: email,
                createdAt: new Date().toISOString(),
                role: userData.role || 'admin', // Use provided role or default to 'admin'
                ...userData
            });

            return { success: true, user: user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Logout user
    async logout() {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Create Account (Secondary) - For Admin to create users without logging out
    async createSecondaryAccount(email, password, userData) {
        let secondaryApp = null;
        try {
            // Initialize a secondary app instance
            secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
            const secondaryAuth = getAuth(secondaryApp);

            // Create user in secondary app
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
            const user = userCredential.user;

            // Save data to MAIN Firestore (using main 'db' reference)
            // 1. Save to users collection (Role Management)
            await setDoc(doc(db, 'users', user.uid), {
                email: email,
                name: userData.name,
                role: userData.role, // 'teacher' or 'student'
                createdAt: new Date().toISOString()
            });

            // 2. Return UID so we can use it in 'teachers' collection
            // Cleanup
            await signOut(secondaryAuth);
            // We don't delete the app here instantly as it might cause issues, fetching it next time is fine or let it verify garbage collection.
            // Actually, safe to delete:
            // await deleteApp(secondaryApp); // deleteApp needs import, skipping for now to avoid complexity

            return { success: true, uid: user.uid };
        } catch (error) {
            console.error("Secondary Auth Error:", error);
            return { success: false, error: error.message };
        }
    },

    // Get current user
    getCurrentUser() {
        return auth.currentUser;
    },

    // Check auth state
    onAuthChange(callback) {
        return onAuthStateChanged(auth, callback);
    }
};

// Firestore Helper
export const firestoreHelper = {
    // Add document
    async addDocument(collectionName, data) {
        try {
            const docRef = await addDoc(collection(db, collectionName), {
                ...data,
                createdAt: new Date().toISOString()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Get all documents
    async getDocuments(collectionName, conditions = null) {
        try {
            let q = collection(db, collectionName);

            if (conditions) {
                q = query(q, ...conditions);
            }

            const querySnapshot = await getDocs(q);
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({ id: doc.id, ...doc.data() });
            });

            return { success: true, data: documents };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Get single document
    async getDocument(collectionName, docId) {
        try {
            const docRef = doc(db, collectionName, docId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
            } else {
                return { success: false, error: 'Document not found' };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Update document
    async updateDocument(collectionName, docId, data) {
        try {
            const docRef = doc(db, collectionName, docId);
            await updateDoc(docRef, {
                ...data,
                updatedAt: new Date().toISOString()
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Delete document
    async deleteDocument(collectionName, docId) {
        try {
            await deleteDoc(doc(db, collectionName, docId));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Supabase configuration
const supabaseUrl = 'https://cdbkqpywptbjbkazyqcy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkYmtxcHl3cHRiamJrYXp5cWN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMTEwODIsImV4cCI6MjA4NTU4NzA4Mn0.yw_ohvKVOBx3xg0BwYoDkldJh5w0TjjlDGPWcgDsbXA';
const supabase = createClient(supabaseUrl, supabaseKey);

// Storage Helper (Moved to Supabase)
export const storageHelper = {
    // Upload file
    async uploadFile(file, path) {
        try {
            const { data, error } = await supabase
                .storage
                .from('admissions')
                .upload(path, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) throw error;

            const { data: { publicUrl } } = supabase
                .storage
                .from('admissions')
                .getPublicUrl(path);

            return { success: true, url: publicUrl };
        } catch (error) {
            console.error("Supabase Upload Error:", error);
            return { success: false, error: error.message };
        }
    },

    // Get file URL
    async getFileURL(path) {
        try {
            const { data: { publicUrl } } = supabase
                .storage
                .from('admissions')
                .getPublicUrl(path);

            return { success: true, url: publicUrl };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Admission Form Helper
export const admissionHelper = {
    // Submit admission form
    async submitAdmission(formData, files) {
        try {
            // Upload documents if provided
            const uploadedFiles = {};

            if (files.birthCertificate) {
                const result = await storageHelper.uploadFile(
                    files.birthCertificate,
                    `${Date.now()}_birth_certificate`
                );
                if (result.success) uploadedFiles.birthCertificate = result.url;
            }

            if (files.aadharCard) {
                const result = await storageHelper.uploadFile(
                    files.aadharCard,
                    `${Date.now()}_aadhar_card`
                );
                if (result.success) uploadedFiles.aadharCard = result.url;
            }

            if (files.photo) {
                const result = await storageHelper.uploadFile(
                    files.photo,
                    `${Date.now()}_photo`
                );
                if (result.success) uploadedFiles.photo = result.url;
            }

            // Save admission data to Firestore
            // Generate Custom Registration Number (PMS-XXXXX)
            const regNum = 'PMS-' + Math.floor(10000 + Math.random() * 90000);

            // Save admission data to Firestore
            const admissionData = {
                ...formData,
                documents: uploadedFiles,
                status: 'pending',
                submittedAt: new Date().toISOString(),
                registrationNumber: regNum, // Save explicitly as a field too
                id: regNum // Save ID within the document for easier retrieval
            };

            // Use setDoc to create document with custom ID instead of addDocument
            await setDoc(doc(db, 'admissions', regNum), admissionData);

            return { success: true, id: regNum };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Get admission status
    async getAdmissionStatus(admissionId) {
        return await firestoreHelper.getDocument('admissions', admissionId);
    }
};

// Contact Form Helper
export const contactHelper = {
    // Submit contact form
    async submitContact(formData) {
        try {
            const result = await firestoreHelper.addDocument('contacts', {
                ...formData,
                status: 'new',
                read: false
            });
            return result;
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Analytics Helper
export const analyticsHelper = {
    // Log custom event
    logEvent(eventName, eventParams = {}) {
        if (analytics) {
            import('https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js')
                .then(({ logEvent }) => {
                    logEvent(analytics, eventName, eventParams);
                });
        }
    },

    // Log page view
    logPageView(pageName) {
        this.logEvent('page_view', { page_name: pageName });
    }
};

console.log('Firebase initialized successfully!');
