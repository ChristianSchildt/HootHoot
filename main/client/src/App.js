import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomePage from './pages/WelcomePage.js';
import TLandingPage from './pages/t_LandingPage.js';
import TRegistrationPage from './pages/t_RegistrationPage.js';
import TLoginPage from './pages/t_LoginPage.js';
import TLibraryMenuPage from './pages/t_LibraryMenuPage.js';
import TAnalysesMenuPage from './pages/t_AnalysesMenuPage.js';
import TNewsMenuPage from './pages/t_NewsMenuPage';
import TCreateHootHootPage from './pages/t_CreateHootHootPage.js';
import TLetStudentsJoinPage from './pages/t_LetStudentsJoinPage.js';
import TPlayHootHootPage from './pages/t_PlayHootHootPage.js';
import TAnswerEvaluationPage from './pages/t_AnswerEvaluationPage';
import TWinnerAnimationPage from './pages/t_WinnerAnimationPage.js';
import THootHootEndcardPage from './pages/t_HootHootEndcardPage.js';
import TGameReportPage from './pages/t_GameReportPage';
import SLandingPage from './pages/s_LandingPage.js';
import SAnswerSelectionMinimalistPage from './pages/s_AnswerSelectionPage_Minimalist.js';
import SAnswerSelectionDetailedPage from './pages/s_AnswerSelectionPage_Detailed.js';
import SWinnerAnimationPage from './pages/s_WinnerAnimationPage.js';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


export default function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<WelcomePage/>} />
          <Route path="/teacher" element={<TLandingPage/>} />
          <Route path="/teacher/registration" element={<TRegistrationPage/>} />
          <Route path="/teacher/login" element={<TLoginPage/>} />
          <Route path="/teacher/libraryMenu" element={<TLibraryMenuPage/>} />
          <Route path="/teacher/analysesMenu" element={<TAnalysesMenuPage/>} />
          <Route path="/teacher/newsMenu" element={<TNewsMenuPage/>} />
          <Route path="/teacher/createHootHoot" element={<TCreateHootHootPage/>} />
          <Route path="/teacher/letStudentsJoin" element={<TLetStudentsJoinPage/>} />
          <Route path="/teacher/playHootHoot" element={<TPlayHootHootPage/>} />
          <Route path="/teacher/answerEvaluation" element={<TAnswerEvaluationPage/>} />
          <Route path="/teacher/winnerAnimation" element={<TWinnerAnimationPage/>} />
          <Route path="/teacher/hootHootEndcard" element={<THootHootEndcardPage/>} />
          <Route path="/teacher/GameReportPage" element={<TGameReportPage/>} />
          <Route path="/student" element={<SLandingPage/>} />
          <Route path="/student/answerselectionMinimalist" element={<SAnswerSelectionMinimalistPage/>} />
          <Route path="/student/answerselectionDetailed" element={<SAnswerSelectionDetailedPage/>} />
          <Route path="/student/winnerAnimation" element={<SWinnerAnimationPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
