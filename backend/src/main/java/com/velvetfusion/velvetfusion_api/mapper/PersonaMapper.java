package com.velvetfusion.velvetfusion_api.mapper;

import com.velvetfusion.velvetfusion_api.dto.PersonaResponseDto;
import com.velvetfusion.velvetfusion_api.model.Persona;

import java.util.List;

public final class PersonaMapper {
    private PersonaMapper() {
    }

    public static PersonaResponseDto toResponseDto(Persona persona) {
        return new PersonaResponseDto(
                persona.getName(),
                persona.getArcana(),
                persona.getLevel()
        );
    }

    public static List<PersonaResponseDto> toResponseDtoList(List<Persona> personas) {
        return personas.stream()
                .map(PersonaMapper::toResponseDto)
                .toList();
    }
}
