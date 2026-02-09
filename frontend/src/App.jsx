import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar'
import DepartmentList from './pages/DepartmentList';
import UserList from './pages/UserList';
import AssetLists from './pages/AssetLists';
import Dashboard from './pages/Dashboard';
import Root from './components/Root';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { Dashboards } from './components/Dashboards';
import { ItDashboard } from './pages/ItStaff/ItDashboard';
import EmployList from './pages/EmployList';
import ProfilePage from './pages/ProfilePage';
export default function App() {
 
  
  return (
    <>
   
    <AuthProvider>
       <Navbar/>
        <Routes>

          <Route path='/admin-dashboard' element={<ProtectedRoutes requiredRole={['Admin']}>
            <Dashboards/>
          </ProtectedRoutes>}>
          <Route index element={< Dashboard/>}/>
          <Route path='assets' element={<AssetLists/>}/>
           <Route path="user" element={<UserList />} />
           <Route path="departments" element={<DepartmentList/>}/>  
           <Route path='employes' element={<EmployList/>}/>
           <Route path='profile' element={<ProfilePage/>}/>
          </Route>
        
          <Route path="/login" element={<LoginPage />} />
          <Route path='/' element={<Root/>}/>

         {/* <Route path="/assets" element={<PrivateRoute><AssetsListPage /></PrivateRoute>} />
          <Route path="/assets/:id" element={<PrivateRoute><AssetDetailPage /></PrivateRoute>} />*/}
         <Route path="/it-staff-dashboard" element={
  <ProtectedRoutes requiredRole={['IT_Staff']}>
    <ItDashboard />
  </ProtectedRoutes>
}>
  <Route index  element={<AssetLists />} />
   <Route path='profile' element={<ProfilePage/>}/>
  <Route path="logout" element={<Navigate to="/login" replace />} />
</Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/unauthorized" element={<p className='text-red-400 text-2xl font-bold text-center mt-20'> unauthorized</p>} />
        </Routes>
      
    </AuthProvider></>
  );
}
