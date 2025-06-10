'use client';

import { CSSProperties } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import type { Footer } from '@/payload-types';

interface Props {
  footerData: Footer;
}

export default function FooterClient({ footerData }: Props) {
  const {
    brand_name     = 'TrekSoulNepal',
    quick_links    = [],
    social         = {},
    accent_color   = '#047857', // emerald‑700
    hover_bg_color = '#d1fae5', // emerald‑100
    copyright_name = 'TrekSoulNepal',
  } = footerData ?? {};

  const varStyle: CSSProperties = {
    '--accent-color': accent_color,
    '--hover-bg': hover_bg_color,
  } as CSSProperties;

  return (
    <section id="contact" className="relative">
      {/* soft fade bridge */}
      <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-b from-transparent to-gray-50" />

      <footer className="border-t border-gray-200 bg-white" style={varStyle}>
        <div className="mx-auto max-w-sm px-4 py-10 space-y-8">
          {/* Logo / word‑mark */}
          <Link
            href="#home"
            aria-label="Home"
            className="block text-center text-2xl font-black tracking-tight"
            style={{ color: 'var(--accent-color)' }}
          >
            {brand_name}
          </Link>

          {/* Quick nav */}
          {quick_links && quick_links.length > 0 && (
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
              {quick_links.map(({ label, section_id }, i) => (
                <Link
                  key={i}
                  href={section_id || '#'}
                  style={
                    {
                      '--nav-hover-active-color': 'var(--accent-color)',
                    } as CSSProperties
                  }
                  className="p-2 hover:text-[color:var(--nav-hover-active-color)]"
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}

          {/* Social */}
          <div className="flex items-center justify-center gap-6">
            {social.facebook && (
              <Link
                href={social.facebook}
                aria-label="Facebook"
                className="rounded-full p-2 transition hover:bg-[color:var(--hover-bg)]"
              >
                <FaFacebookF className="h-5 w-5" style={{ color: 'var(--accent-color)' }} />
              </Link>
            )}
            {social.instagram && (
              <Link
                href={social.instagram}
                aria-label="Instagram"
                className="rounded-full p-2 transition hover:bg-[color:var(--hover-bg)]"
              >
                <FaInstagram className="h-5 w-5" style={{ color: 'var(--accent-color)' }} />
              </Link>
            )}
            {social.whatsapp && (
              <Link
                href={social.whatsapp}
                aria-label="WhatsApp"
                className="rounded-full p-2 transition hover:bg-[color:var(--hover-bg)]"
              >
                <FaWhatsapp className="h-5 w-5" style={{ color: 'var(--accent-color)' }} />
              </Link>
            )}
          </div>

          {/* Copyright */}
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} {copyright_name}. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}

