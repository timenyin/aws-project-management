"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery, useGetProjectsQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import {
  LockIcon,
  LucideIcon,
  Home,
  X,
  Briefcase,
  Search,
  Settings,
  User,
  Users,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  Layers3,
  Ellipsis,
  GitCommitVertical,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

function Sidebar() {
  // create a state
  const [showProjects, setShowProject] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  // using api to get display the data 
  const { data: projects } = useGetProjectsQuery();

  //  --- for return Statement
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const { data: currentUser } = useGetAuthUserQuery({});
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
        console.error("Error signing Out: ", error )
    }
  };

  if (!currentUser) return null;
  const currentUserDetails = currentUser?.userDetails;


  const sidebarClassName = `fixed flex flex-col h-[100%] justify-between shadow-xl
  transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white 
  ${isSidebarCollapsed ? "w-0 hidden" : "w-[22rem]"} `;

  return (
    <div className={sidebarClassName}>
      <div className="flex h-[100] w-full flex-col justify-start">
        {/* Top Logo */}
        <div className="z-50 flex min-h-[56px] w-full items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          {/* Logo */}
          <div className="flex items-center gap-5 px-8 py-4 dark:border-gray-700">
            <Image
              src="https://pm-s3-images-folder.s3.us-east-1.amazonaws.com/Management_Logo.svg"
              alt="Logo"
              width={60}
              height={60}
            />
            <div>
              <h3 className="text-lg font-bold tracking-wide dark:text-gray-200">
                MANAGEMENT
              </h3>
              <div className="mt-1 flex items-start gap-2">
                <p className="text-xs text-gray-500">H A R M O N Y 2K</p>
              </div>
            </div>
          </div>

          {/* Adjust button position */}
          <div className="ml-auto">
            {isSidebarCollapsed ? null : (
              <button
                className="py-3"
                onClick={() => {
                  dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
                }}
              >
                <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
              </button>
            )}
          </div>
        </div>
        {/* Team  */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold tracking-wide dark:text-gray-200">
              H2K-TEAM
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* Navbar Links  */}
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="Users" href="/users" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>

        {/* Project links  */}
        <button
          onClick={() => setShowProject((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="flex items-center space-x-2 text-black dark:text-gray-400">
            <Ellipsis className="h-5 w-5" /> {/* Icon */}
            <span>Projects</span>
          </span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {/* PROJECT LIST */}
        {showProjects 
        && projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={GitCommitVertical}
              label={project.name}
              href={`/projects/${project.id}`}
            />
        ))}
        {/* Priorities Links  */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="flex items-center space-x-2 text-black dark:text-gray-400">
            <Ellipsis className="h-5 w-5" /> {/* Icon */}
            <span>Priority</span> {/* Text */}
          </span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
      </div>
      <div className="z-10 mt-32 flex w-full flex-col items-center gap-4 bg-white px-8 py-8 dark:bg-black md:hidden">
        <div className="flex w-full items-center">
            <div className="align-center flex h-9 w-9 justify-center">
              {!!currentUserDetails?.profilePictureUrl ? (
                <Image
                src={`https://pm-s3-images-folder.s3.us-east-1.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                alt={currentUserDetails?.username || "User Profile Picture"}
                width={100}
                height={50}
                className="h-full rounded-full object-cover"
              />
              ) : (
                <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
              )}
            </div>
            <span className="mx-3 text-gray-800 dark:text-white">
              {currentUserDetails?.username}
            </span>
            <button className="self-start rounded bg-gray-400 px-4 py-2 text-xs font-bold text-white hover:bg-gray-500 md:block" 
              onClick={handleSignOut}
              >
              Sign out
            </button>
          </div>
        </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  // isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  // isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-gray-500" />
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
