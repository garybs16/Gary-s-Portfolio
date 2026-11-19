import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Briefcase, Copy, CornerDownLeft, FileText, Github, Globe, Hash, Linkedin, Mail, Search, type LucideIcon } from 'lucide-react';
import { caseStudies, firstStepShot, links, navigation } from './data';

/*
 * ⌘K / Ctrl+K command menu. Built on the native <dialog> element, so focus
 * trapping, Escape and the inert background come from the browser. The list
 * is a combobox + listbox pair driven by aria-activedescendant.
 */

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  external?: boolean;
  run: () => void | 'keep-open';
};

const isMac = () => /Mac|iPhone|iPad/.test(navigator.userAgent);
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}

const open = (href: string) => { window.open(href, '_blank', 'noopener,noreferrer'); };

export function useCommandShortcut() {
  const [mac, setMac] = useState(false);
  useEffect(() => setMac(isMac()), []);
  return mac ? '⌘K' : 'Ctrl K';
}

export default function CommandPalette({ open: isOpen, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState('');

  const items = useMemo<Item[]>(() => [
    { id: 'home', group: 'Navigate', label: 'Top of page', icon: Hash, run: () => goTo('home') },
    ...navigation.map(([label, id]): Item => ({ id, group: 'Navigate', label, icon: Hash, run: () => goTo(id) })),
    ...caseStudies.map((cs): Item => ({
      id: `case-${cs.id}`,
      group: 'Case studies',
      label: cs.org.split(' · ')[0],
      hint: cs.title,
      icon: Briefcase,
      run: () => goTo(`case-${cs.id}`),
    })),
    { id: 'resume', group: 'Links', label: 'Resume', hint: 'PDF', icon: FileText, external: true, run: () => open(links.resume) },
    { id: 'github', group: 'Links', label: 'GitHub', hint: 'garybs16', icon: Github, external: true, run: () => open(links.github) },
    { id: 'linkedin', group: 'Links', label: 'LinkedIn', icon: Linkedin, external: true, run: () => open(links.linkedin) },
    { id: 'live', group: 'Links', label: firstStepShot.domain, hint: 'Live platform', icon: Globe, external: true, run: () => open(firstStepShot.href) },
    { id: 'source', group: 'Links', label: 'Source code for this site', icon: Github, external: true, run: () => open(links.source) },
    {
      id: 'copy',
      group: 'Contact',
      label: 'Copy email address',
      hint: links.email,
      icon: Copy,
      run: () => {
        navigator.clipboard.writeText(links.email).then(
          () => { setStatus('Email copied to clipboard'); window.setTimeout(() => onOpenChange(false), 900); },
          () => { window.location.href = `mailto:${links.email}`; },
        );
        return 'keep-open';
      },
    },
    { id: 'email', group: 'Contact', label: 'Send an email', icon: Mail, run: () => { window.location.href = `mailto:${links.email}`; } },
  ], [onOpenChange]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return items;
    return items.filter((item) => {
      const hay = `${item.label} ${item.hint ?? ''} ${item.group}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [items, query]);

  // Open and close the native dialog from React state.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (isOpen && !d.open) {
      setQuery('');
      setActive(0);
      setStatus('');
      d.showModal();
      input.current?.focus();
    } else if (!isOpen && d.open) {
      d.close();
    }
  }, [isOpen]);

  // Global shortcut: ⌘K / Ctrl+K toggles, "/" opens when not typing.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!isOpen);
        return;
      }
      const t = e.target as HTMLElement;
      if (e.key === '/' && !isOpen && !t.closest('input, textarea, [contenteditable="true"]')) {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onOpenChange]);

  useEffect(() => { setActive(0); }, [query]);

  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const run = (item: Item | undefined) => {
    if (!item) return;
    if (item.run() !== 'keep-open') onOpenChange(false);
  };

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (results.length ? (a + 1) % results.length : 0)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0)); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    else if (e.key === 'End') { e.preventDefault(); setActive(Math.max(results.length - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); run(results[active]); }
  };

  let lastGroup = '';

  return (
    <dialog
      ref={dialog}
      className="cmdk"
      aria-label="Command menu"
      onClose={() => onOpenChange(false)}
      onClick={(e) => { if (e.target === dialog.current) onOpenChange(false); }}
    >
      <div className="cmdk-panel">
        <label className="cmdk-search">
          <Search aria-hidden="true" />
          <input
            ref={input}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-autocomplete="list"
            aria-activedescendant={results[active] ? `cmdk-${results[active].id}` : undefined}
            aria-label="Search sections, case studies and links"
            placeholder="Jump to a case study, section or link…"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
          />
          <kbd>esc</kbd>
        </label>

        <ul className="cmdk-list" id="cmdk-list" role="listbox" ref={list} aria-label="Results">
          {results.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            const Icon = item.icon;
            return (
              <li key={item.id} role="presentation">
                {header && <p className="cmdk-group" aria-hidden="true">{header}</p>}
                <div
                  id={`cmdk-${item.id}`}
                  role="option"
                  aria-selected={i === active}
                  className="cmdk-item"
                  onPointerMove={() => { if (i !== active) setActive(i); }}
                  onClick={() => run(item)}
                >
                  <span className="cmdk-icon"><Icon aria-hidden /></span>
                  <span className="cmdk-label">{item.label}</span>
                  {item.hint && <span className="cmdk-hint">{item.hint}</span>}
                  {item.external ? <ArrowUpRight className="cmdk-go" aria-hidden="true" /> : <CornerDownLeft className="cmdk-go" aria-hidden="true" />}
                </div>
              </li>
            );
          })}
          {!results.length && <li className="cmdk-empty" role="presentation">No matches for “{query}”</li>}
        </ul>

        <p className="cmdk-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
          <span><kbd>↵</kbd> open</span>
          <span className="cmdk-status" role="status">{status}</span>
        </p>
      </div>
    </dialog>
  );
}
