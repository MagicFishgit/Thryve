"use client";

import LiquidEther from "./LiquidEther";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {IconMail } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-dvh">
      <LiquidEther>
        {/* Optional top nav */}
        <header className="absolute inset-x-0 top-0 z-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Image src="/logo-cut-transparent.png" alt="Thryve Logo" width={120} height={30} priority />
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">Docs</Button>
              <Button variant="ghost" size="sm">Pricing</Button>
              <Link href="/login"><Button size="sm">Log In</Button></Link>
            </div>
          </div>
        </header>

        {/* Main hero content */}
        <main className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-32 text-center md:pt-40">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Manage smarter. Grow faster. <p style={{ color: "#14b8a6" }}>Thryve.</p>
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
            ERP made simple, functional and beautifully designed for small businesses and startups.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/register"><Button size="lg">Get started</Button></Link>
            <Button size="lg" variant="outline">Learn more</Button>
          </div>

          {/* Example card with input */}
          <Card className="mt-12 w-full max-w-xl backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <CardTitle>Contact Us.</CardTitle>
              <CardDescription>We'll be happy to demo our product.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input placeholder="you@example.com" />
                <Button><IconMail /> Send</Button>
              </div>
            </CardContent>
            <CardFooter className="justify-center text-xs text-muted-foreground">
              By subscribing you agree to our Terms & Privacy.
            </CardFooter>
          </Card>
        </main>

        {/* Footer */}
        <footer className="absolute inset-x-0 bottom-0 z-10 p-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Thryve — All rights reserved.
        </footer>
      </LiquidEther>
    </div>
  );
}
