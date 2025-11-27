'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PersonaSearch from '@/components/PersonaSearch';
import PersonaCard from '@/components/PersonaCard';
import personaImageMap from '../../data/personaImageMap';
import { fusePersonas } from '@/services/api';

export default function Home() {
  const [personaA, setPersonaA] = useState('');
  const [personaB, setPersonaB] = useState('');
  const [fusionPersona, setFusionPersona] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFuse = async () => {
    if (!personaA || !personaB) {
      setFusionPersona(null);
      setStatus('Select both personas before fusing.');
      return;
    }

    try {
      setIsLoading(true);
      setStatus('Calculating fusion...');
      const fusion = await fusePersonas(personaA, personaB);
      setFusionPersona(fusion);
      setStatus(`${personaA} × ${personaB}`);
    } catch (err) {
      setFusionPersona(null);
      setStatus(err.message ?? 'Fusion failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <h1 className="text-3xl font-bold">VelvetFusion</h1>

      <div className="flex gap-2">
        <PersonaSearch label="Persona A" onSelect={setPersonaA} />
        <span className="text-2xl">x</span>
        <PersonaSearch label="Persona B" onSelect={setPersonaB} />
      </div>

      <Button onClick={handleFuse} disabled={isLoading}>
        {isLoading ? 'Fusing...' : 'Fuse'}
      </Button>

      {status && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100 w-full max-w-md whitespace-pre-wrap text-left">
          <strong>Status:</strong> {status}
        </div>
      )}

      {fusionPersona && (
        <PersonaCard
          name={fusionPersona.name}
          imageSrc={personaImageMap[fusionPersona.name]}
          arcana={fusionPersona.arcana}
          level={fusionPersona.level}
        />
      )}
    </div>
  );
}
