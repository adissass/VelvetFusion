package com.velvetfusion.velvetfusion_api.service;

import com.velvetfusion.velvetfusion_api.InvalidFusionException;
import com.velvetfusion.velvetfusion_api.PersonaNotFoundException;
import com.velvetfusion.velvetfusion_api.archive.DataLoader;
import com.velvetfusion.velvetfusion_api.model.Persona;
import com.velvetfusion.velvetfusion_api.repository.PersonaRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class FusionCalculatorService {
    private final PersonaRepository personaRepository;
    private final Map<String, Map<String, String>> fusionChart;
    private final List<String> arcanaOrder;

    public FusionCalculatorService(PersonaRepository personaRepository) throws IOException {
        this.personaRepository = personaRepository;
        this.fusionChart = DataLoader.loadFusionChart("fusionChart.json");
        this.arcanaOrder = Arrays.asList(
            "Fool", "Magician", "Priestess", "Empress", "Emperor",
            "Hierophant", "Lovers", "Chariot", "Justice", "Hermit",
            "Fortune", "Strength", "Hanged Man", "Death", "Temperance",
            "Devil", "Tower", "Star", "Moon", "Sun", "Judgement", "World"
        );
    }

    public Persona fuse(String name1, String name2) throws PersonaNotFoundException {
        Persona persona1 = personaRepository.findByName(name1)
                .orElseThrow(() -> new PersonaNotFoundException(name1));
        Persona persona2 = personaRepository.findByName(name2)
                .orElseThrow(() -> new PersonaNotFoundException(name2));

        String arcana1 = persona1.getArcana();
        String arcana2 = persona2.getArcana();

        int level1 = persona1.getLevel();
        int level2 = persona2.getLevel();

        // Determine result arcana
        String resultArcana;
        try {
            if (arcanaOrder.indexOf(arcana1) < arcanaOrder.indexOf(arcana2)) {
                resultArcana = fusionChart.get(arcana1).get(arcana2);
            } else {
                resultArcana = fusionChart.get(arcana2).get(arcana1);
            }
        } catch (Exception e) {
            throw new InvalidFusionException("No fusion result for " + arcana1 + " × " + arcana2);
        }

        int targetLevel = (level1 + level2) / 2 + 1;
        Persona fused = findFusedPersona(resultArcana, targetLevel);
        if (fused == null) {
            throw new InvalidFusionException("No Persona found for arcana " + resultArcana + " at level " + targetLevel);
        }

        return fused;
    }

    private Persona findFusedPersona(String arcana, int level){
        return personaRepository.findFirstByArcanaAndLevelGreaterThanEqualOrderByLevelAsc(arcana, level)
                .orElse(null);
    }
}
