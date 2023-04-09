import { NextComponentType, NextPageContext } from "next/types";
import React, { ReactNode } from "react";
import Link from "next/link";
import { Head } from "next/document";
import { useRouter } from "next/router";
interface Props {
  children: React.ReactElement[];
}

function Layout({ children }: Props) {
  const router = useRouter();

  return (
    <>
      {/* Mobile Nav Start */}
      <div className="navbar bg-base-100 md:hidden">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="text-white">
                <Link href={"/anime"}>Anime</Link>
              </li>
              <li>
                <Link href={"/kdrama"}>Kdrama</Link>
              </li>
              <li>
                <Link href={"/read?page=1&offset=0"}>Manga/Manhwa</Link>
              </li>
              <li>
                <Link href={"/movie-tvshow"}>Movies/TV</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link href={"/"} className="btn btn-ghost normal-case text-xl">
            KAMM
          </Link>
        </div>
        <div className="navbar-end"></div>
      </div>
      {/* Mobile Nav End */}

      {/* Desktop Nav Start */}
      <header className="hidden bg-base-100 md:navbar ">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost normal-case text-xl">
            KAMM
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                href={"/anime"}
                className={`${
                  router.asPath.includes("anime") && `text-primary`
                }`}
              >
                Anime
              </Link>
            </li>
            <li>
              <Link
                href={"/kdrama"}
                className={`${
                  router.asPath.includes("kdrama") && `text-primary`
                }`}
              >
                Kdrama
              </Link>
            </li>
            <li>
              <Link
                href={"/read?page=1&offset=0"}
                className={`${
                  router.asPath.includes("manga") && `text-primary`
                }`}
              >
                Manga/Manhwa
              </Link>
            </li>
            <li>
              <Link
                href={"/movie-tvshow"}
                className={`${
                  router.asPath.includes("movies") && `text-primary`
                }`}
              >
                Movies/TV
              </Link>
            </li>
          </ul>
        </div>
      </header>
      {/* Desktop Nav End */}

      {/* Main Component */}
      {...children}

      {/* Footer Start */}
      <footer className="footer p-10 bg-neutral text-neutral-content ">
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
      {/* Footer End */}
    </>
  );
}

export default Layout;
