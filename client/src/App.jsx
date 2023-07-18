import React, { useState, useEffect, createContext } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { Backend } from './utils/utils';

import { Card, CardBody, Text } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';

import SavedChars from './pages/SavedChars/SavedChars';
import NewSavedChars from './pages/SavedChars/NewSavedChars';
import Landing from './pages/Landing/Landing';
import Testing from './pages/Testing/Testing';
import NotFound from './pages/NotFound/NotFound';

import Menu from './components/Menu/Menu';

import ProtectedRoute from './utils/ProtectedRoute';

const AuthContext = createContext();

const App = () => {

  const MenuWrapper = () => (
    <>
      <Menu />
      <Outlet />
    </>
  );

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/characters" />} />
          <Route path="/login" element={<Landing />} />
          <Route element={<MenuWrapper />}>
            <Route path="/characters" element={<ProtectedRoute Component={NewSavedChars} redirectRoute='/login' />} />
            <Route path="/testing" element={<Testing />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;