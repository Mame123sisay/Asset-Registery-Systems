import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
//import AssetsListPage from './pages/AssetsListPage';
//import AssetDetailPage from './pages/AssetDetailPage';
import Navbar from './components/Navbar'
import DepartmentForm from './pages/DepartmentForm';
import OrgUserForm from './pages/OrgUserForm';
import AssetForm from './pages/AssetForm';
import DepartmentList from './components/DepartmentList';
import OrgUserList from './components/OrgUserList';
import AssetLists from './components/AssetLists';
import HomePage from './components/Homepage';
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
}

export default function App() {
 
  
  return (
    <>
   
    <AuthProvider>
       <Navbar/>
        <Routes>
           <Route path='/asset-list' element={<AssetLists/>}/>
           <Route path='/user-list' element={<OrgUserList/>}/>
           <Route path='/department-list' element={<DepartmentList/>}/>
          <Route path='/assets' element={<AssetLists/>}/>
          <Route path="/org-user" element={<OrgUserList />} />
        <Route path="/departments" element={<DepartmentList/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/home' element={<HomePage/>}/>
         {/* <Route path="/assets" element={<PrivateRoute><AssetsListPage /></PrivateRoute>} />
          <Route path="/assets/:id" element={<PrivateRoute><AssetDetailPage /></PrivateRoute>} />*/}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      
    </AuthProvider></>
  );
}
