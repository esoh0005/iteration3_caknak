# CAKNAK: Cyber Awareness Platform for Malaysian Teens

## Overview
**CAKNAK** is a web-based platform designed to help Malaysian teenagers (ages 13–17) improve their cybersecurity awareness, digital literacy, and online safety. It provides engaging, localized educational tools—ranging from breach detection and recovery guidance to gamified learning modules based on real cybercrime data.

> Built for **FIT5120 TM-02**

---

## Problem Statement
Malaysia is experiencing a surge in data breaches, phishing scams, and identity theft—yet many teenagers remain unaware of these risks. This project addresses the gap by empowering teens with tools to identify, prevent, and respond to digital threats through interactive experiences and data-driven education.

---

## Target Audience
Malaysian teenagers aged **13–17**, a group legally permitted to own email accounts yet often unequipped to handle cyber threats independently.

---

## Tech Stack
- **Next.js (App Router)** — Modern React framework
- **Tailwind CSS** — Rapid UI styling
- **Groq API** — Fast LLM responses for phishing simulation
- **Supabase** — Real-time database integration
- **Custom ML Models** — For password strength detection
- **Third-party APIs**: 
  - `HaveIBeenPwned`
  - `Ransomware.live`

---

## Datasets & APIs
| Source              | Use Case                            | Type                    |
|---------------------|-------------------------------------|--------------------------|
| MyCERT (2010–2025)  | Cybercrime trends in Malaysia       | PDF > CSV                |
| Ransomware.live     | Real-time global ransomware data    | API (JSON)               |
| HaveIBeenPwned      | Email breach status checker         | API                      |
| Sber Password Data  | ML training for password strength   | Kaggle CSV               |
| Phishing Email Set  | AI detection & feedback system      | Kaggle CSV               |

