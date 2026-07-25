"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/", label: "홈" },
  { href: "/profile", label: "약력" },
  { href: "/research", label: "연구" },
  { href: "/insights", label: "정책·기고" },
  { href: "/cv", label: "CV" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all">
      <div className="container-kwy flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-blue-500/30 group-hover:bg-blue-700 transition-colors">
            유
          </div>
          <div>
            <span className="block font-bold text-lg text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
              유경원
            </span>
            <span className="block text-xs font-medium tracking-wider uppercase text-slate-500">
              Kyeongwon Yoo
            </span>
          </div>
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[0.92rem] px-4 py-1.5 rounded-full font-medium transition-all duration-200 ${
                  active
                    ? "bg-white text-blue-600 font-semibold shadow-xs border border-slate-200/60"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          className="md:hidden w-11 h-11 -mr-1 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center gap-[5px] text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <span
            className={`block w-[18px] h-[2px] bg-slate-700 transition-transform duration-200 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-[18px] h-[2px] bg-slate-700 transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-[18px] h-[2px] bg-slate-700 transition-transform duration-200 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* mobile sheet */}
      {open && (
        <nav className="md:hidden border-t border-slate-200 bg-white shadow-lg">
          <div className="container-kwy py-3 space-y-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-base transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-600 font-semibold border border-blue-100"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
