"use client"
import { ArrowRight, Sparkles, Truck, Shield, Clock, Play, Quote, Target, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/contexts/ProductsContext";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Professional Background Decorations Component with enhanced SVGs
const BackgroundDecorations = ({ type = "hero" }: { type?: "hero" | "programs" | "newsletter" | "testimonials" | "trust" | "products" | "mission" }) => {
  const getCSSVar = (varName: string, fallback?: string) => {
    if (typeof window === 'undefined') return fallback || '';
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim() || fallback || '';
  };

  const primaryColor = getCSSVar('--primary', '#3b82f6');
  const accentColor = getCSSVar('--accent', '#8b5cf6');
  const warningColor = getCSSVar('--warning', '#f59e0b');
  const borderColor = getCSSVar('--border', '#e2e8f0');

  if (type === "hero") {
    return (
      <>
        {/* Enhanced SVG at bottom left - Custom provided SVG with increased size */}
        <motion.figure
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.15 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-0 left-0 hidden sm:block lg:opacity-20 z-0"
        >
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9" className="w-[600px] sm:w-[700px] md:w-[800px] lg:w-[900px] h-auto">
            <path
              fill="none"
              stroke={borderColor}
              strokeWidth="3"
              strokeOpacity="0.4"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            />
          </svg>
        </motion.figure>

        {/* Enhanced SVG at top right - Custom provided SVG with increased size */}
        <motion.figure
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.15 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute top-0 right-0 hidden sm:block lg:opacity-20 z-0"
        >
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9" className="w-[600px] sm:w-[700px] md:w-[800px] lg:w-[900px] h-auto">
            <path
              fill="none"
              stroke={borderColor}
              strokeWidth="3"
              strokeOpacity="0.4"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            />
          </svg>
        </motion.figure>

        {/* Mobile-optimized SVG with increased size */}
        <motion.figure
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 0.1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-8 right-4 block sm:hidden z-0"
        >
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9" className="w-64 h-32">
            <path
              fill="none"
              stroke={borderColor}
              strokeWidth="4"
              strokeOpacity="0.3"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            />
          </svg>
        </motion.figure>

        {/* Mobile bottom left SVG with increased size */}
        <motion.figure
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 0.1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-8 left-4 block sm:hidden z-0"
        >
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9" className="w-64 h-32">
            <path
              fill="none"
              stroke={borderColor}
              strokeWidth="4"
              strokeOpacity="0.3"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            />
          </svg>
        </motion.figure>
      </>
    );
  }

  // Trust Badges Section Figures
  if (type === "trust") {
    return (
      <>
        {/* Top left figure for trust section */}
        <motion.figure
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="absolute top-4 left-4 hidden sm:block z-0"
        >
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9" className="w-48 h-auto">
            <path
              fill="none"
              stroke={borderColor}
              strokeWidth="2"
              strokeOpacity="0.2"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            />
          </svg>
        </motion.figure>

        {/* Bottom right figure for trust section */}
        <motion.figure
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute bottom-4 right-4 hidden sm:block z-0"
        >
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9" className="w-40 h-auto">
            <path
              fill="none"
              stroke={borderColor}
              strokeWidth="2"
              strokeOpacity="0.2"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            />
          </svg>
        </motion.figure>
      </>
    );
  }

  // Products Section Figures
  if (type === "products") {
    return (
      <>
        {/* Top right figure for products section */}
        <motion.figure
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="absolute top-8 left-4 sm:left-8 z-0"
        >
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9" className="w-64 h-auto">
            <path
              fill="none"
              stroke={borderColor}
              strokeWidth="2"
              strokeOpacity="0.2"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            />
          </svg>
        </motion.figure>

        {/* Bottom left figure for products section */}
        <motion.figure
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="absolute bottom-8 right-4 sm:right-8 z-0"
        >
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9" className="w-48 h-auto">
            <path
              fill="none"
              stroke={borderColor}
              strokeWidth="2"
              strokeOpacity="0.2"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            />
          </svg>
        </motion.figure>
      </>
    );
  }

  // Mission Section Figures
  if (type === "mission") {
    return (
      <>
        {/* Left figure for mission section */}
        <motion.figure
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="absolute top-1/4 left-4 hidden lg:block z-0"
        >
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9" className="w-56 h-auto">
            <path
              fill="none"
              stroke={borderColor}
              strokeWidth="2"
              strokeOpacity="0.2"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            />
          </svg>
        </motion.figure>

        {/* Right figure for mission section */}
        <motion.figure
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute bottom-1/4 right-4 hidden lg:block z-0"
        >
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9" className="w-48 h-auto">
            <path
              fill="none"
              stroke={borderColor}
              strokeWidth="2"
              strokeOpacity="0.2"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            />
          </svg>
        </motion.figure>
      </>
    );
  }

  if (type === "programs") {
    return (
      <>
        {/* Animated SVG for programs section */}
        <motion.figure
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="absolute top-8 left-4 sm:left-8 z-0"
        >
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9" className="w-64 h-auto">
            <path
              fill="none"
              stroke={borderColor}
              strokeWidth="2"
              strokeOpacity="0.2"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            />
          </svg>
        </motion.figure>

        <motion.figure
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="absolute bottom-8 right-4 sm:right-8 z-0"
        >
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9" className="w-48 h-auto">
            <path
              fill="none"
              stroke={borderColor}
              strokeWidth="2"
              strokeOpacity="0.2"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            />
          </svg>
        </motion.figure>
      </>
    );
  }

  if (type === "newsletter") {
    return (
      <>
        {/* Animated SVG for newsletter */}
        <motion.figure
          initial={{ rotate: -180, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 0.1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute top-4 left-4 z-0"
        >
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9" className="w-48 h-auto">
            <path
              fill="none"
              stroke={borderColor}
              strokeWidth="2"
              strokeOpacity="0.2"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            />
          </svg>
        </motion.figure>

        <motion.figure
          initial={{ rotate: 180, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute bottom-4 right-4 z-0"
        >
          <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9" className="w-40 h-auto">
            <path
              fill="none"
              stroke={borderColor}
              strokeWidth="2"
              strokeOpacity="0.2"
              d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z"
            />
          </svg>
        </motion.figure>
      </>
    );
  }

  return null;
};

const Index = () => {
  const products = useProducts();
  const { theme } = useTheme();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const featuredProducts = products.filter((p: any) => p.isFeatured);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get CSS custom properties with fallbacks
  const getCSSVar = (varName: string, fallback?: string) => {
    if (typeof window === 'undefined') return fallback || '';
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim() || fallback || '';
  };

  // Define CSS variable getters
  const cssVars = {
    primary: () => getCSSVar('--primary', '#3b82f6'),
    primaryForeground: () => getCSSVar('--primary-foreground', '#ffffff'),
    secondary: () => getCSSVar('--secondary', '#f1f5f9'),
    secondaryForeground: () => getCSSVar('--secondary-foreground', '#0f172a'),
    accent: () => getCSSVar('--accent', '#8b5cf6'),
    warning: () => getCSSVar('--warning', '#f59e0b'),
    foreground: () => getCSSVar('--foreground', '#020817'),
    background: () => getCSSVar('--background', '#ffffff'),
    card: () => getCSSVar('--card', '#ffffff'),
    border: () => getCSSVar('--border', '#e2e8f0'),
    mutedForeground: () => getCSSVar('--muted-foreground', '#64748b'),
    fontDisplay: () => getCSSVar('--font-display', 'system-ui, sans-serif'),
    gray: () => getCSSVar('--gray', '#6b7280'),
    gradientHero: () => getCSSVar('--gradient-hero', 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)'),
  };

  // Video modal handler
  const handleWatchVideo = () => {
    setShowVideoModal(true);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Enhanced Hero Section with grey shade */}
      <section className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center overflow-hidden p-2.5 sm:p-5 md:p-10 rounded-t-3xl mx-0 sm:mx-2 md:mx-4 mt-0 sm:mt-2 md:mt-4">
        {/* Grey Shade Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${'/assets/hero-bg.jpg'})`,
              transform: isMobile ? 'scale(1.1)' : 'scale(1.05)',
              transition: 'transform 0.3s ease-out'
            }}
          />

          {/* Grey gradient overlay - 60% grey tint */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/60 via-gray-700/50 to-gray-900/60 opacity-95" />

          {/* Accent color overlay for branding - 40% opacity */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-accent/30 to-warning/20 opacity-40" />

          {/* Animated gradient overlay */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute inset-0 opacity-10"
            style={{
              background: `linear-gradient(
                45deg,
                transparent 30%,
                ${cssVars.warning()} 50%,
                transparent 70%
              )`,
              backgroundSize: '400% 400%',
            }}
          />
        </div>

        {/* Professional Background Decorations - Removed shadow from SVG */}
        <BackgroundDecorations type="hero" />

        {/* Enhanced Wave SVG at bottom without shadow */}
        <motion.figure
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
        >
          <svg
            width="100%"
            height="80"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="sm:h-[120px] md:h-[150px]"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              d="M0,80 L0,20 Q720,80 1440,20 L1440,80 Z"
              fill={cssVars.background()}
              stroke={cssVars.border()}
              strokeWidth="3"
              strokeOpacity="0.25"
            />
          </svg>
        </motion.figure>


        <div className="container relative z-30 px-4 sm:px-6 lg:px-8 w-full">
          <div className="py-6 sm:py-8 md:py-12 flex flex-col items-center sm:items-start text-center sm:text-start">
            <div className="w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 text-white my-3 sm:mt-0">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="py-4 sm:py-6 md:py-8"
              >
                {/* Animated Badge */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-block bg-white/20 backdrop-blur-lg border border-white/30 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full mb-6 sm:mb-8 max-w-full"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-0 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg"
                    style={{ color: cssVars.primaryForeground() }}
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="badge rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-0 sm:mr-2"
                      style={{
                        backgroundColor: `${cssVars.accent()}40`,
                        color: cssVars.primaryForeground(),
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                      Featured
                    </motion.span>
                    Inspiring the <b className="whitespace-nowrap">next generation</b> of innovators
                  </motion.p>
                </motion.div>

                {/* Animated Title */}
                <motion.h1
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight sm:leading-tight md:leading-tight drop-shadow-lg"
                  style={{
                    color: '#ffffff',
                    fontFamily: cssVars.fontDisplay(),
                    textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                >
                  Build. Learn.{' '}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={{ color: cssVars.warning() }}
                    className="relative inline-block"
                  >
                    Create Amazing Things.
                    {/* Thick underline effect */}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="absolute -bottom-2 left-0 w-full h-2 rounded-full"
                      style={{ backgroundColor: cssVars.warning() }}
                    />
                  </motion.span>
                </motion.h1>

                {/* Animated Description */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-95 px-2 sm:px-0 max-w-2xl mx-auto sm:mx-0 drop-shadow-md"
                  style={{ color: '#f1f5f9' }}
                >
                  Premium STEM kits, 3D printer rentals, and hands-on programs designed to spark curiosity and build real-world skills.
                </motion.p>

                {/* Animated Buttons */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-8 sm:mt-10"
                >
                  {/* Primary Button with SLANTED light grey shade inside */}
                  <Link href="/shop" className="w-full sm:w-auto">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        className="gap-3 px-6 sm:px-8 py-6 sm:py-7 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 w-full sm:w-auto justify-center group relative overflow-hidden"
                        style={{
                          backgroundColor: cssVars.accent(),
                          color: cssVars.primaryForeground()
                        }}
                      >
                        {/* Slanted light grey shade effect - starts from left to right */}
                        <motion.div
                          className="absolute inset-0 opacity-20"
                          style={{
                            background: `linear-gradient(
                              135deg,
                              transparent 0%,
                              rgba(255, 255, 255, 0.4) 25%,
                              rgba(255, 255, 255, 0.2) 50%,
                              transparent 100%
                            )`,
                            transform: 'translateX(-100%) skewX(-15deg)',
                          }}
                          animate={{
                            x: ['0%', '100%', '100%', '0%'],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.5, 0.51, 1]
                          }}
                        />

                        {/* Additional subtle shine effect */}
                        <motion.div
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: `linear-gradient(
                              90deg,
                              transparent 0%,
                              rgba(255, 255, 255, 0.6) 50%,
                              transparent 100%
                            )`,
                            transform: 'translateX(-100%)',
                          }}
                          animate={{
                            x: ['0%', '200%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5
                          }}
                        />

                        <span className="relative z-10 text-base sm:text-lg font-semibold">Shop Now</span>
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </Link>

                  {/* Video Button with animation */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center sm:justify-start py-2 w-full sm:w-auto"
                  >
                    <button
                      onClick={handleWatchVideo}
                      className="relative group flex items-center justify-center sm:justify-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-visible w-full sm:w-auto backdrop-blur-lg border border-white/30"
                      style={{
                        backgroundColor: `${cssVars.background()}30`,
                        color: '#ffffff',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <div className="relative">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: `${cssVars.accent()}40` }}
                        />
                        <div
                          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${cssVars.accent()}60` }}
                        >
                          <Play
                            className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                      <span className="text-base sm:text-lg font-semibold drop-shadow-md">Watch Our Story</span>
                    </button>
                  </motion.div>
                </motion.div>

                {/* Animated Trust Indicators */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t"
                  style={{ borderColor: '#ffffff30' }}
                >
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base">
                    {[
                      { icon: Shield, text: "Quality Guaranteed" },
                      { icon: Clock, text: "Same Day Dispatch" },
                      { icon: Users, text: "1000+ Happy Learners" },
                      { icon: Sparkles, text: "STEM Certified" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm"
                      >
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: cssVars.warning() }} />
                        <span className="drop-shadow-sm" style={{ color: '#ffffff' }}>{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section with slide-in animation */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative py-8 sm:py-12 border-y rounded-b-3xl mx-0 sm:mx-2 md:mx-4 mb-8 sm:mb-12 md:mb-16"
        style={{
          backgroundColor: cssVars.secondary(),
          borderColor: cssVars.border()
        }}
      >
        {/* Added Figure Lines for Trust Section */}
        <BackgroundDecorations type="trust" />

        {/* Decorative border lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>

        <div className="container px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { icon: Truck, text: "Free Shipping", desc: "Orders $50+", mobileText: "Free Shipping $50+" },
              { icon: Shield, text: "1-Year Warranty", desc: "Quality guaranteed", mobileText: "Warranty" },
              { icon: Clock, text: "24/7 Support", desc: "Always here to help", mobileText: "Support" },
              { icon: Sparkles, text: "STEM Certified", desc: "Education approved", mobileText: "Certified" },
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex flex-col items-center text-center gap-3 sm:gap-4 py-3 sm:py-4 rounded-2xl hover:shadow-xl transition-all border border-gray-200/50"
                style={{
                  backgroundColor: cssVars.background(),
                  boxShadow: '0 4px 25px rgba(0,0,0,0.08)'
                }}
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 sm:mb-3 border border-gray-200"
                  style={{ backgroundColor: `${cssVars.primary()}10` }}
                >
                  <badge.icon
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                    style={{ color: cssVars.primary() }}
                  />
                </div>
                <div>
                  <span
                    className="text-sm sm:text-base md:text-lg font-semibold block"
                    style={{ color: cssVars.foreground() }}
                  >
                    <span className="hidden sm:inline">{badge.text}</span>
                    <span className="sm:hidden">{badge.mobileText}</span>
                  </span>
                  <span
                    className="text-xs sm:text-sm md:text-base block mt-1 sm:mt-2 opacity-75"
                    style={{ color: cssVars.mutedForeground() }}
                  >
                    <span className="hidden sm:inline">{badge.desc}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Products with staggered animation */}
      <motion.section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Added Figure Lines for Products Section */}
        <BackgroundDecorations type="products" />

        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 md:mb-16"
          >
            <div className="mb-6 sm:mb-0">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '12px' }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="h-8 rounded-full"
                  style={{ backgroundColor: cssVars.accent() }}
                />
                <span
                  className="text-sm sm:text-base font-semibold uppercase tracking-wider"
                  style={{ color: cssVars.accent() }}
                >
                  Featured Collection
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3"
                style={{
                  color: cssVars.foreground(),
                  fontFamily: cssVars.fontDisplay()
                }}
              >
                Top picks for young innovators
              </h2>
              <p className="text-base sm:text-lg md:text-xl" style={{ color: cssVars.mutedForeground() }}>
                Hand-picked STEM kits for all skill levels
              </p>
            </div>
            <Link href="/shop" className="hidden sm:block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="gap-3 rounded-full px-6 sm:px-8 py-6 text-base sm:text-lg border-2"
                  style={{
                    borderColor: cssVars.border(),
                    color: cssVars.foreground()
                  }}
                >
                  View All
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Product Grid with staggered animation */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product: any, i: number) => (
              <motion.div
                key={product.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="w-full"
              >
                <ProductCard
                  product={product}
                  themeColors={{
                    primary: cssVars.primary(),
                    accent: cssVars.accent(),
                    foreground: cssVars.foreground(),
                    background: cssVars.background(),
                    card: cssVars.card(),
                    border: cssVars.border(),
                    mutedForeground: cssVars.mutedForeground()
                  }}
                  isMobile={isMobile}
                />
              </motion.div>
            ))}
          </div>

          {/* View All Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 text-center"
          >
            <Link href="/shop">
              <Button
                variant="outline"
                className="gap-3 rounded-full px-8 py-6 sm:py-7 text-lg sm:text-xl font-semibold hover:shadow-xl transition-shadow border-2"
                style={{
                  borderColor: cssVars.border(),
                  color: cssVars.foreground(),
                }}
              >
                Browse All Products
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-secondary"
      >
        {/* Added Figure Lines for Mission Section */}
        <BackgroundDecorations type="mission" />

        {/* Decorative border */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>

        <div className="container px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center border border-gray-300"
                  style={{ backgroundColor: `${cssVars.primary()}10` }}
                >
                  <Target className="w-7 h-7" style={{ color: cssVars.primary() }} />
                </motion.div>
                <h2
                  className="text-3xl sm:text-4xl font-bold"
                  style={{
                    color: cssVars.foreground(),
                    fontFamily: cssVars.fontDisplay()
                  }}
                >
                  Our Mission & Vision
                </h2>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-3" style={{ color: cssVars.primary() }}>
                    <Target className="w-6 h-6" />
                    Our Vision
                  </h3>
                  <p className="text-lg leading-relaxed" style={{ color: cssVars.mutedForeground() }}>
                    To become the leading platform for STEM education, inspiring the next generation of innovators
                    through accessible, hands-on learning experiences and quality products.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-3" style={{ color: cssVars.accent() }}>
                    <Award className="w-6 h-6" />
                    Our Mission
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Provide accessible, high-quality STEM education to learners of all ages",
                      "Foster creativity, critical thinking, and problem-solving skills",
                      "Build a community of young innovators equipped for future challenges"
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-7 h-7 rounded-full flex items-center justify-center mt-0.5 shrink-0 border border-gray-300"
                          style={{ backgroundColor: `${cssVars.accent()}10` }}
                        >
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cssVars.accent() }} />
                        </motion.div>
                        <span className="text-lg leading-relaxed" style={{ color: cssVars.mutedForeground() }}>
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="border-2 border-border rounded-3xl p-8 bg-card shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-300"
                  style={{ backgroundColor: `${cssVars.warning()}10` }}
                >
                  <Quote className="w-10 h-10" style={{ color: cssVars.warning() }} />
                </motion.div>
                <blockquote className="text-center mb-8">
                  <p className="text-xl sm:text-2xl italic mb-6 leading-relaxed" style={{ color: cssVars.foreground() }}>
                    "The goal of STEM Park is not just to sell products, but to cultivate minds that will shape our future."
                  </p>
                  <footer className="text-base" style={{ color: cssVars.mutedForeground() }}>
                    <cite className="font-semibold not-italic text-lg">Sarah Chen</cite>, Founder & CEO
                  </footer>
                </blockquote>
                <div className="flex items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base">
                  {[
                    { value: "1000+", label: "Happy Learners", color: cssVars.primary() },
                    { value: "50+", label: "STEM Programs", color: cssVars.accent() },
                    { value: "4.9/5", label: "Customer Rating", color: cssVars.warning() },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="font-bold text-2xl sm:text-3xl mb-1" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                      <div style={{ color: cssVars.mutedForeground() }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Programs Section */}
      <motion.section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        <BackgroundDecorations type="programs" />

        {/* Decorative border */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>

        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '12px' }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="h-8 sm:h-10 rounded-full"
                style={{ backgroundColor: cssVars.accent() }}
              />
              <span
                className="text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wider"
                style={{ color: cssVars.accent() }}
              >
                Learning Experiences
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
              style={{
                color: cssVars.foreground(),
                fontFamily: cssVars.fontDisplay()
              }}
            >
              Beyond Products
            </h2>
            <p
              className="text-lg sm:text-xl md:text-2xl px-4 sm:px-0 leading-relaxed"
              style={{ color: cssVars.mutedForeground() }}
            >
              Hands-on learning experiences to nurture the next generation of innovators.
            </p>
          </motion.div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {/* STEM Clubs */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-200"
            >
              <div className="relative h-80 sm:h-96 md:h-[500px] overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  src="/assets/stem-club.jpg"
                  alt="STEM Club"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border border-white/30"
                    style={{ backgroundColor: `${cssVars.accent()}30` }}
                  >
                    <Sparkles className="w-5 h-5 sm:w-6 h-6 sm:h-6" style={{ color: cssVars.accent() }} />
                  </motion.div>
                  <span
                    className="font-semibold text-sm sm:text-base md:text-lg tracking-wider"
                    style={{ color: cssVars.accent() }}
                  >
                    WEEKLY SESSIONS
                  </span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
                  style={{
                    color: cssVars.background(),
                    fontFamily: cssVars.fontDisplay()
                  }}
                >
                  STEM Clubs
                </h3>
                <p
                  className="mb-6 sm:mb-8 md:mb-10 opacity-95 text-base sm:text-lg md:text-xl max-w-lg"
                  style={{ color: cssVars.background() }}
                >
                  Hands-on robotics, coding, and engineering projects in a collaborative environment.
                </p>
                <Link href="/programs">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="gap-3 rounded-full px-6 sm:px-8 py-6 text-base sm:text-lg md:text-xl font-semibold group border-2"
                      style={{
                        backgroundColor: cssVars.accent(),
                        color: cssVars.primaryForeground(),
                        borderColor: 'rgba(255,255,255,0.3)'
                      }}
                    >
                      Join Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            {/* Academic Support */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-200"
            >
              <div className="relative h-80 sm:h-96 md:h-[500px] overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  src="/assets/academic-support.jpg"
                  alt="Academic Support"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border border-white/30"
                    style={{ backgroundColor: `${cssVars.warning()}30` }}
                  >
                    <Sparkles className="w-5 h-5 sm:w-6 h-6 sm:h-6" style={{ color: cssVars.warning() }} />
                  </motion.div>
                  <span
                    className="font-semibold text-sm sm:text-base md:text-lg tracking-wider"
                    style={{ color: cssVars.warning() }}
                  >
                    1-ON-1 TUTORING
                  </span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
                  style={{
                    color: cssVars.background(),
                    fontFamily: cssVars.fontDisplay()
                  }}
                >
                  Academic Support
                </h3>
                <p
                  className="mb-6 sm:mb-8 md:mb-10 opacity-95 text-base sm:text-lg md:text-xl max-w-lg"
                  style={{ color: cssVars.background() }}
                >
                  Personalized tutoring in math, science, and technology subjects.
                </p>
                <Link href="/programs">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="gap-3 rounded-full px-6 sm:px-8 py-6 text-base sm:text-lg md:text-xl font-semibold group border-2"
                      style={{
                        backgroundColor: cssVars.warning(),
                        color: cssVars.foreground(),
                        borderColor: 'rgba(255,255,255,0.3)'
                      }}
                    >
                      Get Support
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Newsletter with animations */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden rounded-3xl mx-0 sm:mx-2 md:mx-4 my-12 sm:my-16 md:my-20 border border-gray-200"
        style={{
          backgroundColor: cssVars.secondary(),
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}
      >
        <BackgroundDecorations type="newsletter" />

        {/* Decorative border */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>

        {/* Animated floating elements without shadow */}
        <motion.figure
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-8 left-8 opacity-10 hidden sm:block"
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="25" fill="none" stroke={cssVars.border()} strokeWidth="2" strokeOpacity="0.3" />
          </svg>
        </motion.figure>

        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '12px' }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="h-8 sm:h-10 rounded-full"
                style={{ backgroundColor: cssVars.accent() }}
              />
              <span
                className="text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wider"
                style={{ color: cssVars.accent() }}
              >
                Stay Updated
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-4 sm:px-0"
              style={{
                color: cssVars.foreground(),
                fontFamily: cssVars.fontDisplay()
              }}
            >
              Join the STEM Park Community
            </h2>
            <p
              className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed"
              style={{ color: cssVars.mutedForeground() }}
            >
              Get exclusive deals, new product alerts, and STEM learning resources straight to your inbox.
            </p>

            {/* Newsletter Form */}
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-xl mx-auto px-4 sm:px-0"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 sm:px-8 py-5 sm:py-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 text-base sm:text-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-300"
                style={{
                  backgroundColor: cssVars.background(),
                  color: cssVars.foreground(),
                }}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="px-8 sm:px-10 py-5 sm:py-6 rounded-full text-base sm:text-lg md:text-xl font-semibold gap-3 w-full sm:w-auto shadow-xl hover:shadow-2xl transition-shadow border-2"
                  style={{
                    backgroundColor: cssVars.accent(),
                    color: cssVars.primaryForeground(),
                    borderColor: 'rgba(255,255,255,0.3)'
                  }}
                >
                  Subscribe
                  <ArrowRight className="w-5 h-5 sm:w-6 h-6" />
                </Button>
              </motion.div>
            </motion.form>

            <p className="text-sm sm:text-base mt-6 sm:mt-8" style={{ color: cssVars.mutedForeground() }}>
              No spam ever. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Video Modal */}
      {showVideoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowVideoModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-2xl p-4 sm:p-6 max-w-4xl w-full shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold" style={{ color: cssVars.foreground() }}>
                Watch Our Story
              </h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-gray-300">
              <iframe
                width="100%"
                height="100%"
                src="https://youtu.be/OXHTlMPbX7o?si=60qf-kkaTJHjyCj_"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;