"use client";

import { useState, useEffect, useMemo } from "react";
import personaImageMap from "../../../data/personaImageMap";
import PersonaCard from "@/components/PersonaCard";
import { Input } from "@/components/ui/input";
import SliderRange from "@/components/DualSlider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllPersonas } from "@/services/api";

export default function PersonasPage() {
  const [personas, setPersonas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArcana, setSelectedArcana] = useState("all");
  const [levelRange, setLevelRange] = useState([0, 100]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getAllPersonas();
        if (!cancelled) {
          setPersonas(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Unable to load personas");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  const arcanaOptions = useMemo(() => {
    const options = new Set(personas.map((p) => p.arcana));
    return ["all", ...Array.from(options).sort()];
  }, [personas]);

  const filtered = personas.filter((persona) => {
    const matchesSearch = persona.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesArcana =
      selectedArcana === "all" || persona.arcana === selectedArcana;
    const matchesLevel =
      persona.level >= levelRange[0] && persona.level <= levelRange[1];
    return matchesSearch && matchesArcana && matchesLevel;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Personas</h1>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
        <Input
          type="text"
          placeholder="Search by name..."
          className="py-8 md:w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select value={selectedArcana} onValueChange={setSelectedArcana}>
          <SelectTrigger className="py-8 min-w-[160px]">
            <SelectValue placeholder="Arcana" />
          </SelectTrigger>
          <SelectContent>
            {arcanaOptions.map((arcana) => (
              <SelectItem key={arcana} value={arcana}>
                {arcana === "all" ? "All Arcana" : arcana}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-3 rounded-md border px-4">
          <span className="text-sm text-muted-foreground">Level</span>
          <div className="w-[150px]">
            <SliderRange value={levelRange} onChange={setLevelRange} />
          </div>
        </div>
      </div>

      {loading && <p>Loading personas…</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filtered.map((persona) => {
          const imagePath = personaImageMap[persona.name];
          return (
            <PersonaCard
              key={persona.name}
              name={persona.name}
              imageSrc={imagePath}
              arcana={persona.arcana}
              level={persona.level}
              className="border p-4 rounded shadow-sm"
            />
          );
        })}
      </div>
    </div>
  );
}