"use client";
import { useState, useRef, useEffect } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { getAllPersonas } from "@/services/api";
import { Spinner } from '@/components/ui/spinner';

export default function PersonaSearch({ label, onSelect }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ added
  const [error, setError] = useState(null); // ✅ added

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const data = await getAllPersonas(); // returns array or object
        if (!cancelled) setPersonas(data);
      } catch (err) {
        if (!cancelled) setError('Unable to load personas');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = personas
    .map(p => typeof p === 'string' ? p : p.name)
    .filter( name => name.toLowerCase().includes(query.toLowerCase()) );

  return (
    <div className="relative w-full max-w-s" ref={containerRef}>
      <Command className="w-full border rounded-md shadow-sm">
        <CommandInput
          placeholder="Search for a persona..."
          value={query}
          onValueChange={(val) => {
            setQuery(val);
            setOpen(true);
          }}
        />
        {loading && <Spinner />}
        {!loading && open && query && (
          <CommandList className="absolute z-50 mt-9 max-h-48 w-full overflow-y-auto rounded-md border bg-white shadow-md">
            <CommandEmpty>No Persona found.</CommandEmpty>
            {filtered.slice(0, 5).map((name) => (
              <CommandItem
                key={name}
                onSelect={() => {
                  setOpen(false);
                  setQuery(name);
                  onSelect(name);
                }}
              >
                {name}
              </CommandItem>
            ))}
          </CommandList>
        )}
        {error && (
          <div className="p-2 text-red-500 text-sm text-center">{error}</div>
        )}
      </Command>
    </div>
  );
}
