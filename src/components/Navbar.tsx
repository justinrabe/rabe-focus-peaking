"use client";

import React from 'react';
import Link from 'next/link';
import { Moon, Sun } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';

const Navbar: React.FC = () => {
    const { theme, setTheme } = useTheme();
  return (
    <nav className="p-4 flex justify-between items-center">
        <NavigationMenu className="flex items-center">
            <NavigationMenuItem className="list-none">
                <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="list-none">
                <Link href="/webcam" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Webcam
                </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenu>
        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} variant="outline" size="icon">
          {theme === 'dark' ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
  </nav>
  );
};

export default Navbar;
