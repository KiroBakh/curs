import React from 'react';
import { Route, Routes } from "react-router";

import EmployeesPage from './components/EmployeesPage';
import Profile from './components/Profile';
import Auth from './components/Auth';
import EmployeeConstructor from './components/EmployeeConstructor';

import Header from './layouts/Header';

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Header />}>

                <Route path="/api/employees" element={<EmployeesPage />} />
                <Route path="/api/employees/profile/:id" element={<Profile />} />
                <Route path='/api/employee' element={<EmployeeConstructor />} />
                <Route path='/api/auth' element={<Auth />} />
            </Route>
        </Routes>
    );
}

