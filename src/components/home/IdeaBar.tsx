"use client";

import {
  useState,
  useRef,
  useId,
  useEffect,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowUpRight, CloseIcon } from "@/components/ui/Icons";
import type { Locale } from "@/types/project";
import styles from "./IdeaBar.module.css";

const copy = {
  es: {
    placeholderCollapsed: "Contanos qué tenés en mente…",
    placeholderOpen: "Contanos qué tenés en mente…",
    closeAria: "Cerrar",
    emailLabel: "Tu mail",
    emailPlaceholder: "tu@mail.com",
    send: "Enviar idea",
    sending: "Enviando…",
    success: "¡Recibido! Te respondemos pronto.",
    error: "No pudimos enviarlo. Intentá de nuevo.",
    hint: "Sin formularios eternos. Contanos la idea y hablamos.",
    ariaExpand: "Continuar con la idea",
    ariaSend: "Enviar idea",
  },
  en: {
    placeholderCollapsed: "Tell us what you have in mind…",
    placeholderOpen: "Tell us what you have in mind…",
    closeAria: "Close",
    emailLabel: "Your email",
    emailPlaceholder: "you@email.com",
    send: "Send idea",
    sending: "Sending…",
    success: "Got it! We'll get back to you soon.",
    error: "Couldn't send it. Please try again.",
    hint: "No long forms. Tell us the idea and we'll talk.",
    ariaExpand: "Continue with the idea",
    ariaSend: "Send idea",
  },
} as const;

type Phase = "idle" | "expanded" | "sending" | "success" | "error";

export function IdeaBar({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const uid = useId();
  const emailId = `${uid}-email`;

  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [idea, setIdea] = useState("");
  const [email, setEmail] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Click outside collapses back if empty and idle
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        !idea.trim() &&
        phase === "idle"
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, idea, phase]);

  function handleFocus() {
    if (!isOpen) {
      setIsOpen(true);
    }
  }

  function handleClose() {
    if (phase === "sending") return;
    setIsOpen(false);
    setPhase("idle");
    setIdea("");
    setEmail("");
  }

  function expand() {
    if (!idea.trim()) return;
    setPhase("expanded");
    setTimeout(() => emailRef.current?.focus(), 250);
  }

  function handleIdeaKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      expand();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
    }
  }

  function handleGlobalKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape" && isOpen && phase !== "sending") {
      e.stopPropagation();
      handleClose();
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (phase === "sending") return;
    if (!idea.trim() || !email.trim()) return;

    setPhase("sending");
    try {
      const res = await fetch("/api/idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim(), email: email.trim() }),
      });
      if (!res.ok) throw new Error("failed");
      setPhase("success");
    } catch {
      setPhase("error");
    }
  }

  function reset() {
    setPhase("idle");
    setIdea("");
    setEmail("");
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  const isExpanded = phase === "expanded" || phase === "sending";
  const isDone = phase === "success";
  const isError = phase === "error";

  return (
    <div
      ref={containerRef}
      id={`${uid}-bar`}
      className={`${styles.root} ${isOpen ? styles.open : styles.collapsed} ${isExpanded ? styles.expanded : ""} ${isDone ? styles.done : ""} ${isError ? styles.errored : ""}`}
      role="region"
      aria-label={locale === "es" ? "Enviá tu idea" : "Send your idea"}
      onKeyDown={handleGlobalKeyDown}
    >
      {isDone ? (
        <div className={styles.successState}>
          <span className={styles.successMsg}>{t.success}</span>
          <div className={styles.successActions}>
            <button
              className={styles.resetBtn}
              type="button"
              onClick={reset}
              aria-label={locale === "es" ? "Enviar otra idea" : "Send another idea"}
            >
              {locale === "es" ? "Enviar otra" : "Send another"}
            </button>
            <button
              className={styles.closeBtn}
              type="button"
              onClick={handleClose}
              aria-label={t.closeAria}
              title={t.closeAria}
            >
              <CloseIcon size="0.95rem" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Phase 1 — idea input row */}
          <div
            className={styles.phase1}
            onClick={() => inputRef.current?.focus()}
          >
            <input
              ref={inputRef}
              id={`${uid}-idea`}
              className={styles.ideaInput}
              type="text"
              value={idea}
              onFocus={handleFocus}
              onChange={(e) => {
                setIdea(e.target.value);
                if (!isOpen) setIsOpen(true);
                if (isError) setPhase("idle");
              }}
              onKeyDown={handleIdeaKey}
              placeholder={isOpen ? t.placeholderOpen : t.placeholderCollapsed}
              maxLength={600}
              aria-label={locale === "es" ? "Tu idea" : "Your idea"}
              aria-expanded={isOpen}
              aria-controls={`${uid}-phase2`}
              autoComplete="off"
              spellCheck={false}
            />

            {/* Close button (revealed when open) */}
            <button
              className={styles.closeBtn}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              aria-label={t.closeAria}
              title={t.closeAria}
              tabIndex={isOpen ? 0 : -1}
            >
              <CloseIcon size="0.95rem" aria-hidden="true" />
            </button>

            {/* Arrow action button */}
            <button
              className={styles.arrowBtn}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!isOpen) {
                  setIsOpen(true);
                  inputRef.current?.focus();
                } else {
                  expand();
                }
              }}
              disabled={isOpen && (!idea.trim() || isExpanded)}
              aria-label={isOpen ? t.ariaExpand : (locale === "es" ? "Escribir idea" : "Write idea")}
            >
              <ArrowUpRight size="1.1rem" aria-hidden="true" />
            </button>
          </div>

          {/* Phase 2 — email input & send */}
          <div
            id={`${uid}-phase2`}
            className={styles.phase2}
            aria-hidden={!isExpanded}
          >
            <div className={styles.phase2Content}>
              <div className={styles.emailRow}>
                <label htmlFor={emailId} className={styles.emailLabel}>
                  <span className="mono">{t.emailLabel}</span>
                  <input
                    ref={emailRef}
                    id={emailId}
                    className={styles.emailInput}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    maxLength={254}
                    required
                    autoComplete="email"
                    tabIndex={isExpanded ? 0 : -1}
                  />
                </label>
                <button
                  className={`${styles.sendBtn} ${phase === "sending" ? styles.sendBtnBusy : ""}`}
                  type="submit"
                  disabled={!email.trim() || phase === "sending"}
                  aria-label={t.ariaSend}
                  tabIndex={isExpanded ? 0 : -1}
                >
                  <span>{phase === "sending" ? t.sending : t.send}</span>
                  <ArrowUpRight size="1rem" aria-hidden="true" />
                </button>
              </div>
              {isError && (
                <p className={styles.errorMsg} role="alert">{t.error}</p>
              )}
            </div>
          </div>

          {/* honeypot */}
          <label className={styles.trap} aria-hidden="true">
            Website<input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </form>
      )}

      {/* Helper hint (fades in when open) */}
      {!isDone && (
        <p className={styles.hint}>{t.hint}</p>
      )}
    </div>
  );
}
