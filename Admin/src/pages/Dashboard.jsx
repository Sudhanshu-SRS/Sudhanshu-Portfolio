import { useState } from "react";
import Certificates from "../components/Certificates";
import Capabilities from "../components/Capabilities";
import Projects from "../components/Projects";

import {
  CSidebar,
  CSidebarHeader,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cilSpeedometer, cilPuzzle, cilLayers, cilMenu } from "@coreui/icons";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("certificates");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const navItemClass = (tab) =>
    `cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      activeTab === tab
        ? "bg-blue-100 text-blue-600 font-medium"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 md:hidden ${
          sidebarVisible ? "block" : "hidden"
        }`}
        onClick={() => setSidebarVisible(false)}
      />

      {/* ================= SIDEBAR ================= */}
      <CSidebar
        className={`border-end bg-white shadow-sm z-50 
        fixed md:static h-full transition-all duration-300 
        ${sidebarVisible ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <CSidebarHeader className="border-bottom p-4">
          <CSidebarBrand className="text-lg font-semibold text-gray-800">
            Admin Panel
          </CSidebarBrand>
        </CSidebarHeader>

        <CSidebarNav className="p-3 space-y-2">

         <div
  className={navItemClass("certificates")}
  onClick={() => {
    setActiveTab("certificates");
    setSidebarVisible(false);
  }}
>
  <CIcon icon={cilPuzzle} />
  Certificates
</div>

          <div
            className={navItemClass("capabilities")}
            onClick={() => {
              setActiveTab("capabilities");
              setSidebarVisible(false);
            }}
          >
            <CIcon icon={cilPuzzle} />
            Capabilities
          </div>

          <div
            className={navItemClass("projects")}
            onClick={() => {
              setActiveTab("projects");
              setSidebarVisible(false);
            }}
          >
            <CIcon icon={cilLayers} />
            Projects
          </div>

        </CSidebarNav>
      </CSidebar>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">

        {/* 🔝 TOPBAR */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 bg-white border-b shadow-sm">
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setSidebarVisible(true)}
          >
            <CIcon icon={cilMenu} size="lg" />
          </button>

          <h1 className="text-lg md:text-xl font-semibold capitalize">
            {activeTab}
          </h1>

          <div className="text-sm text-gray-500">
            Admin
          </div>
        </div>

        {/* 📄 PAGE CONTENT */}
        <div className="p-4 md:p-6 lg:p-10">

          {activeTab === "certificates" && <Certificates />}
          {activeTab === "capabilities" && <Capabilities />}
          {activeTab === "projects" && <Projects />}

        </div>
      </div>
    </div>
  );
}