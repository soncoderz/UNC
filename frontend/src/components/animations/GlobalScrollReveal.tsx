"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

const REVEAL_SELECTOR = [
  "section",
  "article",
  ".clone-section-title",
  ".clone-stat-card",
  ".clone-news-card",
  ".clone-case-item",
  ".clone-product-card",
  ".clone-culture-grid > *",
  ".clone-honor-grid > *",
  ".clone-case-product-grid > *",
  ".clone-other-grid > *",
  ".clone-rnd-produce-grid > *",
  ".clone-workshop-grid > *",
  ".clone-support-service-grid > *",
  ".clone-service-system-card",
  ".clone-contact-main > *",
  ".clone-big-message > *",
  ".ind-programmeLi",
  ".ind-reTitleLi",
  ".ind-reContentLiActive .swiper-slide",
  ".ind-manuLi",
  ".ind-newlist",
].join(",");

const SKIP_SELECTOR = [
  "[data-scroll-reveal='off']",
  ".scroll-reveal-skip",
  ".home-banner",
].join(",");

const MAX_STAGGER_DELAY_MS = 560;
const STAGGER_STEP_MS = 80;

function isHTMLElement(element: Element): element is HTMLElement {
  return element instanceof HTMLElement;
}

function isSkippable(element: HTMLElement) {
  return Boolean(element.matches(SKIP_SELECTOR) || element.closest(SKIP_SELECTOR));
}

function getElementDelay(element: HTMLElement) {
  const parent = element.parentElement;

  if (!parent) {
    return 0;
  }

  const siblings = Array.from(parent.children).filter(
    (child): child is HTMLElement =>
      isHTMLElement(child) && child.matches(REVEAL_SELECTOR) && !isSkippable(child)
  );
  const index = Math.max(siblings.indexOf(element), 0);

  return Math.min(index * STAGGER_STEP_MS, MAX_STAGGER_DELAY_MS);
}

export default function GlobalScrollReveal({ children }: { children: ReactNode }) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const scope = scopeRef.current;

    if (!scope) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const preparedElements = new Set<HTMLElement>();

    const showElement = (element: HTMLElement) => {
      element.classList.add("is-scroll-visible");
    };

    let observer: IntersectionObserver | null = null;

    if (!prefersReducedMotion) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            showElement(entry.target as HTMLElement);
            observer?.unobserve(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -12% 0px",
          threshold: 0.08,
        }
      );
    }

    const prepareElement = (element: HTMLElement) => {
      if (preparedElements.has(element) || isSkippable(element)) {
        return;
      }

      preparedElements.add(element);
      element.classList.add("scroll-reveal-item");
      element.style.setProperty("--scroll-reveal-delay", `${getElementDelay(element)}ms`);

      if (prefersReducedMotion) {
        showElement(element);
        return;
      }

      observer?.observe(element);
    };

    const prepareElements = () => {
      scope.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
        if (isHTMLElement(element)) {
          prepareElement(element);
        }
      });
    };

    prepareElements();

    const mutationObserver = new MutationObserver(() => {
      window.requestAnimationFrame(prepareElements);
    });

    mutationObserver.observe(scope, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer?.disconnect();
      preparedElements.forEach((element) => {
        element.classList.remove("scroll-reveal-item", "is-scroll-visible");
        element.style.removeProperty("--scroll-reveal-delay");
      });
      preparedElements.clear();
    };
  }, [pathname]);

  return (
    <div ref={scopeRef} className="scroll-reveal-scope">
      {children}
    </div>
  );
}
