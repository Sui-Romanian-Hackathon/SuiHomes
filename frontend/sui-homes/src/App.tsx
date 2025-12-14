"use client";

import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Box,  Container, Flex, Heading } from "@radix-ui/themes";
import { MyTopNav } from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TreasuryPage from './pages/Treasury';
import AnnouncementsPage from './pages/Anouncements';
import HomePage from './pages/Home';
import ProposalsPage from './pages/Proposals';


function App() {
    return (
    <Router>
      <MyTopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/treasury" element={<TreasuryPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/proposals" element={<ProposalsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
