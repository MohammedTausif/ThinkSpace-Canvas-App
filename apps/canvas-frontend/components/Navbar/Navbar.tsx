"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Layers, Menu, X, ChevronDown, LogIn, UserPlus, Settings, HelpCircle, Bell, Search, Sun, Moon, Github } from "lucide-react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "sticky top-0 left-0  right-0 z-50 transition-all duration-300 ease-in-out  border-gray-100 border-b-[1px]",
                isScrolled
                    ? " sticky  backdrop-blur-sm shadow-sm py-2 lg:mr-72 lg:ml-72 md:rounded-2xl border md:top-5 border-gray-200"
                    : " py-3  bg-white/80  backdrop-blur-lg shadow-sm rounded-2xl"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-7">
                <div className="flex justify-between items-center">

                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-14">
                        <Link href="/" className="flex items-center space-x-2">
                            <Layers className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-blue-600 ">
                                CollabxCanvas
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center  space-x-6">
                            <div className="relative">
                                <button
                                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                                    className="flex items-center text-gray-800 hover:text-blue-600 hover:bg-gray-50 px-3 py-1.5  rounded-full transition-colors"
                                >
                                    Products
                                    <ChevronDown className={cn(
                                        "ml-1 h-4 w-4 transition-transform duration-200",
                                        isProductsOpen ? "rotate-180" : ""
                                    )} />
                                </button>

                                {isProductsOpen && (
                                    <div className="absolute top-full mt-4 w-72 bg-white/90 backdrop-blur-sm rounded shadow-lg border border-gray-100 py-2 z-50">
                                        <Link href="/whiteboard" className="block px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                                            Virtual Whiteboard
                                        </Link>
                                        <Link href="/mindmap" className="block px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                                            Mind Mapping
                                        </Link>
                                        <Link href="/collaboration" className="block px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                                            Team Collaboration
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link href="/" className="text-gray-800 hover:text-blue-600 transition-colors">
                                Blog
                            </Link>
                        </div>
                    </div>


                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-4">

                        <Link
                            href="/signin"
                            className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Log in
                        </Link>

                        <button className="p-2 rounded-full  relative">
                            <Github className="h-5 w-5 text-gray-700" />
                        </button>

                        <button className="p-2 rounded-full  relative">
                            <Sun className="h-5 w-5 text-gray-700" />
                            {/* <Moon className="h-5 w-5 text-gray-600" /> */}
                        </button>

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        <div className="py-2">
                            <button

                                onClick={() => setIsProductsOpen(!isProductsOpen)}
                                className="w-full flex justify-between items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                            >
                                Products
                                <ChevronDown className={cn(
                                    "ml-1 h-4 w-4 transition-transform duration-200",
                                    isProductsOpen ? "rotate-180" : ""
                                )} />
                            </button>

                            {isProductsOpen && (
                                <div className="pl-4 mt-2 space-y-1">
                                    <Link href="/whiteboard" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                                        Virtual Whiteboard
                                    </Link>
                                    <Link href="/mindmap" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                                        Mind Mapping
                                    </Link>
                                    <Link href="/collaboration" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                                        Team Collaboration
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link href="/pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                            Pricing
                        </Link>

                        <Link href="/templates" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                            Templates
                        </Link>

                        <Link href="/blog" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                            Blog
                        </Link>

                        <div className="pt-4 pb-2 border-t border-gray-200">
                            <Link
                                href="/login"
                                className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                            >
                                <LogIn className="mr-3 h-5 w-5" />
                                Log in
                            </Link>

                            <Link
                                href="/signup"
                                className="flex items-center px-3 py-2 mt-1 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                            >
                                <UserPlus className="mr-3 h-5 w-5" />
                                Sign up free
                            </Link>
                        </div>

                        <div className="pt-2 pb-2 border-t border-gray-200">
                            <Link
                                href="/settings"
                                className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                            >
                                <Settings className="mr-3 h-5 w-5" />
                                Settings
                            </Link>

                            <Link
                                href="/help"
                                className="flex items-center px-3 py-2 mt-1 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                            >
                                <HelpCircle className="mr-3 h-5 w-5" />
                                Help Center
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;