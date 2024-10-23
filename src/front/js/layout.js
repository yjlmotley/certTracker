import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import { ForgotPassword } from "./pages/forgotPassword";
import { ChangePassword } from "./pages/changePassword";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { AdminCourseTracker } from "./pages/adminCourseTracker";
import { AdminCertificationTracker } from "./pages/adminCertificationTracker";
import { CourseTracker } from "./pages/courseTracker";
import { CertificationTracker } from "./pages/certificationTracker";
import SignUp from "./pages/signUp";
import Login from "./pages/login";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <BrowserRouter basename={basename}>
                    <ScrollToTop>
                        <Navbar />
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<SignUp />} path="/sign-up" />
                            <Route element={<Login />} path="/login" />
                            <Route element={<ForgotPassword />} path="/forgot-password" />
                            <Route element={<ChangePassword />} path="/change-password" />
                            <Route element={<AdminCourseTracker />} path="/admin-course-tracker" />
                            <Route element={<AdminCertificationTracker />} path="/admin-certification-tracker" />
                            <Route element={<CourseTracker />} path="/:username/course-tracker" />
                            <Route element={<CertificationTracker />} path="/:username/certification-tracker" />
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                        <Footer />
                    </ScrollToTop>
                </BrowserRouter>
            </div>
        </DndProvider>
    );
};

export default injectContext(Layout);
